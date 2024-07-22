package application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication(exclude = {RepositoryRestMvcAutoConfiguration.class}) // disables auto-created REST endpoints (not secure!)
@EnableCaching
public class Application /*extends SpringBootServletInitializer*/ {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

   /* @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(Application.class);
    }*/

}
