package crawler.controller.cosmos;

import java.util.List;

public interface TweetDao {

    Tweet createTweet(Tweet tweet);

    List<Tweet> readTweets(String text);

    Tweet updateTweet(String id, String lang, String text);

    boolean deleteTweet(String id);
}
