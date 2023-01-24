package zuul;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;

@EnableZuulProxy
@SpringBootApplication
public class ZuulApplication {

    public static void main(String[] args) {
        SpringApplication.run(ZuulApplication.class, args);
    }

}


// step 1 :

/*
POST : localhost:9595/authenticate
        {
        "username": "javainuse",
        "password": "password"
        }
        */


// step 2 :

/*
GET : localhost:9595/foos/hello

       + Authorization header : Bearer <whitespace> token generated at step 1

        */