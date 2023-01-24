package client.service;

import client.proxies.HelloProxy;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
public class HelloService {

    private final HelloProxy helloProxy;

    @Async
    public CompletableFuture<String> hello(){
        return CompletableFuture.completedFuture(helloProxy.hello());
    }
}
