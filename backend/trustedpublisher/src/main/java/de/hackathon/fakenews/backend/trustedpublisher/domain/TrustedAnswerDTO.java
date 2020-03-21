package de.hackathon.fakenews.backend.trustedpublisher.domain;

import java.math.BigDecimal;

public class TrustedAnswerDTO {

    public BigDecimal trustScore;

    public TrustedAnswerDTO(BigDecimal trustScore) {
        this.trustScore = trustScore;
    }

    public BigDecimal getTrustScore() {
        return trustScore;
    }

    public void setTrustScore(BigDecimal trustScore) {
        this.trustScore = trustScore;
    }
}
