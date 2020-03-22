FROM openjdk:11.0.6-jre-slim

COPY target/trustedpublisher-0.0.1-SNAPSHOT.jar /deployments/app.jar

ENV SPRING_PROFILES_ACTIVE prod

EXPOSE 8080

ENTRYPOINT ["java","-jar","/deployments/app.jar"]