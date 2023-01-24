package client;

import client.service.HelloService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.ExecutionException;

@EnableFeignClients
@RestController
@SpringBootApplication
@RequiredArgsConstructor
@EnableAsync
@Slf4j
public class FeignClientApplication {

    private final HelloService helloService;

    public static void main(String[] args) {
        SpringApplication.run(FeignClientApplication.class, args);
    }

    @GetMapping("/foos/hello")
    public String hello() throws ExecutionException, InterruptedException {
        log.info("Calling that Eureka Client....");
        return helloService.hello().get();
    }
}
