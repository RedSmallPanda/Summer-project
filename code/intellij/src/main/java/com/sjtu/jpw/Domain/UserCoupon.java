package com.sjtu.jpw.Domain;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "User_Coupon", schema = "jpw", catalog = "")
@IdClass(UserCouponPK.class)
public class UserCoupon {
    private int userId;
    private int couponId;
    private Integer number;

    @Id
    @Column(name = "user_id", nullable = false)
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Id
    @Column(name = "coupon_id", nullable = false)
    public int getCouponId() {
        return couponId;
    }

    public void setCouponId(int couponId) {
        this.couponId = couponId;
    }

    @Basic
    @Column(name = "number", nullable = true)
    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserCoupon that = (UserCoupon) o;
        return userId == that.userId &&
                couponId == that.couponId &&
                Objects.equals(number, that.number);
    }

    @Override
    public int hashCode() {

        return Objects.hash(userId, couponId, number);
    }
}
