package de.hackathon.fakenews.backend.trustedpublisher.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import de.hackathon.fakenews.backend.trustedpublisher.entities.Publisher;

public interface PublisherRepository extends JpaRepository<Publisher, Long> {
}
