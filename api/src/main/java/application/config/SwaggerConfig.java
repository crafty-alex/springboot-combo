package application.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI publicApi() {
        return new OpenAPI()
                .info(new Info()
                .title("REST API")
                .version("1.0.0")
                );
    }

    //http://localhost:9090/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config
}
