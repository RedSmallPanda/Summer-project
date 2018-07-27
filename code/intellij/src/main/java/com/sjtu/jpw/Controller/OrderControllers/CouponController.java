package com.sjtu.jpw.Controller.OrderControllers;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.sjtu.jpw.Service.CouponService;
import com.sjtu.jpw.Service.OrdersService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@Controller
public class CouponController {

    @Resource(name="couponService")
    private CouponService couponService;

    @Resource(name="ordersService")
    private OrdersService ordersService;

    @RequestMapping(value="/getMyCoupon",produces="application/json;charset=UTF-8")
    public void GetCoupon(HttpServletRequest request, HttpServletResponse response) throws InterruptedException,IOException {
        response.setHeader("Content-type","application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        int userId=(int)request.getSession().getAttribute("userId");

        JsonArray myCoupon=couponService.getMyCoupon(userId);
        System.out.println(myCoupon);
        out.print(myCoupon);
        out.flush();
    }

    @RequestMapping(value="/giveMeCoupon",produces="application/json;charset=UTF-8")
    public void GiveMeCoupon(HttpServletRequest request, HttpServletResponse response) throws InterruptedException,IOException {
        response.setHeader("Content-type","application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        int userId=(int)request.getSession().getAttribute("userId");
        int price=Integer.parseInt(request.getParameter("price"));
        int orderId=Integer.parseInt(request.getParameter("orderId"));
        ordersService.UpdateOrderState("1",orderId);

        JsonArray myCoupon=couponService.giveMeCoupon(userId,price);
        System.out.println(myCoupon);
        out.print(myCoupon);
        out.flush();
    }

    @RequestMapping(value="/getMyCouponByPrice",produces="application/json;charset=UTF-8")
    public void GetAvailableCoupon(HttpServletRequest request, HttpServletResponse response) throws InterruptedException,IOException {
        response.setHeader("Content-type","application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        int userId=(int)request.getSession().getAttribute("userId");
        int price=Integer.parseInt(request.getParameter("price"));
        JsonArray myCoupon=couponService.getMyCouponByPrice(userId,price);

        System.out.println(myCoupon);
        out.print(myCoupon);
        out.flush();
    }
}
