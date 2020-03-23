using Microsoft.Bot.Builder;
using Microsoft.Bot.Builder.Dialogs;
using Microsoft.Bot.Schema;
using System.Threading;
using System.Threading.Tasks;

namespace Bot.Dialogs
{
    public class CheckFactDialog : CancelAndHelpDialog
    {
        private const string factCheckMesText = "Welchen Fakt möchtest du überprüfen?";

        public CheckFactDialog()
            : base(nameof(CheckFactDialog))
        {
            AddDialog(new TextPrompt(nameof(TextPrompt)));
            AddDialog(new ConfirmPrompt(nameof(ConfirmPrompt)));
            AddDialog(new WaterfallDialog(nameof(WaterfallDialog), new WaterfallStep[]
            {
                FactInputDialog,
                FinalStepAsync,
            }));

            // The initial child Dialog to run.
            InitialDialogId = nameof(WaterfallDialog);
        }

        private async Task<DialogTurnResult> FactInputDialog(WaterfallStepContext stepContext, CancellationToken cancellationToken)
        {
            var factDetails = (Models.FactDetails)stepContext.Options;

            if (factDetails.Question == null)
            {
                var promptMessage = MessageFactory.Text(factCheckMesText, factCheckMesText, InputHints.ExpectingInput);
                return await stepContext.PromptAsync(nameof(TextPrompt), new PromptOptions { Prompt = promptMessage }, cancellationToken);
            }

            return await stepContext.NextAsync(factDetails, cancellationToken);
        }

        private async Task<DialogTurnResult> FinalStepAsync(WaterfallStepContext stepContext, CancellationToken cancellationToken)
        {
            if (stepContext.Result != null)
            {
                Models.FactDetails factDetails = new Models.FactDetails();
                factDetails.Question = stepContext.Result.ToString();

                return await stepContext.EndDialogAsync(factDetails, cancellationToken);
            }

            return await stepContext.EndDialogAsync(null, cancellationToken);
        }
    }
}
