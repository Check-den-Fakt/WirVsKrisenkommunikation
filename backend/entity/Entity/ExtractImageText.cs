using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision;
using Microsoft.Azure.CognitiveServices.Language.SpellCheck;
using System.Linq;

namespace Entity
{
    public static class ExtractImageText
    {
        private static string subscriptionKey = Environment.GetEnvironmentVariable("CognitiveApiKey");
        private static string endpoint = Environment.GetEnvironmentVariable("CognitiveEndpoint");
        private static ComputerVisionClient client;
        private static SpellCheckClient spellCheckClient;

        [FunctionName("ExtractImageText")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] dynamic req,
            ILogger log)
        {
            log.LogInformation("ExtractImageText trigger function processed a request.");

            client = new ComputerVisionClient(new Microsoft.Azure.CognitiveServices.Vision.ComputerVision.ApiKeyServiceClientCredentials(subscriptionKey))
            {
                Endpoint = endpoint
            };

            string url = req.url;

            var response = await client.RecognizePrintedTextAsync(true, url, Microsoft.Azure.CognitiveServices.Vision.ComputerVision.Models.OcrLanguages.De);

            string result = string.Empty;
            
            foreach (var region in response.Regions)
            {
                foreach (var line in region.Lines)
                {
                    foreach (var word in line.Words)
                    {
                        result += word.Text + " ";
                    }
                }
            }
            
            return new OkObjectResult(result);
        }

        private static async Task<string> CorrectSpelling(string text)
        {
            spellCheckClient = new SpellCheckClient(new Microsoft.Azure.CognitiveServices.Language.SpellCheck.ApiKeyServiceClientCredentials(subscriptionKey))
            {
                Endpoint = endpoint
            };

            var result = await spellCheckClient.SpellCheckerWithHttpMessagesAsync(text: text.ToLowerInvariant(), mode: "proof");

            var firstSpellCheckResult = result.Body.FlaggedTokens.FirstOrDefault();
            if (firstSpellCheckResult != null)
            {
                if (firstSpellCheckResult.Suggestions?.Count > 0)
                {
                    return firstSpellCheckResult.Suggestions.FirstOrDefault().Suggestion;
                }
                else
                {
                    return text.ToLowerInvariant();
                }
            }
            else
            {
                return text.ToLowerInvariant();
            }
        }
    }
}
