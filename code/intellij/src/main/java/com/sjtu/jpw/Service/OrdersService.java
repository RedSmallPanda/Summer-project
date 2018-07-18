package com.sjtu.jpw.Service;

import com.google.gson.JsonArray;
import com.sjtu.jpw.Domain.Orders;

import java.sql.Timestamp;

public interface OrdersService {
    JsonArray getCurrentOrder(int userId);
    JsonArray getHistoryOrder(int userId);
    void refund(int orderId);
    boolean createOrderAndUseCouponAndDecreaseStockAndDeleteShopCart(int userId, int addressId, int couponId, Orders order);
    boolean stockDecrease(int ticketId,int number);
    void useCoupon(int userId,int couponId);
    void UpdateOrderState(String state,int orderId);
}
