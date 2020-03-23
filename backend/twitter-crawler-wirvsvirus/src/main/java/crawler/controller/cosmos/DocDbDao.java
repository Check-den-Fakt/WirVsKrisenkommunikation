package crawler.controller.cosmos;

import com.google.gson.Gson;
import com.microsoft.azure.documentdb.*;

import java.util.ArrayList;
import java.util.List;

public class DocDbDao implements TweetDao {

    // The name of our database.
    private static final String DATABASE_ID = "Tweets";

    // The name of our collection.
    private static final String COLLECTION_ID = "TweetsCollection";

    // The Azure Cosmos DB Client
    private static DocumentClient documentClient = DocumentClientFactory.getDocumentClient();

    // Cache for the database object, so we don't have to query for it to
    // retrieve self links.
    private static Database databaseCache;

    // Cache for the collection object, so we don't have to query for it to
    // retrieve self links.
    private static DocumentCollection collectionCache;

    // We'll use Gson for POJO <=> JSON serialization for this example.
    private static Gson gson = new Gson();


    private Database getTweetsDatabase() {

        if (databaseCache == null) {

            // Get the database if it exists  CONTAINS(c.firstName, 'bob')
            List<Database> databaseList = documentClient
                    .queryDatabases(
                            "SELECT * FROM root r WHERE r.id='" + DATABASE_ID
                                    + "'", null).getQueryIterable().toList();

            if (databaseList.size() > 0) {
                // Cache the database object so we won't have to query for it
                // later to retrieve the selfLink.
                databaseCache = databaseList.get(0);

            } else {

                // Create the database if it doesn't exist.

                try {

                    final Database databaseDefinition = new Database();
                    databaseDefinition.setId(DATABASE_ID);

                    databaseCache = documentClient.createDatabase(databaseDefinition, null).getResource();

                } catch (final Exception e) {
                    // TODO: Something has gone terribly wrong - the app wasn't
                    // able to query or create the collection.
                    // Verify your connection, endpoint, and key.
                    e.printStackTrace();
                }
            }
        }

        return databaseCache;
    }

    private DocumentCollection getTweetCollection() {

        if (collectionCache != null) {
            return collectionCache;
        }

        // Get the collection if it exists.
        final List<DocumentCollection> collectionList = documentClient
                .queryCollections(getTweetsDatabase().getSelfLink(),
                        "SELECT * FROM root r WHERE r.id='" + COLLECTION_ID
                                + "'", null).getQueryIterable().toList();

        if (collectionList.size() > 0) {
            // Cache the collection object so we won't have to query for it
            // later to retrieve the selfLink.
            collectionCache = collectionList.get(0);
            return collectionCache;
        }


        // Create the collection if it doesn't exist.
        final DocumentCollection collectionDefinition = new DocumentCollection();
        collectionDefinition.setId(COLLECTION_ID);

        try {

            collectionCache = documentClient.createCollection(getTweetsDatabase().getSelfLink(),
                    collectionDefinition, null).getResource();
            return collectionCache;

        } catch (final DocumentClientException e) {

            // TODO: Something has gone terribly wrong - the app wasn't
            // able to query or create the collection.
            // Verify your connection, endpoint, and key.
            e.printStackTrace();
        }

        return collectionCache;
    }


    @Override
    public Tweet createTweet(Tweet tweet) {

        Document document = new Document(gson.toJson(tweet));

        // Annotate the document as a TodoItem for retrieval (so that we can
        // store multiple entity types in the collection).
        document.set("entityType", "tweet");

        try {

            // Persist the document using the DocumentClient.
            document = documentClient.createDocument(
                    getTweetCollection().getSelfLink(), document, null,
                    false).getResource();

        } catch (DocumentClientException e) {
            e.printStackTrace();
            return null;
        }

        return gson.fromJson(document.toString(), Tweet.class);
    }

    private Document getDocumentText(String text) {
        // Retrieve the document using the DocumentClient.
        List<Document> documentList = documentClient
                .queryDocuments(getTweetCollection().getSelfLink(),
                        "SELECT * FROM root r WHERE CONTAINS(r.text, '" + text + "')", null)
                .getQueryIterable().toList();

        if (documentList.size() > 0) {
            return documentList.get(0);

        } else {
            return null;
        }
    }

    @Override
    public List<Tweet> readTweets(final String text) {

        final List<Tweet> tweets = new ArrayList<>();

        // Retrieve the TodoItem documents
        List<Document> documentList = documentClient
                .queryDocuments(getTweetCollection().getSelfLink(),
                        "SELECT * FROM root r WHERE CONTAINS(r.text, '" + text + "')",
                        null).getQueryIterable().toList();

        // De-serialize the documents in to TodoItems.
        for (final Document tweetDocument : documentList) {
            tweets.add(gson.fromJson(tweetDocument.toString(),
                    Tweet.class));
        }

        return tweets;
    }

    @Override
    public Tweet updateTweet(String id, String lang, String text) {

        // Retrieve the document from the database
        Document tweetItemDocument = getDocumentText(id);

        // You can update the document as a JSON document directly.
        // For more complex operations - you could de-serialize the document in
        // to a POJO, update the POJO, and then re-serialize the POJO back in to
        // a document.
        tweetItemDocument.set("lang", lang);
        tweetItemDocument.set("text", text);

        try {
            // Persist/replace the updated document.
            tweetItemDocument = documentClient.replaceDocument(tweetItemDocument,
                    null).getResource();

        } catch (DocumentClientException e) {
            e.printStackTrace();
            return null;
        }

        return gson.fromJson(tweetItemDocument.toString(), Tweet.class);
    }

    @Override
    public boolean deleteTweet(String id) {
        // Azure Cosmos DB refers to documents by self link rather than id.

        // Query for the document to retrieve the self link.
        Document tweetItemDocument = getDocumentText(id);

        try {
            // Delete the document by self link.
            documentClient.deleteDocument(tweetItemDocument.getSelfLink(), null);
        } catch (DocumentClientException e) {
            e.printStackTrace();
            return false;
        }

        return true;
    }
}