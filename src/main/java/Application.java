import com.google.common.collect.Lists;
import crawler.controller.TwitterAnalyzerController;
import utils.Constants;

import java.util.List;

public class Application {

    private static final List<String> TERMS = Lists.newArrayList("ibuprofen", "vaccine");

    public static void main(String[] args) {

        final TwitterAnalyzerController twitterAnalyzerController = new TwitterAnalyzerController();

        try {

            //   twitterAnalyzerController.doConnection(Constants.HASHTAGS);
            twitterAnalyzerController.doConnection(Constants.HASHTAGS);
            twitterAnalyzerController.putHashtags(1000, "en", "fake,false,hoax");
            twitterAnalyzerController.putHashtags(1000, "de", "fake,abzoke,falsch");

          /*  List<Map<String, String>> maps = twitterAnalyzerController.pollTerms(1000, TERMS);

            String jsonTweetsList = JsonParser.toJson(maps);
            System.out.println(jsonTweetsList);*/

          /*  List<Topic> topics = topicController.getTopics();
            for (Topic topic : topics) {
                System.out.println(topic);
            }*/


        } catch (final Exception e) {
            twitterAnalyzerController.stop();
            e.printStackTrace();

        }
    }

}
