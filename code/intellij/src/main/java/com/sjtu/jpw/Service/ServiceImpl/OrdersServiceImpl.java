package com.sjtu.jpw.Service.ServiceImpl;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.sjtu.jpw.Domain.*;
import com.sjtu.jpw.Domain.AssistDomain.OrderData;
import com.sjtu.jpw.Repository.OrdersRepository;
import com.sjtu.jpw.Repository.ShowsRepository;
import com.sjtu.jpw.Repository.TicketRepository;
import com.sjtu.jpw.Repository.UserCouponRepository;
import com.sjtu.jpw.Service.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public JsonArray getOrderByState(int userId,String state1,String state2){
        List<Orders> neededOrders= ordersRepository.findByUserIdAndState(userId,state1,state2);
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

            allOrders.add(orderObject);
        }
        return allOrders;
    }

    @Override
    public JsonArray getCurrentOrder(int userId) {
        JsonArray currentOrders=getOrderByState(userId,"0","2");
        return currentOrders;
    }

    @Override
    public JsonArray getHistoryOrder(int userId) {
        JsonArray historyOrders=getOrderByState(userId,"3","5");
        return historyOrders;
    }

    @Override
    public void UpdateOrderState(String state,int orderId){
        Orders tempOrder=ordersRepository.findFirstByOrderId(orderId);
        tempOrder.setState(state);
        ordersRepository.save(tempOrder);
    }

    @Override
    public void refund(int orderId) {
       UpdateOrderState("2",orderId);
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
    public boolean createOrderAndUseCouponAndDecreaseStockAndDeleteShopCart(int userId, int couponId, Orders order) {
        int ticketId=order.getTicketId();
        if(stockDecrease(ticketId,order.getNumber())==false){
            return false;
        }
        ordersRepository.save(order);
        if(couponId!=-1) {
            useCoupon(userId, couponId);
        }
        return true;

    }
}
