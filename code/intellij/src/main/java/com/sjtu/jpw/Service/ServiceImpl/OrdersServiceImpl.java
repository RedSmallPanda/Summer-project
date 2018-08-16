package com.sjtu.jpw.Service.ServiceImpl;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.sjtu.jpw.Domain.*;
import com.sjtu.jpw.Domain.AssistDomain.OrderData;
import com.sjtu.jpw.Domain.AssistDomain.RefundData;
import com.sjtu.jpw.Repository.*;
import com.sjtu.jpw.Service.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.sql.Timestamp;
import java.util.List;

@Service("ordersService")
public class OrdersServiceImpl implements OrdersService {
    @Autowired
    private OrdersRepository ordersRepository;
    @Autowired
    private TicketRepository ticketRepository;
    @Autowired
    private ShowsRepository showsRepository;
    @Autowired
    private UserCouponRepository ucRepository;
    @Autowired
    private RefundRepository refundRepository;

    public JsonArray getOrderByState(int userId,String state1,String state2){
        List<Orders> neededOrders = new ArrayList<>();
        if(userId==-1){
            neededOrders = ordersRepository.findAllByState(state1);
        }
        else {
            neededOrders = ordersRepository.findByUserIdAndState(userId, state1, state2);
        }
        JsonArray allOrders=new JsonArray();
        for(int i=0;i<neededOrders.size();i++){
            Orders temp=neededOrders.get(i);
            OrderData tempOrder=new OrderData();
            tempOrder.setUserId(temp.getUserId());
            tempOrder.setAddrdetail(temp.getAddrdetail());
            tempOrder.setBlock(temp.getBlock());
            tempOrder.setCity(temp.getCity());
            tempOrder.setProvince(temp.getProvince());
            tempOrder.setName(temp.getName());
            tempOrder.setState(temp.getState());
            tempOrder.setNumber(temp.getNumber());
            tempOrder.setOrderId(temp.getOrderId());
            tempOrder.setPhone(temp.getPhone());
            tempOrder.setPrice(temp.getPrice());
            int ticketId=temp.getTicketId();
            Ticket tempTicket=ticketRepository.findFirstByTicketId(ticketId);
            int showId=tempTicket.getShowId();
            Shows tempShow=showsRepository.findFirstByShowId(showId);
            String showTitle=tempShow.getTitle();
            Timestamp showTime=tempTicket.getTime();
            tempOrder.setDetailInfo(showTitle,showTime);
            tempOrder.setTicketId(ticketId);
            tempOrder.setTotalPrice(temp.getTotalPrice());
            tempOrder.setTime(temp.getTime());

            Gson orderGson=new Gson();
            String orderJson = orderGson.toJson(tempOrder);
            JsonObject orderObject = new JsonParser().parse(orderJson).getAsJsonObject();
            orderObject.addProperty("showId",showId);
            if(userId==-1){
                Refund refund=refundRepository.findFirstByOrderId(temp.getOrderId());
                RefundData neededRefund=new RefundData();
                String reason=refund.getReason();
                Timestamp time=refund.getRefundTime();
                neededRefund.setNumber(temp.getNumber());
                neededRefund.setOrderId(temp.getOrderId());
                neededRefund.setReason(reason);
                neededRefund.setRefundTime(time);
                neededRefund.setShowName(tempOrder.getDetailInfo().getShowName());
                neededRefund.setState("未审核");
                neededRefund.setTime(temp.getTime());
                neededRefund.setTotalPrice(temp.getTotalPrice());
                orderJson=orderGson.toJson(neededRefund);
                orderObject = new JsonParser().parse(orderJson).getAsJsonObject();
            }

            allOrders.add(orderObject);
        }
        return allOrders;
    }

    @Override
    public JsonArray getCurrentOrder(int userId) {
        JsonArray currentOrders=getOrderByState(userId,"0","3");
        return currentOrders;
    }

    @Override
    public JsonArray getHistoryOrder(int userId) {
        JsonArray historyOrders=getOrderByState(userId,"4","6");
        return historyOrders;
    }

    @Override
    public JsonArray getRefundOrder() {
        JsonArray currentOrders=getOrderByState(-1,"2","-1");
        return currentOrders;
    }

    @Override
    public void UpdateOrderState(String state,int orderId){
        Orders tempOrder=ordersRepository.findFirstByOrderId(orderId);
        tempOrder.setState(state);
        ordersRepository.save(tempOrder);
    }

    @Override
    public void approveRefund(int orderId) {
        Orders tempOrder = ordersRepository.findFirstByOrderId(orderId);
        tempOrder.setState("4");
        ordersRepository.save(tempOrder);
        Refund tempRefund = refundRepository.findFirstByOrderId(orderId);
        tempRefund.setState("4");
        refundRepository.save(tempRefund);
    }

    @Override
    public void rejectRefund(int orderId){
        Orders tempOrder=ordersRepository.findFirstByOrderId(orderId);
        tempOrder.setState("3");
        ordersRepository.save(tempOrder);
        Refund tempRefund=refundRepository.findFirstByOrderId(orderId);
        tempRefund.setState("3");
        refundRepository.save(tempRefund);
    }

    @Override
    public void refund(int orderId,String reason) {
        UpdateOrderState("2", orderId);
        long time = System.currentTimeMillis();
        Timestamp currentTime=new Timestamp(time);
        Refund refund = new Refund();
        refund.setOrderId(orderId);
        refund.setState("2");
        refund.setReason(reason);
        refund.setRefundTime(currentTime);
        refundRepository.save(refund);
    }

    @Override
    public void cancelRefund(int orderId) {
        UpdateOrderState("1",orderId);
        long time = System.currentTimeMillis();
        Timestamp currentTime=new Timestamp(time);
        Refund refund=refundRepository.findFirstByOrderId(orderId);
        refund.setState("0");
        refund.setRefundTime(currentTime);
        refundRepository.save(refund);
    }

    @Override
    public boolean stockDecrease(int ticketId,int number){
        Ticket tempTicket=ticketRepository.findFirstByTicketId(ticketId);
        int currentStock=tempTicket.getStock()-number;
        if(currentStock<0){
            return false;
        }
        tempTicket.setStock(currentStock);
        ticketRepository.save(tempTicket);
        return true;
    }

    @Override
    public void useCoupon(int userId,int couponId){
        UserCoupon uc=ucRepository.findFirstByCouponIdAndUserId(couponId,userId);
        uc.setNumber(uc.getNumber()-1);
        ucRepository.save(uc);
    }

    @Override
    public Orders createOrderAndUseCouponAndDecreaseStockAndDeleteShopCart(int userId, int couponId, Orders order) {
        int ticketId=order.getTicketId();
        if(!stockDecrease(ticketId,order.getNumber())){//stockDecrease()==false
            return null;
        }
        Orders saved = ordersRepository.save(order);
        if(couponId!=-1) {
            useCoupon(userId, couponId);
        }
        return saved;

    }
}
