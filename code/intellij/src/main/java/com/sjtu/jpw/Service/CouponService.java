package com.sjtu.jpw.Service;

import com.google.gson.JsonArray;
import com.sjtu.jpw.Domain.Coupon;

import java.sql.Date;

public interface CouponService {
    JsonArray getMyCoupon(int userId);
    JsonArray getMyCouponByPrice(int userId,int price);
    JsonArray giveMeCoupon(int userId,int price);
}
