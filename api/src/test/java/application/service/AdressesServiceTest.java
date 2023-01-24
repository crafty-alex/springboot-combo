package application.service;

import application.model.Post;
import config.DatabaseConfig;
import okhttp3.mockwebserver.MockResponse;
import okhttp3.mockwebserver.MockWebServer;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.io.IOException;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith({SpringExtension.class, DatabaseConfig.class})
class AdressesServiceTest {

    private static MockWebServer mockWebServer;

    private static AdressesService adressesService;

    @BeforeAll
    public static void startServer() {
        mockWebServer = new MockWebServer();
        adressesService = new AdressesService(mockWebServer.url("localhost/").toString());
    }

    @AfterAll
    public static void stopServer() throws IOException {
        mockWebServer.shutdown();
    }


    @Test
    void should_post() {
        mockWebServer.enqueue(
                new MockResponse()
                        .setResponseCode(200)
                        .setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .setBody("{\"id\": 5, \"body\": \"this is the body\"}"));

        Post response = adressesService.getPost(1);
        assertEquals("this is the body", response.getBody());
        assertEquals(5, response.getId());
    }

    @Test
    void should_post_with_params() {
        mockWebServer.enqueue(
                new MockResponse()
                        .setResponseCode(200)
                        .setHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .setBody("[{\"id\": 3, \"body\": \"this is the BODY\"}]"));

        List<Post> response = adressesService.getPostWithParam(1);
        assertEquals("this is the BODY", response.get(0).getBody());
        assertEquals(3, response.get(0).getId());
    }
}
