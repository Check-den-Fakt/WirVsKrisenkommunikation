package de.hackathon.fakenews.backend.trustedpublisher.entities;

import javax.persistence.*;
import java.util.List;

@Entity
public class Publisher {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    public Integer idPublisher;

    public String title;

    public double trustScore;

    @OneToMany
    public List<TrustUri> knownUris;

    public Integer getIdPublisher() {
        return idPublisher;
    }

    public void setIdPublisher(Integer idPublisher) {
        this.idPublisher = idPublisher;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public double getTrustScore() {
        return trustScore;
    }

    public void setTrustScore(double trustScore) {
        this.trustScore = trustScore;
    }

    public List<TrustUri> getKnownUris() {
        return knownUris;
    }

    public void setKnownUris(List<TrustUri> knownUris) {
        this.knownUris = knownUris;
    }
}
