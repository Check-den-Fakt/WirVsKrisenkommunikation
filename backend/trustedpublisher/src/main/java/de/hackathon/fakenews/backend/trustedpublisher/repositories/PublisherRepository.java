package de.hackathon.fakenews.backend.trustedpublisher.repositories;

import java.util.List;
import org.springframework.data.repository.CrudRepository;
import de.hackathon.fakenews.backend.trustedpublisher.entities.Publisher;

public interface PublisherRepository extends CrudRepository<Publisher, Long> {
}
