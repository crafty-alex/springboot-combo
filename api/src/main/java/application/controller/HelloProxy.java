package application.controller;

import org.springframework.web.bind.annotation.GetMapping;

public interface HelloProxy {

    @GetMapping("/hello")
    String hello();
}
