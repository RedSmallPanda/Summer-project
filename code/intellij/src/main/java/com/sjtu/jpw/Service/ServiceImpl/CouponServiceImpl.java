package com.sjtu.jpw.Service.ServiceImpl;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.sjtu.jpw.Domain.AssistDomain.MyCoupon;
import com.sjtu.jpw.Domain.Coupon;
import com.sjtu.jpw.Domain.User;
import com.sjtu.jpw.Domain.UserCoupon;
import com.sjtu.jpw.Repository.CouponRepository;
import com.sjtu.jpw.Repository.UserCouponRepository;
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

    @Autowired
    private UserCouponRepository ucRepository;

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

            couponObject.remove("begindate");
            couponObject.addProperty("begindate", tempCoupon.getBegindate().toString());
            couponObject.remove("enddate");
            couponObject.addProperty("enddate", tempCoupon.getEnddate().toString());

            allMyCoupon.add(couponObject);
        }
        return allMyCoupon;
    }

    @Override
    public JsonArray getMyCouponByPrice(int userId,int price) {
        long time = System.currentTimeMillis();
        Date date=new Date(time);
        List<MyCoupon> neededCoupon = couponRepository.findAvailableCoupon(userId,date,price);
        JsonArray allMyCoupon = new JsonArray();
        for (int i = 0; i < neededCoupon.size(); i++) {
            MyCoupon tempCoupon=neededCoupon.get(i);
            Gson couponGson=new Gson();
            String couponJson = couponGson.toJson(tempCoupon);
            JsonObject couponObject = new JsonParser().parse(couponJson).getAsJsonObject();

            couponObject.addProperty("key", String.valueOf(i));

            allMyCoupon.add(couponObject);
        }
        return allMyCoupon;
    }

    @Override
    public JsonArray giveMeCoupon(int userId,int price){
        long time = System.currentTimeMillis();
        Date date=new Date(time);
        List<Coupon> couponList=couponRepository.getCurrentCoupon(date,price);
        JsonArray newCoupon=new JsonArray();
        if(couponList.size()==0){
            return newCoupon;
        }
        else{
            Coupon temp=couponList.get(0);
            UserCoupon myCoupon=ucRepository.findFirstByCouponIdAndUserId(temp.getCouponId(),userId);
            if(myCoupon!=null){
                int number=myCoupon.getNumber();
                number=number+1;
                myCoupon.setNumber(number);
                ucRepository.save(myCoupon);

                Gson couponGson=new Gson();
                String couponJson = couponGson.toJson(temp);
                JsonObject couponObject = new JsonParser().parse(couponJson).getAsJsonObject();

                newCoupon.add(couponObject);
            }
            else{
                UserCoupon willAddCoupon = new UserCoupon();
                willAddCoupon.setNumber(1);
                willAddCoupon.setCouponId(temp.getCouponId());
                willAddCoupon.setUserId(userId);
                ucRepository.save(willAddCoupon);

                Gson couponGson=new Gson();
                String couponJson = couponGson.toJson(temp);
                JsonObject couponObject = new JsonParser().parse(couponJson).getAsJsonObject();

                newCoupon.add(couponObject);
            }
            return newCoupon;

        }
    }
}
