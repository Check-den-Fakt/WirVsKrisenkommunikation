package crawler.controller.cosmos;

import com.microsoft.azure.documentdb.ConnectionPolicy;
import com.microsoft.azure.documentdb.ConsistencyLevel;
import com.microsoft.azure.documentdb.DocumentClient;
import utils.Constants;

public class DocumentClientFactory {

    private static DocumentClient documentClient = new DocumentClient(Constants.COSMO_HOST, Constants.COSMO_MASTER_KEY,
            ConnectionPolicy.GetDefault(), ConsistencyLevel.Session);

    public static DocumentClient getDocumentClient() {
        return documentClient;
    }

}
