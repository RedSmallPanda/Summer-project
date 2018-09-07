package com.sjtu.jpw.Controller.OrderControllers;

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
        response.setHeader("Content-type", "application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        int userId = (int)request.getSession().getAttribute("userId");
        JsonArray currentOrders = ordersService.getCurrentOrder(userId);

        System.out.println(currentOrders);
        out.print(currentOrders);
        out.flush();
    }

    @RequestMapping(value="/getHistoryOrder",produces="application/json;charset=UTF-8")
    public void GetHistoryOrder(HttpServletRequest request, HttpServletResponse response) throws InterruptedException,IOException {
        response.setHeader("Content-type","application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        int userId=(int)request.getSession().getAttribute("userId");
        JsonArray historyOrders=ordersService.getHistoryOrder(userId);

        System.out.println(historyOrders);
        out.print(historyOrders);
        out.flush();
    }

    @RequestMapping(value="/getRefundOrder",produces="application/json;charset=UTF-8")
    public void GetRefundOrder(HttpServletRequest request, HttpServletResponse response) throws InterruptedException,IOException {
        response.setHeader("Content-type","application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        JsonArray historyOrders=ordersService.getRefundOrder();

        System.out.println(historyOrders);
        out.print(historyOrders);
        out.flush();
    }

    @RequestMapping(value="/getAllOrders",produces="application/json;charset=UTF-8")
    public void GetAllOrders(HttpServletRequest request, HttpServletResponse response) throws InterruptedException,IOException {
        response.setHeader("Content-type","application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        int userId=-1;
        if(request.getParameter("userId")!=null && !request.getParameter("userId").equals("")){
            userId=Integer.valueOf(request.getParameter("userId"));
        }

        int orderId=-1;
        if(request.getParameter("orderId")!=null && !request.getParameter("orderId").equals("")){
            orderId=Integer.valueOf(request.getParameter("orderId"));
        }

        int page=0;
        if(request.getParameter("page")!=null && !request.getParameter("page").equals("")){
            page=Integer.valueOf(request.getParameter("page"));
        }
        JsonArray orders=ordersService.getAllOrders(orderId,userId,page);

        System.out.println(orders);
        out.print(orders);
        out.flush();
    }

    @RequestMapping(value="/getAllOrdersAndNumber",produces="application/json;charset=UTF-8")
    public void GetAllOrdersAndNumber(HttpServletRequest request, HttpServletResponse response) throws InterruptedException,IOException {
        response.setHeader("Content-type","application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        int userId=-1;
        if(request.getParameter("userId")!=null && !request.getParameter("userId").equals("")){
            userId=Integer.valueOf(request.getParameter("userId"));
        }

        int orderId=-1;
        if(request.getParameter("orderId")!=null && !request.getParameter("orderId").equals("")){
            orderId=Integer.valueOf(request.getParameter("orderId"));
        }

        int page=0;
        if(request.getParameter("page")!=null && !request.getParameter("page").equals("")){
            page=Integer.valueOf(request.getParameter("page"));
        }
        JsonArray orders=ordersService.getAllOrdersAndNumber(orderId,userId,page);

        System.out.println(orders);
        out.print(orders);
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

    @RequestMapping(value="/approveRefund",produces="application/json;charset=UTF-8")
    public void ApproveRefund(HttpServletRequest request, HttpServletResponse response) throws InterruptedException,IOException {
        response.setHeader("Content-type", "application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        int orderId = Integer.parseInt(request.getParameter("orderId"));
        ordersService.approveRefund(orderId);
        System.out.println(orderId);
        out.print(orderId);
        out.flush();
    }

    @RequestMapping(value="/rejectRefund",produces="application/json;charset=UTF-8")
    public void RejectRefund(HttpServletRequest request, HttpServletResponse response) throws InterruptedException,IOException {
        response.setHeader("Content-type","application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        int orderId=Integer.parseInt(request.getParameter("orderId"));
        ordersService.rejectRefund(orderId);
        System.out.println(orderId);
        out.print(orderId);
        out.flush();
    }

    @RequestMapping(value="/dontWantToRefund",produces="application/json;charset=UTF-8")
    public void CancelRefund(HttpServletRequest request, HttpServletResponse response) throws InterruptedException,IOException {
        response.setHeader("Content-type","application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        int orderId=Integer.parseInt(request.getParameter("orderId"));
        ordersService.cancelRefund(orderId);

        System.out.println(orderId);
        out.print(orderId);
        out.flush();
    }

    @RequestMapping(value="/refundOrder",produces="application/json;charset=UTF-8")
    public void RefundOrder(HttpServletRequest request, HttpServletResponse response) throws InterruptedException,IOException {
        response.setHeader("Content-type","application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        int orderId=Integer.parseInt(request.getParameter("orderId"));
        String simpleReason=request.getParameter("simpleReason");
        String detailedReason=request.getParameter("detailReason");
        String completeReason=simpleReason+" "+detailedReason;
        ordersService.refund(orderId,completeReason);

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
        int userId=(int)request.getSession().getAttribute("userId");
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
        String cpId=request.getParameter("couponId");
        int couponId=-1;
        if(!cpId.equals("")){
            couponId=Integer.parseInt(request.getParameter("couponId"));
        }

        order.setState("0");
//        order.setOrderId(2);
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


        Orders savedOrder = ordersService.createOrderAndUseCouponAndDecreaseStockAndDeleteShopCart(userId, couponId, order);
        boolean ifSuccess = (savedOrder != null);

        JsonArray idBool=new JsonArray();
        idBool.add(ifSuccess);
        idBool.add(ifSuccess ? savedOrder.getOrderId() : -1);

        System.out.println(order);
        out.print(String.valueOf(idBool));
        out.flush();
    }

    @RequestMapping(value="/getOriginOrderNumber",produces="application/json;charset=UTF-8")
    public void GetOriginOrderNumber(HttpServletRequest request, HttpServletResponse response) throws InterruptedException,IOException {
        response.setHeader("Content-type","application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        int userId=-1;
        if(request.getParameter("userId")!=null && !request.getParameter("userId").equals("")){
            userId=Integer.valueOf(request.getParameter("userId"));
        }

        int orderId=-1;
        if(request.getParameter("orderId")!=null && !request.getParameter("orderId").equals("")){
            orderId=Integer.valueOf(request.getParameter("orderId"));
        }

        int number=ordersService.getOriginNumber(orderId,userId);
        System.out.println(number);
        out.print(number);
        out.flush();
    }
}
