package de.hackathon.fakenews.backend.trustedpublisher.repositories;

import de.hackathon.fakenews.backend.trustedpublisher.entities.TrustUri;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TrustUriRepository extends CrudRepository<TrustUri, Long> {

   List<TrustUri> findAllByUrl(String url);
}
