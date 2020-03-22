package crawler.controller.cosmos;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class TweetDaoController {

    private static final SimpleDateFormat SDF = new SimpleDateFormat();

    public static TweetDaoController getInstance() {

        if (tweetDaoController == null) {
            tweetDaoController = new TweetDaoController(TweetDaoFactory.getTweetDao());
        }
        return tweetDaoController;
    }

    private static TweetDaoController tweetDaoController;

    private final TweetDao tweetDao;

    public TweetDaoController(TweetDao tweetDao) {
        this.tweetDao = tweetDao;
    }

    public Tweet persist(final Tweet tweet) {
        return tweetDao.createTweet(tweet);
    }

    public Tweet persist(String id, String lang, String text) {

        final Tweet tweet = new Tweet();
        tweet.setId(id);
        tweet.set_partitionKey(SDF.format(new Date()));
        tweet.setLang(lang);
        tweet.setText(text);

        return tweetDao.createTweet(tweet);
    }

    public boolean deleteTweet(String id) {
        return tweetDao.deleteTweet(id);
    }

    public List<Tweet> readTweets(final String text) {
        return tweetDao.readTweets(text);
    }

    public Tweet updateTweet(String id, String lang, String text) {
        return tweetDao.updateTweet(id, lang, text);
    }
}
