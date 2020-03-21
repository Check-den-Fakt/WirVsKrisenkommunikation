package de.hackathon.fakenews.backend.trustedpublisher.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name="url")
public class TrustUri {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    public Integer idurl;

    public String url;

    public TrustUri() {
    }

    public Integer getIdurl() {
        return idurl;
    }

    public void setIdurl(Integer idurl) {
        this.idurl = idurl;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
