package Jpwcrawler.Domain;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;

public class SendingaddrPK implements Serializable {
    private int userId;
    private int addrId;

    @Column(name = "user_id", nullable = false)
    @Id
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Column(name = "addr_id", nullable = false)
    @Id
    public int getAddrId() {
        return addrId;
    }

    public void setAddrId(int addrId) {
        this.addrId = addrId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        SendingaddrPK that = (SendingaddrPK) o;

        if (userId != that.userId) return false;
        if (addrId != that.addrId) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = userId;
        result = 31 * result + addrId;
        return result;
    }
}
