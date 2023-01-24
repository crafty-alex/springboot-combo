package integration;

import application.Application;
import application.entity.Cat;
import application.model.CatDTO;
import application.repository.CatRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.minidev.json.JSONArray;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.LinkedHashMap;

import static org.hamcrest.core.Is.isA;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

//integrates the Spring TestContext framework (ex: mockbean...) + custom configs
//@ExtendWith({SpringExtension.class, DatabaseConfig.class}) // not necessary with @SpringBootTest
//brings whole Spring application context (no mocking), except the HTTP part which by default is MOCKED
@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.MOCK, classes = Application.class)
//auto-configures MockMvc
@AutoConfigureMockMvc
//to set the db to H2 and not use a real db
//@TestPropertySource("classpath:application.properties")
class IntegrationTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private CatRepository catRepository;

    @Test
    void when_get_cat_then_return_200() throws Exception {
        Cat cat = new Cat();
        cat.setColor("purple");
        cat.setName("Kiwi");
        catRepository.saveAndFlush(cat);

        mvc.perform(get("http://8080/get-cat/Kiwi")
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", isA(LinkedHashMap.class)))
                .andExpect(jsonPath("$.*", isA(JSONArray.class)))
                .andExpect(jsonPath("$.color").value("purple"))
                .andExpect(jsonPath("$.name").value("Kiwi"));
    }

    @Test
    void when_save_cat_then_return_201() throws Exception {

        ObjectMapper objectMapper = new ObjectMapper();
        CatDTO catDTO = new CatDTO();
        catDTO.setName("Dingo");
        catDTO.setColor("orange");
        String catString = objectMapper.writeValueAsString(catDTO);

        mvc.perform(post("http://8080/save-cat")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(catString)
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$", isA(LinkedHashMap.class)))
                .andExpect(jsonPath("$.*", isA(JSONArray.class)))
                .andExpect(jsonPath("$.color").value("orange"))
                .andExpect(jsonPath("$.name").value("Dingo"));
    }

}
