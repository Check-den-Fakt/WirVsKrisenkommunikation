FROM openjdk:11-jdk-slim

COPY target/trustedpublisher-0.0.1-SNAPSHOT.jar /deployments/app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","/deployments/app.jar"]