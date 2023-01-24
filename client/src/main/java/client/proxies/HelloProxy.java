package client.proxies;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "spring-cloud-eureka-client")
public interface HelloProxy {

    @GetMapping("/hello")
    String hello();
}
