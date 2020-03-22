package crawler.controller.cosmos;

import javax.persistence.Column;
import javax.persistence.Entity;
import java.util.Date;

@Entity
public class Tweet {

    //@Id
    @Column
    private String id;

    @Column
    private String _partitionKey;

    @Column
    private String lang;

    @Column
    private String text;

    public String get_partitionKey() {
        return _partitionKey;
    }

    public void set_partitionKey(final String _partitionKey) {
        this._partitionKey = _partitionKey;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLang() {
        return lang;
    }

    public void setLang(String lang) {
        this.lang = lang;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
