using Microsoft.Bot.Builder;
using Microsoft.Bot.Builder.Dialogs;
using Microsoft.Bot.Schema;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Bot.Dialogs
{
    public class ReportDialog : CancelAndHelpDialog
    {
        private const string messageText = "Welche Falschnachricht willst du melden?";

        public ReportDialog()
            : base(nameof(ReportDialog))
        {
            AddDialog(new TextPrompt(nameof(TextPrompt)));
            AddDialog(new ConfirmPrompt(nameof(ConfirmPrompt)));
            AddDialog(new WaterfallDialog(nameof(WaterfallDialog), new WaterfallStep[]
            {
                ReportInputDialog,
                FinalStepAsync,
            }));
            
            // The initial child Dialog to run.
            InitialDialogId = nameof(WaterfallDialog);
        }

        private async Task<DialogTurnResult> ReportInputDialog(WaterfallStepContext stepContext, CancellationToken cancellationToken)
        {
            var reportDetails = (Models.ReportDetails)stepContext.Options;

            if (reportDetails.Text == null)
            {
                var promptMessage = MessageFactory.Text(messageText, messageText, InputHints.ExpectingInput);
                return await stepContext.PromptAsync(nameof(TextPrompt), new PromptOptions { Prompt = promptMessage }, cancellationToken);
            }

            return await stepContext.NextAsync(reportDetails, cancellationToken);
        }

        private async Task<DialogTurnResult> FinalStepAsync(WaterfallStepContext stepContext, CancellationToken cancellationToken)
        {
            if (stepContext.Result != null)
            {
                Models.ReportDetails reportDetails = new Models.ReportDetails();
                reportDetails.Text = stepContext.Result.ToString();

                return await stepContext.EndDialogAsync(reportDetails, cancellationToken);
            }

            return await stepContext.EndDialogAsync(null, cancellationToken);
        }
    }
}
