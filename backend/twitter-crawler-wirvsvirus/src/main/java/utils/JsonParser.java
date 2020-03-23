package utils;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;


/**
 * Utility class for serialize and deserialize Json objects
 */
public final class JsonParser {

    private static ObjectMapper objectMapper;

    private JsonParser() {
        super();
    }


    private static ObjectMapper getMapper() {
        if (objectMapper == null) {
            objectMapper = new ObjectMapper();
        }
        return objectMapper;
    }

    /**
     * Convert the provided object into json format
     *
     * @param source
     * @param <T>
     * @return
     * @throws JsonProcessingException
     */
    public static <T> String toJson(final T source) throws JsonProcessingException {
        return getMapper().writeValueAsString(source);
    }

    /**
     * Parse the json input into a java object
     *
     * @param json
     * @param clazz
     * @param <T>
     * @return
     * @throws IOException
     */
    public static <T> T toEntity(final String json, final Class<T> clazz) throws IOException {
        return getMapper().readValue(json, clazz);
    }

    /**
     *  check if json is valid
     * @param json the string
     * @param clazz the class
     * @param <T> class
     * @return boolean
     */
    public static <T> boolean isValid(final String json, final Class<T> clazz) {
        try {
            getMapper().readValue(json, clazz);
            return true;
        } catch (final IOException e) {
            return false;
        }
    }

}
