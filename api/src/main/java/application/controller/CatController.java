package application.controller;

import application.model.CatDTO;
import application.service.CatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin("${client.server.origin}")
@RefreshScope
@Slf4j
@RequiredArgsConstructor
public class CatController implements HelloProxy {

    private final CatService catService;

    @Value("${hello.name}")
    private String name;


    @PostMapping(value = "/save-cat", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CatDTO> saveCat(@Valid @RequestBody CatDTO catDTO) {
        catService.catSound();
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(catService.saveCat(catDTO));
    }

    @GetMapping(value = "/get-cat/{name}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CatDTO> getCat(@PathVariable("name") String name) {
        catService.catSound();
        return ResponseEntity.status(HttpStatus.OK)
                .body(catService.getCat(name));
    }

    @PutMapping(value = "/update-cat/{name}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Void> updateCat(@PathVariable("name") String name, @Valid @RequestBody CatDTO catDTO) {
        catService.catSound();
        catService.updateCat(name, catDTO);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping(value = "/delete-cat/{name}")
    public ResponseEntity<Void> deleteCat(@PathVariable("name") String name) {
        catService.catSound();
        catService.deleteCat(name);
        return ResponseEntity.noContent().build();
    }

    @Override
    public String hello() {
        log.info("This is an INFO log :)");
        return "HELLO " + name;
    }
}
