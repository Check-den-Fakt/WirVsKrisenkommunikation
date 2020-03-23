using Microsoft.Azure.CognitiveServices.Knowledge.QnAMaker;
using Microsoft.Azure.CognitiveServices.Knowledge.QnAMaker.Models;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bot
{
    public static class Backend
    {
        private static RestSharp.RestClient client;
        private static QnAMakerRuntimeClient qnAMakerClient;

        public static async Task<Models.FakeAPIResponse> GetFakeNews(string message)
        {
            message = message.Replace("/check", "");
            try
            {
                client = new RestSharp.RestClient("https://prod-56.westeurope.logic.azure.com");

                RestSharp.RestRequest restRequest = new RestSharp.RestRequest("/workflows/73896dc86d9149058d3bd5234fb4ae86/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=MmoB-9jJt1DbB25AfNJis889rx8b9LbJDX0zJSCsmoM", RestSharp.Method.POST);

                restRequest.AddHeader("Content-Type", "application/json");

                bool result = Uri.TryCreate(message, UriKind.Absolute, out Uri uriResult)
                    && uriResult.Scheme == Uri.UriSchemeHttp;

                Models.Request requestObject;
                if (result)
                {
                    requestObject = new Models.Request
                    {
                        url = message,
                        text = string.Empty
                    };
                }
                else
                {
                    requestObject = new Models.Request
                    {
                        text = message,
                        url = string.Empty
                    };
                }

                restRequest.AddJsonBody(requestObject);

                var response = await client.ExecuteAsync(restRequest).ConfigureAwait(false);

                return JsonConvert.DeserializeObject<Models.FakeAPIResponse>(response.Content);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public static async Task<IList<QnASearchResult>> GetQnAResponse(string question, IConfiguration configuration)
        {
            var subscriptionKey = configuration["QnAMakerAPIKey"];
            qnAMakerClient = new QnAMakerRuntimeClient(new EndpointKeyServiceClientCredentials(subscriptionKey)) { RuntimeEndpoint = configuration["QnAMakerEndpoint"] };

            var result = await qnAMakerClient.Runtime.GenerateAnswerAsync("5a60db98-441c-44b4-bbc0-59f70e960d54", new QueryDTO { Question = question });

            return result.Answers;
        }

        public static async Task ReportMessage(Models.ReportDetails details, IConfiguration configuration)
        {
            client = new RestSharp.RestClient("https://we-sendfact-fa.azurewebsites.net");
            RestSharp.RestRequest restRequest = new RestSharp.RestRequest("/api/messagearchive", RestSharp.Method.POST);

            restRequest.AddHeader("Content-Type", "application/json");
            restRequest.AddJsonBody(details);

            await client.ExecuteAsync(restRequest).ConfigureAwait(false);
        }
    }
}
