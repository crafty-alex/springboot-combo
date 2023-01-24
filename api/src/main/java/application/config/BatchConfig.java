package application.config;

import application.service.JobReader;
import application.service.JobWriter;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableBatchProcessing
public class BatchConfig {

    @Autowired
    private StepBuilderFactory stepBuilderFactory;

    @Autowired
    private JobBuilderFactory jobs;

    @Autowired
    private JobReader reader;

    @Autowired
    private JobWriter writer;

    @Bean
    protected Step read() {
        return stepBuilderFactory.get("read").tasklet(reader).build();
    }

    @Bean
    protected Step write() {
        return stepBuilderFactory.get("write").tasklet(writer).build();
    }

    @Bean
    public Job job() {
        return jobs.get("job")
                .start(read())
                .next(write())
                .build();
    }

}
