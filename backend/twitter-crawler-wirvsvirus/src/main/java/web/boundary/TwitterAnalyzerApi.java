package web.boundary;


import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import crawler.controller.TwitterAnalyzerController;
import crawler.controller.cosmos.Tweet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Path("/twitter")
@RequestScoped
public class TwitterAnalyzerApi {

    private TwitterAnalyzerController twitterAnalyzerController = new TwitterAnalyzerController();

    private final static Logger LOGGER = LoggerFactory.getLogger(TwitterAnalyzerApi.class.getName());

    private final JsonParser jsonParser = new JsonParser();

    public TwitterAnalyzerApi() {
        LOGGER.info("TwitterAnalyzerApi created");
    }

    @POST
    @Path("/matches")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCheck(@QueryParam("lang") @DefaultValue("de") final String lang,
                             @QueryParam("count") @DefaultValue("20") final Integer count,
                             final String bodyRequest) {

        try {

            JsonParser jsonParser = new JsonParser();
            JsonElement jsonElement = jsonParser.parse(bodyRequest);
            JsonArray asJsonArray = jsonElement.getAsJsonArray();

            final List<String> terms = new ArrayList<>();

            for (final JsonElement je : asJsonArray) {

                final String key = je.getAsJsonObject().get("Key").getAsString();
                terms.add(key);
            }

            twitterAnalyzerController.doConnection(terms);
            final List<Map<String, String>> weights = twitterAnalyzerController.pollTerms(count, terms);
            return Response.ok(weights).build();

        } catch (final Exception e) {

            return Response
                    .status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(String.format("[{error: %s}]", e.getMessage()))
                    .build();
        }
    }

    @PUT
    @Path("/hashtags")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response putHashtags(@QueryParam("lang") @DefaultValue("de") final String lang,
                                @QueryParam("count") @DefaultValue("20") final Integer count,
                                @QueryParam("fakeNewsIndicator") @DefaultValue("fake,false,hoax") final String fakeNewsIndicator,
                                final String bodyRequest) {

        final List<String> terms = new ArrayList<>();

        try {

            final JsonElement jsonElement = jsonParser.parse(bodyRequest);
            final JsonArray asJsonArray = jsonElement.getAsJsonArray();

            for (final JsonElement je : asJsonArray) {

                JsonElement keyElement = je.getAsJsonObject().get("Key");
                if (keyElement != null) {
                    final String key = keyElement.getAsString();
                    terms.add(key);
                }
            }

            twitterAnalyzerController.doConnection(terms);
            final Map<String, Integer> tweets = twitterAnalyzerController.putHashtags(count, lang, fakeNewsIndicator);
            return Response.ok(tweets).build();

        } catch (final Exception e) {

            return Response
                    .status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(String.format("[{error: %s}]", e.getMessage()))
                    .build();
        }
    }


}
