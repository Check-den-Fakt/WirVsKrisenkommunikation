package de.hackathon.fakenews.backend.trustedpublisher.entities;

import javax.persistence.*;
import java.util.List;

@Entity
public class Publisher {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    public Long  id;

    public double trustScore;

    @OneToMany
    public List<TrustUri> knownUris;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
}
