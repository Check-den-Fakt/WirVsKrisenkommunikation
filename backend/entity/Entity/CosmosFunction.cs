using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents.Linq;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.DurableTask;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Entity
{
    public static class CosmosFunction
    {
        [FunctionName("CosmosOutput")]
        public static async Task CosmosOutput([ActivityTrigger] string request, [CosmosDB(
            databaseName: "entities",
            collectionName: "func",
            ConnectionStringSetting = "CosmosDbConnection")] IAsyncCollector<document> documents, ILogger log)
        {
            Model.RootObject requestData = JsonConvert.DeserializeObject<Model.RootObject>(request);
            string time = DateTime.UtcNow.ToString();

            foreach (var item in requestData.documents[0].keyPhrases)
            {
                await documents.AddAsync(new document { DataTime = time, KeyPhrase = item.ToLowerInvariant() });
            }

            log.LogInformation($"C# Queue trigger function inserted one row");
        }

        [FunctionName("CosmosSearch")]
        public static async Task<string> CosmosSearch([ActivityTrigger] string request, [CosmosDB(
            ConnectionStringSetting = "CosmosDbConnection")] DocumentClient client, ILogger log)
        {

            log.LogInformation("C# HTTP trigger function processed a request.");
            Model.RootObject requestData = JsonConvert.DeserializeObject<Model.RootObject>(request);

            Uri collectionUri = UriFactory.CreateDocumentCollectionUri(databaseId: "entities", collectionId: "func");
            var options = new FeedOptions { EnableCrossPartitionQuery = true }; // Enable cross partition query

            List<KeyValuePair<string, int>> hits = new List<KeyValuePair<string, int>>();

            foreach (var item in requestData.documents[0].keyPhrases)
            {
                IDocumentQuery<document> query = client.CreateDocumentQuery<document>(collectionUri, options)
                    .Where(document => document.KeyPhrase == item.ToLowerInvariant())
                    .AsDocumentQuery();

                List<dynamic> documents = new List<dynamic>();

                while (query.HasMoreResults)
                {
                    foreach (var queryItem in await query.ExecuteNextAsync())
                    {
                        documents.Add(queryItem);
                    }
                }

                hits.Add(new KeyValuePair<string, int>(item.ToLowerInvariant(), documents.Count));
            }

            return JsonConvert.SerializeObject(hits);
        }
    }
}
