using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Bot.Builder;
using Microsoft.Bot.Builder.Dialogs;
using Microsoft.Bot.Schema;
using Microsoft.Extensions.Logging;

using Bot.CognitiveModels;
using System.Text;
using Newtonsoft.Json;
using System.Text.RegularExpressions;
using Microsoft.Extensions.Configuration;

namespace Bot.Dialogs
{
    public class MainDialog : ComponentDialog
    {
        private readonly FactCheckRecognizer luisRecognizer;
        protected readonly ILogger Logger;
        private IConfiguration configuration;

        public MainDialog(FactCheckRecognizer luisRecognizer, CheckFactDialog checkFactDialog, QnADialog qnADialog, ReportDialog reportDialog,
            ILogger<MainDialog> logger, IConfiguration configuration) : base(nameof(MainDialog))
        {
            this.luisRecognizer = luisRecognizer;
            this.configuration = configuration;
            Logger = logger;

            AddDialog(new TextPrompt(nameof(TextPrompt)));
            AddDialog(checkFactDialog);
            AddDialog(qnADialog);
            AddDialog(reportDialog);
            AddDialog(new WaterfallDialog(nameof(WaterfallDialog), new WaterfallStep[]
            {
                IntroStepAsync,
                ActStepAsync,
                FinalStepAsync,
            }));

            // The initial child Dialog to run.
            InitialDialogId = nameof(WaterfallDialog);
        }

        private async Task<DialogTurnResult> IntroStepAsync(WaterfallStepContext stepContext, CancellationToken cancellationToken)
        {
            if (!luisRecognizer.IsConfigured)
            {
                await stepContext.Context.SendActivityAsync(
                    MessageFactory.Text("NOTE: LUIS is not configured. To enable all capabilities, add 'LuisAppId', 'LuisAPIKey' and 'LuisAPIHostName' to the appsettings.json file.", inputHint: InputHints.IgnoringInput), cancellationToken);

                return await stepContext.NextAsync(null, cancellationToken);
            }

            // Use the text provided in FinalStepAsync or the default if it is the first time.
            var messageText = stepContext.Options?.ToString() ?? "Hallo, wie kann ich dir helfen?";
            var promptMessage = MessageFactory.Text(messageText, messageText, InputHints.ExpectingInput);
            return await stepContext.PromptAsync(nameof(TextPrompt), new PromptOptions { Prompt = promptMessage }, cancellationToken);
        }

        private async Task<DialogTurnResult> ActStepAsync(WaterfallStepContext stepContext, CancellationToken cancellationToken)
        {
            if (!luisRecognizer.IsConfigured)
            {
                // LUIS is not configured, we just run the BookingDialog path with an empty BookingDetailsInstance.
                return await stepContext.BeginDialogAsync(nameof(CheckFactDialog), new Models.FactDetails(), cancellationToken);
            }

            // Call LUIS and gather any potential booking details. (Note the TurnContext has the response to the prompt.)
            var luisResult = await luisRecognizer.RecognizeAsync<ChatIntents>(stepContext.Context, cancellationToken);
            switch (luisResult.TopIntent().intent)
            {
                case ChatIntents.Intent.Help:

                    string helpText = $"Aktuell kannst du bei uns Fakten prüfen und melden. Gib hierzu einfach zum Beispiel \"prüfe meinen fakt ein\"";
                    var helpMessage = MessageFactory.Text(helpText, helpText, InputHints.IgnoringInput);
                    await stepContext.Context.SendActivityAsync(helpMessage, cancellationToken);
                    break;

                case ChatIntents.Intent.Check:

                    var factDetails = new Models.FactDetails()
                    {

                    };

                    return await stepContext.BeginDialogAsync(nameof(CheckFactDialog), factDetails, cancellationToken);
                case ChatIntents.Intent.Report:
                    var reportDetails = new Models.ReportDetails();

                    return await stepContext.BeginDialogAsync(nameof(ReportDialog), reportDetails, cancellationToken);

                case ChatIntents.Intent.Welcome:
                    string welcomeText = $"Hallo, willkommen bei Check-den-Fakt.de";

                    var welcomeMessage = MessageFactory.Text(welcomeText, welcomeText, InputHints.IgnoringInput);
                    await stepContext.Context.SendActivityAsync(welcomeMessage, cancellationToken);
                    break;

                case ChatIntents.Intent.FAQ:
                    
                    var qnaDetails = new Models.QnADetails()
                    {
                    };

                    return await stepContext.BeginDialogAsync(nameof(QnADialog), qnaDetails, cancellationToken);

                default:
                    // Catch all for unhandled intents
                    var didntUnderstandMessageText = $"Sorry, ich habe dich nicht verstanden :(";
                    var didntUnderstandMessage = MessageFactory.Text(didntUnderstandMessageText, didntUnderstandMessageText, InputHints.IgnoringInput);
                    await stepContext.Context.SendActivityAsync(didntUnderstandMessage, cancellationToken);
                    break;
            }

            return await stepContext.NextAsync(null, cancellationToken);
        }

        private async Task<DialogTurnResult> FinalStepAsync(WaterfallStepContext stepContext, CancellationToken cancellationToken)
        {
            // If the child dialog ("CheckFactDialog") was cancelled, the user failed to confirm or if the intent wasn't BookFlight
            // the Result here will be null.

            if (stepContext.Result is Models.FactDetails result)
            {
                await stepContext.Context.SendActivityAsync(MessageFactory.Text("Einen Moment bitte, ich befrage unsere Datenbank"));
                Activity typing = new Activity
                {
                    Type = ActivityTypes.Typing,
                    Text = null
                };
                await stepContext.Context.SendActivityAsync(typing);

                var reply = await Backend.GetFakeNews(result.Question.ToLowerInvariant());

                string keyPhrasesString = Regex.Unescape(reply.keyphrase);
                var keyPhrases = JsonConvert.DeserializeObject<Models.KeyPhrase>(keyPhrasesString);

                StringBuilder stringBuilder = new StringBuilder();
                stringBuilder.AppendLine("Wir haben folgendes in unser Datenbank gefunden:");
                stringBuilder.AppendLine("Folgende Keywörter :");

                foreach (var item in keyPhrases.InternalHitCount)
                {
                    stringBuilder.AppendLine($"{item.Key} mit einer Häufigkeit von {item.Value}");
                }

                stringBuilder.AppendLine("");
                stringBuilder.AppendLine("In unserer Fake Datenbank haben wir folgendes Ergebnis gefunden:");

                double searchScore = 0;
                foreach (var item in reply.search.value)
                {
                    if (item.searchScore > searchScore)
                    {
                        searchScore = item.searchScore;
                    }
                }

                stringBuilder.AppendLine($"Deine Nachricht hat eine Übereinstimmung bis zu {Math.Round(searchScore * 100)}% ergeben. Unsere Suche hat bis zu {reply.search.value.Count} Ergebnisse gefunden.");
                string messageText = stringBuilder.ToString();

                var message = MessageFactory.Text(messageText, messageText, InputHints.IgnoringInput);
                await stepContext.Context.SendActivityAsync(message, cancellationToken);
            }

            if (stepContext.Result is Models.QnADetails qnaResult)
            {
                string qnaMessage = string.Empty;

                var response = await Backend.GetQnAResponse(qnaResult.Question, configuration);

                qnaMessage += "Ich habe folgende Ergebnisse in unserer FAQ gefunden:\n";

                if (response.Count != 0)
                {
                    foreach (var item in response)
                    {
                        if (item.Score > 30)
                        {
                            qnaMessage += item.Answer + "\n";
                        }
                    }
                }

                if(qnaMessage == "Ich habe folgende Ergebnisse in unserer FAQ gefunden:\n")
                {
                    qnaMessage += "Tut mir leid, ich habe leider nichts gefunden :(";
                }


                var qnaMessageText = MessageFactory.Text(qnaMessage, qnaMessage, InputHints.IgnoringInput);
                await stepContext.Context.SendActivityAsync(qnaMessageText, cancellationToken);
            }

            if (stepContext.Result is Models.ReportDetails reportDetails)
            {
                string reportMessage = "Vielen Dank für deine Meldung";
                
                await stepContext.Context.SendActivityAsync(MessageFactory.Text("Einen Moment bitte"));

                Activity typing = new Activity
                {
                    Type = ActivityTypes.Typing,
                    Text = null
                };
                await stepContext.Context.SendActivityAsync(typing);

                await Backend.ReportMessage(reportDetails, configuration);

                var reportMessageText = MessageFactory.Text(reportMessage, reportMessage, InputHints.IgnoringInput);
                await stepContext.Context.SendActivityAsync(reportMessageText, cancellationToken);
            }

            // Restart the main dialog with a different message the second time around
            var promptMessage = "Was kann ich sonst noch für dich tun?";
            return await stepContext.ReplaceDialogAsync(InitialDialogId, promptMessage, cancellationToken);
        }
    }
}
