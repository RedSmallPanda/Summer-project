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
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Iterator;
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

    @Override
    public JsonArray getCoupon(){
        List<Coupon> coupons = couponRepository.findAllCoupons();
        JsonArray couponData = new JsonArray();
        Iterator<Coupon> it = coupons.iterator();
        while(it.hasNext()){
            Coupon coupon = it.next();
            JsonObject couponObject = new JsonObject();
            couponObject.addProperty("couponId",coupon.getCouponId());
            couponObject.addProperty("title",coupon.getTitle());
            couponObject.addProperty("condition",coupon.getDiscCond());
            couponObject.addProperty("discount",coupon.getDiscount());
            couponObject.addProperty("startDate",coupon.getBegindate().toString());
            couponObject.addProperty("endDate",coupon.getEnddate().toString());
            couponData.add(couponObject);
        }
        return couponData;
    }

    @Override
    public void addCoupon(String title, Integer condition, Integer discount, String startDate, String endDate){
        Coupon coupon = new Coupon();
        coupon.setTitle(title);
        coupon.setDiscount(discount);
        coupon.setDiscCond(condition);
        coupon.setBegindate(strToDate(startDate));
        coupon.setEnddate(strToDate(endDate));
        couponRepository.save(coupon);
    }

    @Override
    public void deleteCoupon(Integer couponId){
        couponRepository.deleteAllByCouponId(couponId);
    }

    private Date strToDate(String strDate){
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        java.util.Date d = null;
        try {
            d = format.parse(strDate);
        } catch (Exception e) {
            e.printStackTrace();
        }
        //Date date = new java.sql.Date(d.getTime());
        return new Date(d.getTime());
    }
}
