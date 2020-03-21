package de.hackathon.fakenews.backend.trustedpublisher.domain;

public class TrustedPublisherDTO {

    String uri;

    String text;


    public String getUri() {
        return uri;
    }

    public void setUri(String uri) {
        this.uri = uri;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
