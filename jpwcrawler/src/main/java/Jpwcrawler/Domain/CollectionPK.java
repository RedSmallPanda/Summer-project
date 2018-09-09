package Jpwcrawler.Domain;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;

public class CollectionPK implements Serializable {
    private int userId;
    private int showId;

    @Column(name = "user_id", nullable = false)
    @Id
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Column(name = "show_id", nullable = false)
    @Id
    public int getShowId() {
        return showId;
    }

    public void setShowId(int showId) {
        this.showId = showId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        CollectionPK that = (CollectionPK) o;

        if (userId != that.userId) return false;
        if (showId != that.showId) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = userId;
        result = 31 * result + showId;
        return result;
    }
}
