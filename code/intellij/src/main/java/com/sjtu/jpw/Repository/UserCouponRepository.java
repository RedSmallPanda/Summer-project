package com.sjtu.jpw.Repository;
import com.sjtu.jpw.Domain.UserCoupon;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.Table;
import javax.transaction.Transactional;

@Repository
@Table(name="UserCoupon")
@Qualifier("userCouponRepository")
public interface UserCouponRepository extends CrudRepository<UserCoupon,Integer> {
    public UserCoupon save(UserCoupon userCoupon);
    public UserCoupon findFirstByCouponIdAndUserId(int couponId,int userId);

}