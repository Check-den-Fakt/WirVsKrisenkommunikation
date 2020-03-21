package de.hackathon.fakenews.backend.trustedpublisher.controller;

import de.hackathon.fakenews.backend.trustedpublisher.domain.TrustedAnswerDTO;
import de.hackathon.fakenews.backend.trustedpublisher.domain.TrustedPublisherDTO;
import de.hackathon.fakenews.backend.trustedpublisher.entities.Publisher;
import de.hackathon.fakenews.backend.trustedpublisher.exception.ElementNotFoundException;
import de.hackathon.fakenews.backend.trustedpublisher.repositories.PublisherRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TrustedPublisherController {

    private final static Logger log = LoggerFactory.getLogger(TrustedPublisherController.class);

    @Autowired
    PublisherRepository publisherRepository;

    @PostMapping(path = "/", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public TrustedAnswerDTO getTrustScore(@RequestBody final TrustedPublisherDTO trustedPublisherDTO){

        log.info(trustedPublisherDTO.toString());

        List<Publisher>  possiblePublisher = publisherRepository.findAllByKnownUrisContaining(trustedPublisherDTO.getUri());

        if (possiblePublisher.isEmpty()){
            throw new ElementNotFoundException();
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
