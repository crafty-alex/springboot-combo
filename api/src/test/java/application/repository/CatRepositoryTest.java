package application.repository;

import application.entity.Cat;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;

//disables full auto-configuration and instead apply only configuration relevant to JPA tests (database h2)
@DataJpaTest
@Sql(scripts={"classpath:data-test.sql"})
class CatRepositoryTest {

    @Autowired
    CatRepository catRepository;

    @Test
    void should_find_by_name() {
        Optional<Cat> cat = catRepository.findByName("Jinx");
        Cat catFound = cat.orElseThrow(() -> {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Chat introuvable!");
        });
        assertEquals("black", catFound.getColor());
    }
}