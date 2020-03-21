using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.DurableTask;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;

namespace Entity
{
    public static class Orchestrator
    {
        [FunctionName("Orchestrator")]
        public static async Task<string> RunOrchestrator(
            [OrchestrationTrigger] IDurableOrchestrationContext context)
        {
            var outputs = new List<string>();

            Request requestData = context.GetInput<Request>();

            // Get Key Phrase from Azure Cognitive Services
            var keyPhraseResponse = await context.CallActivityAsync<string>("ExtractKeyPhrase", requestData.Text);

            //CognitionKeyResponse keyPhraseObject = JsonConvert.DeserializeObject<CognitionKeyResponse>(keyPhraseResponse);

            // Add to DB
            await context.CallActivityAsync<string>("CosmosOutput", keyPhraseResponse);

            // Count DB
            var resultCountDb = await context.CallActivityAsync<string>("CosmosSearch", keyPhraseResponse);

            // Get Twitter API
            //DurableHttpResponse response = await context.CallHttpAsync(HttpMethod.Get, new System.Uri(""));

            //if ((int)response.StatusCode >= 400)
            //{
            //    // handling of error codes goes here
            //}

            var resultTwiter = "[ {\"Key\":\"reinigung\", \"Tweeter\": { } }]";

            string output = "{\"InternalHitCount\" : " + resultCountDb + ",  \"TwitterHitCount\" : " + resultTwiter + " }";


            return output;
        }

        [FunctionName("Orchestrator_HttpStart")]
        public static async Task<HttpResponseMessage> HttpStart(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post")] HttpRequestMessage req,
            [DurableClient] IDurableOrchestrationClient starter,
            ILogger log)
        {
            // Function input comes from the request content.
            object eventData = await req.Content.ReadAsAsync<Request>();
            string instanceId = await starter.StartNewAsync("Orchestrator", eventData);

            log.LogInformation($"Started orchestration with ID = '{instanceId}'.");

            return starter.CreateCheckStatusResponse(req, instanceId);
        }
    }
}