package Jpwcrawler.Domain;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;

public class UserCouponPK implements Serializable {
    private int userId;
    private int couponId;

    @Column(name = "user_id", nullable = false)
    @Id
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Column(name = "coupon_id", nullable = false)
    @Id
    public int getCouponId() {
        return couponId;
    }

    public void setCouponId(int couponId) {
        this.couponId = couponId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserCouponPK that = (UserCouponPK) o;

        if (userId != that.userId) return false;
        if (couponId != that.couponId) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = userId;
        result = 31 * result + couponId;
        return result;
    }
}
