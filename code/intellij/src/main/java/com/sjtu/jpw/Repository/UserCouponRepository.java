package com.sjtu.jpw.Repository;
import com.sjtu.jpw.Domain.UserCoupon;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.Table;

@Repository
@Table(name="UserCoupon")
@Qualifier("userCouponRepository")
public interface UserCouponRepository extends CrudRepository<UserCoupon,Integer> {
    public UserCoupon save(UserCoupon userCoupon);

}