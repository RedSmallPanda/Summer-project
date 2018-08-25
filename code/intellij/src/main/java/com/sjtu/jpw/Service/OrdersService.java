package com.sjtu.jpw.Service;

import com.google.gson.JsonArray;
import com.sjtu.jpw.Domain.Orders;

import java.sql.Timestamp;

public interface OrdersService {
    JsonArray getCurrentOrder(int userId);
    JsonArray getHistoryOrder(int userId);
    JsonArray getRefundOrder();
    void refund(int orderId,String reason);
    void approveRefund(int orderId);
    void rejectRefund(int orderId);
    void cancelRefund(int orderId);
    Orders createOrderAndUseCouponAndDecreaseStockAndDeleteShopCart(int userId, int couponId, Orders order);
    boolean stockDecrease(int ticketId,int number);
    void useCoupon(int userId,int couponId);
    void UpdateOrderState(String state,int orderId);
    JsonArray getSalesData(String choice,String timeString,String kind);
    int getShowIdByOrderId(int orderId);
}
