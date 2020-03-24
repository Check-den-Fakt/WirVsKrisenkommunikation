using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Microsoft.Azure.Search;
using Microsoft.Azure.Search.Models;

namespace SearchFunction
{
    public static class Search
    {
        private static SearchIndexClient indexClient;

        [FunctionName("Search")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] string req,
            ILogger log)
        {
            var requestData = JsonConvert.DeserializeObject<request>(req);
            log.LogInformation("C# HTTP trigger function processed a request.");

            string searchServiceName = Environment.GetEnvironmentVariable("SearchUrl");
            string adminApiKey = Environment.GetEnvironmentVariable("SearchKey");

            string indexName = "cosmosdb-index";

            indexClient = new SearchIndexClient(searchServiceName, indexName, new SearchCredentials(adminApiKey));

            SearchParameters parameters = new SearchParameters()
            {

            };

            var result = await indexClient.Documents.SearchAsync(requestData.query, parameters);

            return new OkObjectResult(result);
        }

        [FunctionName("SearchTwitter")]
        public static async Task<IActionResult> RunTwitter(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] string req,
            ILogger log)
        {
            var requestData = JsonConvert.DeserializeObject<request>(req);
            log.LogInformation("C# HTTP trigger function processed a request.");

            string searchServiceName = Environment.GetEnvironmentVariable("SearchUrl");
            string adminApiKey = Environment.GetEnvironmentVariable("SearchKey");

            string indexName = "twitter-feed";

            indexClient = new SearchIndexClient(searchServiceName, indexName, new SearchCredentials(adminApiKey));

            SearchParameters parameters = new SearchParameters()
            {
                SearchFields = new[] { "text" }
            };

            var result = await indexClient.Documents.SearchAsync(requestData.query, parameters);

            return new OkObjectResult(result);
        }
    }
}
