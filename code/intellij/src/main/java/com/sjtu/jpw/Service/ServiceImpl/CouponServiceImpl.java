package com.sjtu.jpw.Service.ServiceImpl;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.sjtu.jpw.Domain.AssistDomain.MyCoupon;
import com.sjtu.jpw.Domain.Coupon;
import com.sjtu.jpw.Domain.User;
import com.sjtu.jpw.Repository.CouponRepository;
import com.sjtu.jpw.Service.CouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Service("couponService")
public class CouponServiceImpl implements CouponService {
    @Autowired
    private CouponRepository couponRepository;
    @Override
    public JsonArray getMyCoupon(int userId) {
        long time = System.currentTimeMillis();
        Date date=new Date(time);
        List<MyCoupon> neededCoupon = couponRepository.findMyCoupon(userId,date);
        JsonArray allMyCoupon = new JsonArray();
        for (int i = 0; i < neededCoupon.size(); i++) {
            MyCoupon tempCoupon=neededCoupon.get(i);
            Gson couponGson=new Gson();
            String couponJson = couponGson.toJson(tempCoupon);
            JsonObject couponObject = new JsonParser().parse(couponJson).getAsJsonObject();

            allMyCoupon.add(couponObject);
        }
        return allMyCoupon;
    }
}
