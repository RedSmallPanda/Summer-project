package com.sjtu.jpw.Domain;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Date;
import java.util.Objects;

@Entity
public class Coupon {
    private int couponId;
    private String title;
    private Integer discount;
    private Integer discCond;
    private Date begindate;
    private Date enddate;

    @Id
    @Column(name = "coupon_id", nullable = false)
    public int getCouponId() {
        return couponId;
    }

    public void setCouponId(int couponId) {
        this.couponId = couponId;
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
    @Column(name = "discount", nullable = true)
    public Integer getDiscount() {
        return discount;
    }

    public void setDiscount(Integer discount) {
        this.discount = discount;
    }

    @Basic
    @Column(name = "disc_cond", nullable = true)
    public Integer getDiscCond() {
        return discCond;
    }

    public void setDiscCond(Integer discCond) {
        this.discCond = discCond;
    }

    @Basic
    @Column(name = "begindate", nullable = true)
    public Date getBegindate() {
        return begindate;
    }

    public void setBegindate(Date begindate) {
        this.begindate = begindate;
    }

    @Basic
    @Column(name = "enddate", nullable = true)
    public Date getEnddate() {
        return enddate;
    }

    public void setEnddate(Date enddate) {
        this.enddate = enddate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Coupon coupon = (Coupon) o;
        return couponId == coupon.couponId &&
                Objects.equals(title, coupon.title) &&
                Objects.equals(discount, coupon.discount) &&
                Objects.equals(discCond, coupon.discCond) &&
                Objects.equals(begindate, coupon.begindate) &&
                Objects.equals(enddate, coupon.enddate);
    }

    @Override
    public int hashCode() {

        return Objects.hash(couponId, title, discount, discCond, begindate, enddate);
    }
}
