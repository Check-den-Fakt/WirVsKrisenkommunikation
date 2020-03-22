package de.hackathon.fakenews.backend.trustedpublisher.controller;

import de.hackathon.fakenews.backend.trustedpublisher.domain.PublisherDTO;
import de.hackathon.fakenews.backend.trustedpublisher.domain.TrustedAnswerDTO;
import de.hackathon.fakenews.backend.trustedpublisher.domain.TrustedPublisherDTO;
import de.hackathon.fakenews.backend.trustedpublisher.entities.Publisher;
import de.hackathon.fakenews.backend.trustedpublisher.entities.TrustUri;
import de.hackathon.fakenews.backend.trustedpublisher.exception.ElementNotFoundException;
import de.hackathon.fakenews.backend.trustedpublisher.repositories.PublisherRepository;
import de.hackathon.fakenews.backend.trustedpublisher.repositories.TrustUriRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@Slf4j
public class TrustedPublisherController {

    PublisherRepository publisherRepository;
    TrustUriRepository trustUriRepository;

    TrustedPublisherController(@Autowired PublisherRepository publisherRepository, @Autowired TrustUriRepository trustUriRepository) {
        this.publisherRepository = publisherRepository;
        this.trustUriRepository = trustUriRepository;
    }

    private static PublisherDTO convertToDto(Publisher publisher) {
        return new PublisherDTO(
                publisher.title,
                publisher.trustScore,
                publisher.getKnownUris().stream().map(TrustUri::getUrl).collect(Collectors.toList()));
    }

    @PostMapping(path = "/", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public TrustedAnswerDTO getTrustScore(@RequestBody final TrustedPublisherDTO trustedPublisherDTO) {

        log.info(trustedPublisherDTO.toString());

        final String parsableUri = trustedPublisherDTO.getUri().startsWith("http") ? trustedPublisherDTO.getUri() : "https://" + trustedPublisherDTO.getUri();
        final URI uri = URI.create(parsableUri);
        final String hostname = uri.getHost();
        final String fqdn;
        try {
            fqdn = hostname.startsWith("www.") ? hostname.substring(4) : hostname;
        } catch (NullPointerException e) {
            throw new ElementNotFoundException();
        }
        final List<TrustUri> possibleUris = trustUriRepository.findAllByUrlStartingWith(fqdn);
        final String uriWithoutProtocol = fqdn + uri.getPath();
        log.debug(uriWithoutProtocol);
        final List<Publisher> matchingPublishers = possibleUris.stream().filter(uriCandidate ->
                uriWithoutProtocol.toString().startsWith(uriCandidate.url))
                .map(TrustUri::getPublisher).collect(Collectors.toList());

        if (matchingPublishers.isEmpty()) {
            throw new ElementNotFoundException();
        }

        if (matchingPublishers.size() > 1) {
            throw new RuntimeException("Too Many");
        }

        TrustedAnswerDTO trustedAnswerDTO = new TrustedAnswerDTO(matchingPublishers.get(0).trustScore);

        return trustedAnswerDTO;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<PublisherDTO> getAll() {
        return publisherRepository.findAll().stream().map(TrustedPublisherController::convertToDto).collect(Collectors.toList());
    }
}
