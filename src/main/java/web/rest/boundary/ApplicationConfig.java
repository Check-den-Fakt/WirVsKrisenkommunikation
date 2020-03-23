package web.rest.boundary;

/*
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.module.jaxb.JaxbAnnotationModule;
import org.glassfish.jersey.jackson.internal.jackson.jaxrs.json.JacksonJaxbJsonProvider;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.ServerProperties;
import web.boundary.TwitterAnalyzerApi;
*/


import org.glassfish.jersey.server.ResourceConfig;
import web.boundary.TwitterAnalyzerApi;

import javax.ws.rs.ApplicationPath;

/**
 * JAX RS application class.
 *
 * @author jog
 */
@ApplicationPath("/")
public class ApplicationConfig extends ResourceConfig {

    /**
     * The default constructor.
     */
    public ApplicationConfig() {

        super();
        register(TwitterAnalyzerApi.class);

    }

}
