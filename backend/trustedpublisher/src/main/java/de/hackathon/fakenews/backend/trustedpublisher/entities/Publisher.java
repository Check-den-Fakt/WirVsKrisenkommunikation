package de.hackathon.fakenews.backend.trustedpublisher.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.List;

@Entity
public class Publisher {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    public Long  id;

    public double trustScore;

    public List<TrustUri> knownUris;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
