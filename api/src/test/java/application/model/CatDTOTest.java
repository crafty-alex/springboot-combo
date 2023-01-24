package application.model;

import config.DatabaseConfig;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith({SpringExtension.class, DatabaseConfig.class})
class CatDTOTest {

    private static Validator validator;

    @BeforeAll
    static void beforeAll() {
        validator = Validation.buildDefaultValidatorFactory().getValidator();
    }


    @Test
    void should_set_good_name() {
        CatDTO catDTO = new CatDTO();
        catDTO.setName("Yolo");
        Set<ConstraintViolation<CatDTO>> violations2 = validator.validate(catDTO);
        assertEquals(0, violations2.size());
    }

    @Test
    void should_set_bad_name() {
        CatDTO catDTO = new CatDTO();
        Set<ConstraintViolation<CatDTO>> violations = validator.validate(catDTO);
        assertEquals(1, violations.size());
    }

}