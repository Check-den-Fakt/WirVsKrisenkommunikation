package de.hackathon.fakenews.backend.trustedpublisher.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
public class TrustUri {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  public Long id;

  public String uri;

  @ManyToOne(optional = false)
  Publisher publisher;
}
