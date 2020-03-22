package crawler.controller;

import com.google.common.collect.Lists;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.twitter.hbc.ClientBuilder;
import com.twitter.hbc.core.Client;
import com.twitter.hbc.core.Hosts;
import com.twitter.hbc.core.HttpHosts;
import com.twitter.hbc.core.endpoint.StatusesFilterEndpoint;
import com.twitter.hbc.core.processor.StringDelimitedProcessor;
import com.twitter.hbc.httpclient.auth.Authentication;
import com.twitter.hbc.httpclient.auth.OAuth1;
import crawler.controller.cosmos.Tweet;
import crawler.controller.cosmos.TweetDaoController;
import crawler.controller.cosmos.TweetDaoFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import utils.Constants;

<<<<<<< HEAD
=======
import java.text.SimpleDateFormat;
>>>>>>> a3749bb94b69d40b981ff0c93cd57e5686e5d1ae
import java.util.*;
import java.util.concurrent.BlockingDeque;
import java.util.concurrent.LinkedBlockingDeque;
import java.util.concurrent.TimeUnit;

public class TwitterAnalyzerController {


    private final com.google.gson.JsonParser jsonParser = new com.google.gson.JsonParser();

    private final Logger logger = LoggerFactory.getLogger(TwitterAnalyzerController.class.getName());

    private Client hosebirdClient;

    private final BlockingDeque<String> msgQueue = new LinkedBlockingDeque<>(1000);

    private final Authentication hosebirdAuth = new OAuth1(Constants.CONSUMER_KEY, Constants.CONSUMER_SECRET,
            Constants.TOKEN, Constants.SECRET);

    private final StatusesFilterEndpoint hosebirdEndpoint = new StatusesFilterEndpoint();


    private final TweetDaoController tweetDaoController = new TweetDaoController(TweetDaoFactory.getTweetDao());
    /**
     * Declare the host you want to connect to, the endpoint, and authentication (basic auth or oauth)
     */
    private final Hosts hosebirdHosts = new HttpHosts(com.twitter.hbc.core.Constants.STREAM_HOST);

    private static final String HOSEBIRD_CLIENT_NAME = "Hosebird-Client-01";  // optional: mainly for the logs

<<<<<<< HEAD
=======
    private static final SimpleDateFormat SDF = new SimpleDateFormat();


>>>>>>> a3749bb94b69d40b981ff0c93cd57e5686e5d1ae
    /**
     * @param numberOfTweets
     * @return List<String> the list of tweets in json format
     * @throws InterruptedException
     */
    public List<Map<String, String>> pollTerms(final int numberOfTweets, final List<String> terms) {

        final List<Map<String, String>> collectedWeights = new ArrayList();

        Double weights = 0.0;
        int tweetsInspected = 0;

        for (final String term : terms) {

            final List<Tweet> tweetObjList = tweetDaoController.readTweets(term);

            if (tweetObjList == null || ++tweetsInspected >= numberOfTweets) {
                continue;
            }

            final Map<String, String> result = new HashMap<>();

            for (final Tweet tweetObj : tweetObjList) {
                weights += getWeights(tweetObj.getText(), terms);
            }

            weights = tweetObjList.size() != 0 ? weights / tweetObjList.size() : 0.0;

            result.put("Key", term);
            result.put("Value", Double.toString(weights));
            collectedWeights.add(result);
        }

        return collectedWeights;
    }

    /**
     * @param numberOfTweets
     * @param lang
     * @return
     */
    public Map<String, Integer> putHashtags(final int numberOfTweets, final String lang, final String fakeNewsIndicator) {

        int tweetsAccepted = 0;


        while (!hosebirdClient.isDone()) {

            if (numberOfTweets <= tweetsAccepted) {
                break;
            }

            try {

                final String strTweet = msgQueue.poll(5, TimeUnit.SECONDS);

                if (strTweet == null) {
                    continue;
                }

                final Tweet tweet = extractText(strTweet, lang, fakeNewsIndicator);

                if (tweet == null) {
                    continue;
                }

                final Tweet tweetDb = tweetDaoController.persist(tweet);
                logger.info(tweetDb.getText());
                tweetsAccepted++;


            } catch (InterruptedException e) {
                e.printStackTrace();
                hosebirdClient.stop();
            }
        }

        final Map<String, Integer> results = new HashMap<>();
        results.put("tweets_put: ", tweetsAccepted);
        return results;

    }

    /**
     * @param strTweet
     * @param lang
     * @param fakeNewsIndicator a hash tag flagging the topic as fake news
     * @return
     */
    private Tweet extractText(final String strTweet, final String lang, final String fakeNewsIndicator) {

        final JsonParser jsonParser = new JsonParser();
        JsonObject jsonTweet = jsonParser.parse(strTweet).getAsJsonObject();

        JsonElement textElement = jsonTweet.get("text");
        JsonElement langElement = jsonTweet.get("lang");

<<<<<<< HEAD
        //   if (textElement == null || textElement.toString().startsWith("\"RT @") || langElement == null || !langElement.toString().equals(lang)) {
=======
>>>>>>> a3749bb94b69d40b981ff0c93cd57e5686e5d1ae
        if (textElement == null || langElement == null || !langElement.getAsString().equals(lang)) {
            return null;
        }

<<<<<<< HEAD
        // we are looking for tweets flagged as fake
=======
>>>>>>> a3749bb94b69d40b981ff0c93cd57e5686e5d1ae
        if (!stringContainsItemFromList(textElement.getAsString(), fakeNewsIndicator.toLowerCase().split(","))) {
            return null;
        }

        final JsonElement strIdElem = jsonTweet.get("id_str");

        final Tweet tweetObj = new Tweet();
        tweetObj.setId(strIdElem.getAsString());
<<<<<<< HEAD
=======
        tweetObj.set_partitionKey(SDF.format(new Date()));
>>>>>>> a3749bb94b69d40b981ff0c93cd57e5686e5d1ae
        tweetObj.setText(textElement.getAsString().replace("\\", "").replace("\\n", ""));
        tweetObj.setLang(langElement.getAsString().replace("\\", ""));

        return tweetObj;
    }

    private boolean stringContainsItemFromList(String inputStr, String[] items) {
        return Arrays.stream(items).parallel().anyMatch(inputStr.toLowerCase()::contains);
    }

    private Double getWeights(final String text, final List<String> terms) {

        if (text == null || terms == null || terms.size() == 0) {
            return 0.0;
        }

        double count = 0;
        for (final String term : terms) {
            if (text.toLowerCase().contains(term)) {
                count++;
            }
        }

        return count / terms.size();
    }

    /**
     * Build the client and starts connection
     */
    public void doConnection(final List<String> terms) {

        hosebirdEndpoint.trackTerms(terms);

        final ClientBuilder builder = new ClientBuilder()
                .name(HOSEBIRD_CLIENT_NAME)
                .hosts(hosebirdHosts)
                .authentication(hosebirdAuth)
                .endpoint(hosebirdEndpoint)
                .processor(new StringDelimitedProcessor(msgQueue));

        // no timeout (1000 days).
        builder.socketTimeout(60 * 60 * 24 * 1000);

        hosebirdClient = builder.build();
        hosebirdClient.connect();
        logger.info("End of application");
    }

    /**
     * stops the client
     */
    public void stop() {

        if (hosebirdClient != null) {
            hosebirdClient.stop();

        }
    }
}
