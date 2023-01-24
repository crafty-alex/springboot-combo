FROM adoptopenjdk:11-jre-hotspot

RUN chmod -R 777 /var/log/

RUN addgroup --system spring --gid 1001 && adduser --system spring --gid 1001 --uid 1001
USER spring:spring

ARG JAR_FILE=target/*.jar

COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java", "-Dspring.profiles.active=docker", "-jar","/app.jar"]

#docker run -p 8080:8080 my-service