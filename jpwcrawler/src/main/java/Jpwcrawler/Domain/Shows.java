package Jpwcrawler.Domain;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Date;

@Entity
public class Shows {
    private int showId;
    private String title;
    private String info;
    private String city;
    private String type;
    private String address;
    private Integer rate;
    private Date starttime;
    private Date endtime;

    @Id
    @Column(name = "show_id", nullable = false)
    public int getShowId() {
        return showId;
    }

    public void setShowId(int showId) {
        this.showId = showId;
    }

    @Basic
    @Column(name = "title", nullable = true, length = -1)
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Basic
    @Column(name = "info", nullable = true, length = -1)
    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    @Basic
    @Column(name = "city", nullable = true, length = -1)
    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    @Basic
    @Column(name = "type", nullable = true, length = -1)
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Basic
    @Column(name = "address", nullable = true, length = -1)
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Basic
    @Column(name = "rate", nullable = true)
    public Integer getRate() {
        return rate;
    }

    public void setRate(Integer rate) {
        this.rate = rate;
    }

    @Basic
    @Column(name = "starttime", nullable = true)
    public Date getStarttime() {
        return starttime;
    }

    public void setStarttime(Date starttime) {
        this.starttime = starttime;
    }

    @Basic
    @Column(name = "endtime", nullable = true)
    public Date getEndtime() {
        return endtime;
    }

    public void setEndtime(Date endtime) {
        this.endtime = endtime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Shows shows = (Shows) o;

        if (showId != shows.showId) return false;
        if (title != null ? !title.equals(shows.title) : shows.title != null) return false;
        if (info != null ? !info.equals(shows.info) : shows.info != null) return false;
        if (city != null ? !city.equals(shows.city) : shows.city != null) return false;
        if (type != null ? !type.equals(shows.type) : shows.type != null) return false;
        if (address != null ? !address.equals(shows.address) : shows.address != null) return false;
        if (rate != null ? !rate.equals(shows.rate) : shows.rate != null) return false;
        if (starttime != null ? !starttime.equals(shows.starttime) : shows.starttime != null) return false;
        if (endtime != null ? !endtime.equals(shows.endtime) : shows.endtime != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = showId;
        result = 31 * result + (title != null ? title.hashCode() : 0);
        result = 31 * result + (info != null ? info.hashCode() : 0);
        result = 31 * result + (city != null ? city.hashCode() : 0);
        result = 31 * result + (type != null ? type.hashCode() : 0);
        result = 31 * result + (address != null ? address.hashCode() : 0);
        result = 31 * result + (rate != null ? rate.hashCode() : 0);
        result = 31 * result + (starttime != null ? starttime.hashCode() : 0);
        result = 31 * result + (endtime != null ? endtime.hashCode() : 0);
        return result;
    }
}
