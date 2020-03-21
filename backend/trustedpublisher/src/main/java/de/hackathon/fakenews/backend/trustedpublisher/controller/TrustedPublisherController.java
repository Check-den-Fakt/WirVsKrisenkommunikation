package de.hackathon.fakenews.backend.trustedpublisher.controller;

import de.hackathon.fakenews.backend.trustedpublisher.domain.TrustedAnswerDTO;
import de.hackathon.fakenews.backend.trustedpublisher.domain.TrustedPublisherDTO;
import de.hackathon.fakenews.backend.trustedpublisher.entities.Publisher;
import de.hackathon.fakenews.backend.trustedpublisher.repositories.PublisherRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
public class TrustedPublisherController {

    private final static Logger log = LoggerFactory.getLogger(TrustedPublisherController.class);

    @Autowired
    PublisherRepository publisherRepository;

    @PostMapping
    public TrustedAnswerDTO getTrustScore(@RequestBody TrustedPublisherDTO trustedPublisherDTO){

        log.info(trustedPublisherDTO.toString());

        List<Publisher>  possiblePublisher = publisherRepository.findAllByKnownUrisContaining(trustedPublisherDTO.getUri());

        if (possiblePublisher.isEmpty()){
            throw new NoSuchElementException();
        }

        if (possiblePublisher.size()>1){
            throw new RuntimeException("Too Many");
        }

        TrustedAnswerDTO trustedAnswerDTO = new TrustedAnswerDTO(possiblePublisher.get(0).trustScore);

        return trustedAnswerDTO;

    }

    @GetMapping
    public Iterable<Publisher> getAll(){
        return publisherRepository.findAll();
    }

}
