package de.hackathon.fakenews.backend.trustedpublisher.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class TrustUri {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    public Long id;

    public String uri;

    public TrustUri() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUri() {
        return uri;
    }

    public void setUri(String uri) {
        this.uri = uri;
    }
}
