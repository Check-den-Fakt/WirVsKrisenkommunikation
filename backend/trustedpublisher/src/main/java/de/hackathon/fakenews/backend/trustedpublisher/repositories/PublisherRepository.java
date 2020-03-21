package de.hackathon.fakenews.backend.trustedpublisher.repositories;

import de.hackathon.fakenews.backend.trustedpublisher.entities.Publisher;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PublisherRepository extends CrudRepository<Publisher, Long> {

   List<Publisher> findAllByKnownUrisContaining(String baseUrl);
}
