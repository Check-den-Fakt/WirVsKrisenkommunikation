package de.hackathon.fakenews.backend.trustedpublisher.entities;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "url")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TrustUri {

    @Id
    public Integer idurl;

    public String url;

    @ManyToOne(optional = false)
    Publisher publisher;
}
