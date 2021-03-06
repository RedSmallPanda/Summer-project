package com.sjtu.jpw.Repository;
import com.sjtu.jpw.Domain.AssistDomain.MyCoupon;
import com.sjtu.jpw.Domain.Coupon;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.Table;
import javax.transaction.Transactional;
import java.sql.Date;
import java.util.List;

@Repository
@Table(name="Coupon")
@Qualifier("couponRepository")
public interface CouponRepository extends CrudRepository<Coupon,Integer> {
    public Coupon save(Coupon coupon);

    @Query("select new com.sjtu.jpw.Domain.AssistDomain.MyCoupon(coupon.couponId,coupon.title,coupon.discount,coupon.discCond,coupon.begindate,coupon.enddate,uc.number) from Coupon coupon join UserCoupon uc on coupon.couponId = uc.couponId where uc.userId=:userId and coupon.enddate>=:date")
    public List<MyCoupon> findMyCoupon(@Param("userId")int userId, @Param("date")Date date);

    @Query("select new com.sjtu.jpw.Domain.AssistDomain.MyCoupon(coupon.couponId,coupon.title,coupon.discount,coupon.discCond,coupon.begindate,coupon.enddate,uc.number) from Coupon coupon join UserCoupon uc on coupon.couponId = uc.couponId where uc.userId=:userId and coupon.enddate>=:date and coupon.begindate<=:date and coupon.discCond<=:price")
    public List<MyCoupon> findAvailableCoupon(@Param("userId")int userId, @Param("date")Date date, @Param("price")int price);

    @Query("select coupon from Coupon coupon where coupon.enddate>=:date and coupon.discCond<=:price and coupon.discCond>= all (select tempCoupon.discCond from Coupon tempCoupon where tempCoupon.enddate>=:date and tempCoupon.discCond<=:price)")
    public List<Coupon> getCurrentCoupon(@Param("date")Date date, @Param("price")int price);

    @Query("select coupon from Coupon coupon")
    List<Coupon> findAllCoupons();

    @Transactional
    void deleteAllByCouponId(Integer couponId);
}