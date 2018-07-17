package com.sjtu.jpw.Domain;

import javax.persistence.*;
import java.util.Objects;

@Entity
@IdClass(SendingaddrPK.class)
public class Sendingaddr {
    private int userId;
    private int addrId;
    private String province;
    private String city;
    private String block;
    private String addrdetail;
    private String phone;
    private String name;

    @Id
    @Column(name = "user_id", nullable = false)
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Id
    @Column(name = "addr_id", nullable = false)
    public int getAddrId() {
        return addrId;
    }

    public void setAddrId(int addrId) {
        this.addrId = addrId;
    }

    @Basic
    @Column(name = "province", nullable = true, length = -1)
    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
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
    @Column(name = "block", nullable = true, length = -1)
    public String getBlock() {
        return block;
    }

    public void setBlock(String block) {
        this.block = block;
    }

    @Basic
    @Column(name = "addrdetail", nullable = true, length = -1)
    public String getAddrdetail() {
        return addrdetail;
    }

    public void setAddrdetail(String addrdetail) {
        this.addrdetail = addrdetail;
    }

    @Basic
    @Column(name = "phone", nullable = true, length = -1)
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Basic
    @Column(name = "name", nullable = true, length = -1)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Sendingaddr that = (Sendingaddr) o;
        return userId == that.userId &&
                addrId == that.addrId &&
                Objects.equals(province, that.province) &&
                Objects.equals(city, that.city) &&
                Objects.equals(block, that.block) &&
                Objects.equals(addrdetail, that.addrdetail) &&
                Objects.equals(phone, that.phone) &&
                Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {

        return Objects.hash(userId, addrId, province, city, block, addrdetail, phone, name);
    }
}
