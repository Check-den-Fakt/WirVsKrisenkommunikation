package de.hackathon.fakenews.backend.trustedpublisher.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TrustedAnswerDTO {

    public BigDecimal trustScore;
    public String source;
}
