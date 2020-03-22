package crawler.controller.cosmos;

public class TweetDaoFactory {

    private static TweetDao tweetDao = new DocDbDao();

    public static TweetDao getTweetDao() {
        return tweetDao;
    }
}
