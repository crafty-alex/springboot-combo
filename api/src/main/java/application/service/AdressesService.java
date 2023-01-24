package application.service;


import application.model.Post;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class AdressesService {

    private final WebClient webClient;

    public AdressesService(@Value("${uri.jsons}") String baseURL) {
        webClient = WebClient.builder().baseUrl(baseURL)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    //for request with path variables
    public Post getPost(int id) {
        return webClient.get().uri("/posts/{id}", id)
                .retrieve()
                .onStatus(
                        (http -> HttpStatus.resolve(404) == http),
                        (it -> {
                            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Adresse non trouvée");
                        })
                )
                .bodyToMono(Post.class)
                .block();
    }

    //for request with request params
    public List<Post> getPostWithParam(int id) {
        return webClient.get().uri(
                uriBuilder -> uriBuilder
                        .path("/comments")
                        .queryParam("postId", id)
                        .build()
                        )
                        .retrieve()
                        .bodyToFlux(Post.class)
                        .collectList()
                        .block();
    }


/*    return WebClient.create().post()
            .uri(builder.build().toUri())
            .body(Mono.just(request), RequestObject.class)
            .retrieve()
            .bodyToMono(ResponseObject.class)
            .block();*/

}
