package application.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.*;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
public class BatchController {

    @Autowired
    private JobLauncher asyncJobLauncher;

    @Autowired
    private Job job;

    @GetMapping("/process")
    public ResponseEntity<Long> job() throws JobExecutionException {

        var jobParametersBuilder = new JobParametersBuilder();

        JobParameters jobParameters = jobParametersBuilder
                .addLong("time", System.currentTimeMillis())
                .toJobParameters();

        JobExecution jobExecution = asyncJobLauncher.run(job, jobParameters);

        return ResponseEntity.ok(jobExecution.getId());
    }


}
