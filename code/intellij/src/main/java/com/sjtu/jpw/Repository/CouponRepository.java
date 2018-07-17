package com.sjtu.jpw.Repository;
import com.sjtu.jpw.Domain.Coupon;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.Table;

@Repository
@Table(name="Coupon")
@Qualifier("couponRepository")
public interface CouponRepository extends CrudRepository<Coupon,Integer> {
    public Coupon save(Coupon coupon);

}