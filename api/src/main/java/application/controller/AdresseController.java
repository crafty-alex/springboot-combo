package application.controller;

import application.model.Post;
import application.service.AdressesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("${client.server.origin}")
@RequiredArgsConstructor
public class AdresseController {

    private final AdressesService adressesService;

    @GetMapping(value = "/get-adresse/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public Post getPost(@PathVariable(name = "id") int id) {
        return adressesService.getPost(id);
    }

    @GetMapping(value = "/get-adresse-param/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Post> getPostWithParam(@PathVariable(name = "id") int id) {
        return adressesService.getPostWithParam(id);
    }

}
