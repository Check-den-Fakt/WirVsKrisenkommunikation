package de.hackathon.fakenews.backend.trustedpublisher.repositories;

import de.hackathon.fakenews.backend.trustedpublisher.entities.Publisher;
import org.springframework.data.repository.CrudRepository;

public interface PublisherRepository extends CrudRepository<Publisher, Long> {
}
