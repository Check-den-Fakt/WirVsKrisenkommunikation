// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Bot.Builder;
using Microsoft.Bot.Schema;
using Newtonsoft.Json;

namespace Bot
{
    public class EmptyBot : ActivityHandler
    {
        protected override async Task OnMembersAddedAsync(IList<ChannelAccount> membersAdded, ITurnContext<IConversationUpdateActivity> turnContext, CancellationToken cancellationToken)
        {
            foreach (var member in membersAdded)
            {
                if (member.Id != turnContext.Activity.Recipient.Id)
                {
                    await turnContext.SendActivityAsync(MessageFactory.Text($"Hallo, willkommen bei Check-den-Fakt.de!\n Gib deine FakeNews wie folgt ein: /check Corona lässt sich durch Bier abtöten - was natürlich falsch ist ;-)"), cancellationToken);
                }
            }

        }

        protected override async Task OnMessageActivityAsync(ITurnContext<IMessageActivity> turnContext, CancellationToken cancellationToken)
        {
            var context = turnContext.Activity.Text;

            if (context.StartsWith("/check"))
            {
                await turnContext.SendActivityAsync(MessageFactory.Text("Einen Moment bitte, ich befrage unsere Datenbank"));
                Activity typing = new Activity();
                typing.Type = ActivityTypes.Typing;
                typing.Text = null;
                await turnContext.SendActivityAsync(typing);

                var reply = await Backend.GetFakeNews(context.ToLowerInvariant());
                await turnContext.SendActivityAsync(typing);

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

                stringBuilder.AppendLine($"Deine Nachricht hat eine Übereinstimmung bis zu {Math.Round(searchScore*100)}% ergeben. Unsere Suche hat bis zu {reply.search.value.Count} Ergebnisse gefunden.");

                await turnContext.SendActivityAsync(MessageFactory.Text(stringBuilder.ToString()));
            }
            else
            {
                await turnContext.SendActivityAsync(MessageFactory.Text("Ich habe dich leider nicht verstanden :( "));
            }
        }
    }
}
