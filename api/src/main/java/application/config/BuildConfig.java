package application.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
@Slf4j
public class BuildConfig implements WebMvcConfigurer {

    /*@Autowired
    BuildProperties buildProperties;*/


    @Override
    public void addResourceHandlers(final ResourceHandlerRegistry registry) {
        log.info("<------------------ App Info ----------------->");
        //log.info("Starting: {} ", buildProperties.getName());
        //log.info("POM version: {} ", buildProperties.getVersion());
        log.info("<------------------ App Info ----------------->");
    }
}
