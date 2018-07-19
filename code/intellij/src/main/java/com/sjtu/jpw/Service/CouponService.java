package com.sjtu.jpw.Service;

import com.google.gson.JsonArray;
import com.sjtu.jpw.Domain.Coupon;

import java.sql.Date;

public interface CouponService {
    JsonArray getMyCoupon(int userId);

}
