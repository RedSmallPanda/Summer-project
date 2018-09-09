package Jpwcrawler.Domain;

import javax.persistence.*;

@Entity
@Table(name = "user_coupon", schema = "jpw", catalog = "")
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

        if (userId != that.userId) return false;
        if (couponId != that.couponId) return false;
        if (number != null ? !number.equals(that.number) : that.number != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = userId;
        result = 31 * result + couponId;
        result = 31 * result + (number != null ? number.hashCode() : 0);
        return result;
    }
}
