package com.sjtu.jpw.Controller;

import com.google.gson.JsonArray;
import com.sjtu.jpw.Domain.Orders;
import com.sjtu.jpw.Service.OrdersService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Timestamp;

@Controller
public class OrdersController {

    @Resource(name="ordersService")
    private OrdersService ordersService;
    @RequestMapping(value="/getCurrentOrder",produces="application/json;charset=UTF-8")
    public void GetCurrentOrder(HttpServletRequest request, HttpServletResponse response) throws InterruptedException,IOException {
        response.setHeader("Content-type","application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        int userId=Integer.parseInt(request.getParameter("userId"));
        JsonArray currentOrders=ordersService.getCurrentOrder(userId);

        System.out.println(currentOrders);
        out.print(currentOrders);
        out.flush();
    }

    @RequestMapping(value="/changeOrderState",produces="application/json;charset=UTF-8")
    public void ChangeOrderState(HttpServletRequest request, HttpServletResponse response) throws InterruptedException,IOException {
        response.setHeader("Content-type","application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        int orderId=Integer.parseInt(request.getParameter("orderId"));
        String state=request.getParameter("state");
        ordersService.UpdateOrderState(state,orderId);

        System.out.println(orderId);
        out.print(orderId);
        out.flush();
    }

    @RequestMapping(value="/createOrder",produces="application/json;charset=UTF-8")
    public void CreateOrder(HttpServletRequest request, HttpServletResponse response) throws InterruptedException,IOException {
        response.setHeader("Content-type","application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        Orders order=new Orders();
        long time = System.currentTimeMillis();
        Timestamp currentTime=new Timestamp(time);
        int userId=Integer.parseInt(request.getParameter("userId"));
        int ticketId=Integer.parseInt(request.getParameter("ticketId"));
        int number=Integer.parseInt(request.getParameter("number"));
        int price=Integer.parseInt(request.getParameter("price"));
        int totalPrice=Integer.parseInt(request.getParameter("totalPrice"));
        String province=request.getParameter("province");
        String city=request.getParameter("city");
        String block=request.getParameter("block");
        String addrDetail=request.getParameter("addrDetail");
        String phone=request.getParameter("phone");
        String name=request.getParameter("name");
        int couponId=Integer.parseInt(request.getParameter("couponId"));

        order.setState("0");
        order.setOrderId(2);
        order.setUserId(userId);
        order.setTicketId(ticketId);
        order.setNumber(number);
        order.setTime(currentTime);
        order.setPrice(price);
        order.setTotalPrice(totalPrice);
        order.setProvince(province);
        order.setCity(city);
        order.setBlock(block);
        order.setAddrdetail(addrDetail);
        order.setPhone(phone);
        order.setName(name);


        boolean ifSuccess=ordersService.createOrderAndUseCouponAndDecreaseStockAndDeleteShopCart(userId, couponId, order);

        JsonArray idBool=new JsonArray();
        idBool.add(ifSuccess);
        idBool.add(2);

        System.out.println(order);
        out.print(String.valueOf(idBool));
        out.flush();
    }
}
