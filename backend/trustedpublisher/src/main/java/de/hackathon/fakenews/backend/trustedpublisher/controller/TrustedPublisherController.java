package de.hackathon.fakenews.backend.trustedpublisher.controller;

import de.hackathon.fakenews.backend.trustedpublisher.domain.TrustedAnswerDTO;
import de.hackathon.fakenews.backend.trustedpublisher.domain.TrustedPublisherDTO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TrustedPublisherController {

    @GetMapping
    public TrustedAnswerDTO getTrustScore(@RequestBody TrustedPublisherDTO trustedPublisherDTO){

        TrustedAnswerDTO trustedAnswerDTO = new TrustedAnswerDTO();

        trustedAnswerDTO.setTrustScore(0.9);
        //TODO Logik

        return trustedAnswerDTO;

    }

}
