using Microsoft.Bot.Builder;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bot.CognitiveModels
{
    public partial class ChatIntents : IRecognizerConvert
    {
        public string Text;
        public string AlteredText;

        public enum Intent
        {
            Help,
            Welcome,
            None,
            Check,
            Report,
            FAQ
        }

        public Dictionary<Intent, IntentScore> Intents;

        public (Intent intent, double score) TopIntent()
        {
            Intent maxIntent = Intent.None;
            var max = 0.0;
            foreach (var entry in Intents)
            {
                if (entry.Value.Score > max)
                {
                    maxIntent = entry.Key;
                    max = entry.Value.Score.Value;
                }
            }
            return (maxIntent, max);
        }

        [JsonExtensionData(ReadData = true, WriteData = true)]
        public IDictionary<string, object> Properties { get; set; }

        public void Convert(dynamic result)
        {
            Text = result.Text;
            Intents = new Dictionary<Intent, IntentScore>();
            foreach (var item in result.Intents)
            {
                var intent = Enum.Parse(typeof(Intent), item.Key);
                var intentScore = (IntentScore)item.Value;

                Intents.Add(intent, intentScore);
            }

            Properties = result.Properties;
        }
    }
}
