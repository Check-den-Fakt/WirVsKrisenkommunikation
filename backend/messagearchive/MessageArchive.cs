using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.DurableTask;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace MessageArchive
{
    public static class MessageArchive
    {
        [FunctionName("Orchestrator")]
        public static async Task<bool> RunOrchestrator(
            [OrchestrationTrigger] IDurableOrchestrationContext context,
            ILogger log)
        {
            var outputs = new List<string>();

            Request requestData = context.GetInput<Request>();


            var entityResponse = context.CallActivityAsync<string>("AddToDB", requestData.Text);


            return true;
        }

        [FunctionName("messagearchive")]
        public static async Task<HttpResponseMessage> HttpStart(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post")] HttpRequestMessage req,
            [DurableClient] IDurableOrchestrationClient starter,
            ILogger log)
        {
            // Function input comes from the request content.
            object eventData = await req.Content.ReadAsAsync<Request>();
            string instanceId = await starter.StartNewAsync("Orchestrator", eventData);

            log.LogInformation($"Started orchestration with ID = '{instanceId}'.");

            return new HttpResponseMessage(System.Net.HttpStatusCode.Created);
        }
    }
}
