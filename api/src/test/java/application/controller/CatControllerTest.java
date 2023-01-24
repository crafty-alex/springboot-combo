package application.controller;

import application.model.CatDTO;
import application.service.CatService;
import com.fasterxml.jackson.databind.ObjectMapper;
import config.DatabaseConfig;
import net.minidev.json.JSONArray;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.cloud.autoconfigure.RefreshAutoConfiguration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import java.util.LinkedHashMap;

import static org.hamcrest.core.Is.isA;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

//integrates the Spring TestContext framework into JUnit 5 + custom configs
@ExtendWith({SpringExtension.class, DatabaseConfig.class})
//@RefreshScope config needs to be imported
@ImportAutoConfiguration(RefreshAutoConfiguration.class)
//disables full auto-configuration and auto-configures MockMvc
@WebMvcTest(value = CatController.class)
class CatControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private CatService catService;

    @BeforeEach
    public void setUp() {
        System.out.println("Before the method is executed");
    }

    @Test
    void when_get_cat_then_return_200() throws Exception {
        CatDTO cat = new CatDTO();
        cat.setName("Minnie");
        cat.setColor("pink");

        given(catService.getCat("Minnie")).willReturn(cat);

        mvc.perform(get("http://8080/get-cat/Minnie")
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", isA(LinkedHashMap.class)))
                .andExpect(jsonPath("$.*", isA(JSONArray.class)))
                .andExpect(jsonPath("$.color").value("pink"))
                .andExpect(jsonPath("$.name").value("Minnie"));

                //if we fetch a list , it would be : .andExpect(jsonPath("$[*].name", containsInAnyOrder("Minnie", "Mickey")));
    }

    @Test
    void when_save_cat_then_return_201() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        CatDTO cat = new CatDTO();
        cat.setName("Mickey");
        cat.setColor("green");
        String catString = objectMapper.writeValueAsString(cat);

        given(catService.saveCat(any(CatDTO.class))).willReturn(cat);

        mvc.perform(post("http://8080/save-cat")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(catString)
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$", isA(LinkedHashMap.class)))
                .andExpect(jsonPath("$.*", isA(JSONArray.class)))
                .andExpect(jsonPath("$.color").value("green"))
                .andExpect(jsonPath("$.name").value("Mickey"));
    }

    @Test
    void when_save_bad_cat_then_return_400() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        CatDTO cat = new CatDTO();
        cat.setName("");
        String catString = objectMapper.writeValueAsString(cat);

        mvc.perform(post("http://8080/save-cat")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(catString)
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }
}
