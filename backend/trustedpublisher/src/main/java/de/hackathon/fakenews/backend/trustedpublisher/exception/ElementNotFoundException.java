package de.hackathon.fakenews.backend.trustedpublisher.exception;


import java.util.NoSuchElementException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NO_CONTENT)
public class ElementNotFoundException extends NoSuchElementException {
}
