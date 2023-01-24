package application.service;

import application.entity.Cat;
import application.mapper.CatMapperImpl;
import application.model.CatDTO;
import application.repository.CatRepository;
import config.DatabaseConfig;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith({SpringExtension.class, DatabaseConfig.class})
@ContextConfiguration(classes = {CatServiceImpl.class, CatMapperImpl.class})
//@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD) //if repo not mocked and need h2 to clean context between tests (no need truncate tables in @BeforeEach)
class CatServiceImplTest {

    @Autowired
    private CatServiceImpl catService;

    @MockBean
    private CatRepository catRepository;

    private Cat cat;

    private Optional<Cat> optionalCat;

    @BeforeEach
    public void setUp() {
        cat = new Cat();
        cat.setName("Myrtille");
        cat.setColor("blue");
        optionalCat = Optional.of(cat);
    }

    @Test
    void should_save_cat() {
        Mockito.when(catRepository.save(Mockito.any())).thenReturn(cat);
        CatDTO cat = new CatDTO();
        CatDTO catSaved = catService.saveCat(cat);
        assertEquals("Myrtille", catSaved.getName());
    }

    @Test
    void should_get_cat() {
        Mockito.when(catRepository.findByName(cat.getName())).thenReturn(optionalCat);
        CatDTO cat = catService.getCat("Myrtille");
        assertEquals("blue", cat.getColor());
    }

    @Test
    void should_not_get_cat() {
        Optional<Cat> emptyCat = Optional.empty();
        Mockito.when(catRepository.findByName("Jun")).thenReturn(emptyCat);
        Exception exception = assertThrows(ResponseStatusException.class, () -> {
            catService.getCat("Jun");
        });
        String expectedMessage = "Chat introuvable!";
        String actualMessage = exception.getMessage();
        assertTrue(actualMessage.contains(expectedMessage));
    }
}
