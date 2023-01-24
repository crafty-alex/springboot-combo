
# Module config

- port : 9101
- http://localhost:9101/spring-cloud-eureka-client-dev/default

# Module discovery

- port : 8761
- http://localhost:8761/

# Module api

- port : 9090
- http://localhost:9090/actuator/info
- http://localhost:9090/actuator/health
- http://localhost:9090/actuator/refresh (POST with Postman)
- in IntelliJ run config --> environment variables --> SPRING_PROFILES_ACTIVE=dev (ou prod)
- example call : http://localhost:9090/hello

# Module client

- port : 7070
- example call : http://localhost:7070/foos/hello

# Module zuul

- port : 9595

### Step 1 :


- POST : localhost:9595/authenticate

- Body :

```
        {
        "username": "javainuse",
        "password": "password"
        }
 ```       


### Step 2 :


- GET : localhost:9595/foos/hello

- Authorization header : Bearer <whitespace> token generated at step 1



# Zipkin

```
java -jar zipkin-server-2.6.1-exec.jar
```
