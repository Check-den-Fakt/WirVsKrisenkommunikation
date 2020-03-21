package de.hackathon.fakenews.backend.trustedpublisher.entities;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Publisher {

    @Id
    public Integer idPublisher;

    public String title;

    public BigDecimal trustScore;

    @OneToMany(mappedBy = "publisher")
    @Setter(AccessLevel.NONE)
    public List<TrustUri> knownUris;

}
