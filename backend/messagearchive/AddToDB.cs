using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.DurableTask;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MessageArchive
{
    class AddToDB
    {
        [FunctionName("AddToDB")]
        public static void DBAdd([ActivityTrigger] string request,
            [CosmosDB(
            databaseName: "fakenewsdb",
            collectionName: "fakenews",
            ConnectionStringSetting = "CosmosDbConnection")] out dynamic document, ILogger log)
        {
            //Model.RootObject requestData = JsonConvert.DeserializeObject<Model.RootObject>(request);
            string time = DateTime.UtcNow.ToString();
            document = new Document { Content = request, id = Guid.NewGuid().ToString(), DateTime = DateTime.UtcNow.ToString("dd.MM.yyyy") };

            log.LogInformation($"C# Queue trigger function inserted one row");
        }
    }
}
