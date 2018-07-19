package com.sjtu.jpw.Repository;
import com.sjtu.jpw.Domain.AssistDomain.MyCoupon;
import com.sjtu.jpw.Domain.Coupon;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.Table;
import java.sql.Date;
import java.util.List;

@Repository
@Table(name="Coupon")
@Qualifier("couponRepository")
public interface CouponRepository extends CrudRepository<Coupon,Integer> {
    public Coupon save(Coupon coupon);

    @Query("select new com.sjtu.jpw.Domain.AssistDomain.MyCoupon(coupon.couponId,coupon.title,coupon.discount,coupon.discCond,coupon.begindate,coupon.enddate,uc.number) from Coupon coupon join UserCoupon uc on coupon.couponId = uc.couponId where uc.userId=:userId and coupon.enddate>=:date")
    public List<MyCoupon> findMyCoupon(@Param("userId")int userId, @Param("date")Date date);


}