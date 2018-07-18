package com.sjtu.jpw.Domain;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Date;
import java.util.Objects;

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
        return showId == shows.showId &&
                Objects.equals(title, shows.title) &&
                Objects.equals(info, shows.info) &&
                Objects.equals(city, shows.city) &&
                Objects.equals(type, shows.type) &&
                Objects.equals(address, shows.address) &&
                Objects.equals(rate, shows.rate) &&
                Objects.equals(starttime, shows.starttime) &&
                Objects.equals(endtime, shows.endtime);
    }

    @Override
    public int hashCode() {

        return Objects.hash(showId, title, info, city, type, address, rate, starttime, endtime);
    }
}
