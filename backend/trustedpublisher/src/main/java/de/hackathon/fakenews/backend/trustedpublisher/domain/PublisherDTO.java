package de.hackathon.fakenews.backend.trustedpublisher.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class PublisherDTO {

    public String name;
    public BigDecimal trustScore;
    List<String> uris;
}
