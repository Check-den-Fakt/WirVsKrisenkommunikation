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
    public class QnADialog : CancelAndHelpDialog
    {
        private const string messageText = "Nach was willst du suchen?";

        public QnADialog()
            : base(nameof(QnADialog))
        {
            AddDialog(new TextPrompt(nameof(TextPrompt)));
            AddDialog(new ConfirmPrompt(nameof(ConfirmPrompt)));
            AddDialog(new WaterfallDialog(nameof(WaterfallDialog), new WaterfallStep[]
            {
                QNAInputDialog,
                FinalStepAsync,
            }));
            
            // The initial child Dialog to run.
            InitialDialogId = nameof(WaterfallDialog);
        }

        private async Task<DialogTurnResult> QNAInputDialog(WaterfallStepContext stepContext, CancellationToken cancellationToken)
        {
            var qnADetails = (Models.QnADetails)stepContext.Options;

            if (qnADetails.Question == null)
            {
                var promptMessage = MessageFactory.Text(messageText, messageText, InputHints.ExpectingInput);
                return await stepContext.PromptAsync(nameof(TextPrompt), new PromptOptions { Prompt = promptMessage }, cancellationToken);
            }

            return await stepContext.NextAsync(qnADetails, cancellationToken);
        }

        private async Task<DialogTurnResult> FinalStepAsync(WaterfallStepContext stepContext, CancellationToken cancellationToken)
        {
            if (stepContext.Result != null)
            {
                Models.QnADetails qnADetails = new Models.QnADetails();
                qnADetails.Question = stepContext.Result.ToString();

                return await stepContext.EndDialogAsync(qnADetails, cancellationToken);
            }

            return await stepContext.EndDialogAsync(null, cancellationToken);
        }
    }
}
