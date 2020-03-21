using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Net.Http;
using System.Collections.Generic;
using System.Text;

namespace Entity
{
    public static class Function1
    {
        private static RestSharp.RestClient client;

        [FunctionName("Validate")]
        public static async Task<HttpResponseMessage> Validate(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] Request request,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            try
            {
                client = new RestSharp.RestClient(Environment.GetEnvironmentVariable("CognitiveEndpoint"));

                RestSharp.RestRequest restRequest = new RestSharp.RestRequest("/text/analytics/v2.1/keyPhrases", RestSharp.Method.POST);


                restRequest.AddHeader("Ocp-Apim-Subscription-Key", Environment.GetEnvironmentVariable("CognitiveApiKey"));
                restRequest.AddHeader("Content-Type", "application/json");

                var doc = new Document
                {
                    id = "1",
                    language = "de",
                    text = request.Text 
                };

                var requestObject = new RootObject 
                { 
                    documents = new List<Document>() { doc }
                };

                restRequest.AddJsonBody(requestObject);

                var response = await client.ExecuteAsync(restRequest).ConfigureAwait(false);

                return new HttpResponseMessage(System.Net.HttpStatusCode.OK) { Content = new StringContent(response.Content, Encoding.UTF8, "application/json") };
            }
            catch (Exception ex)
            {

                throw;
            }
        }
    }
}
