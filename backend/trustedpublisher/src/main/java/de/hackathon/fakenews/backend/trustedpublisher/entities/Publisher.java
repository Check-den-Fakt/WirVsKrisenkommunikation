package de.hackathon.fakenews.backend.trustedpublisher.entities;

import javax.persistence.*;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
public class Publisher {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    public Long  id;

    public double trustScore;

    @OneToMany(mappedBy = "publisher")
    @Setter(AccessLevel.NONE)
    public List<TrustUri> knownUris;
}
