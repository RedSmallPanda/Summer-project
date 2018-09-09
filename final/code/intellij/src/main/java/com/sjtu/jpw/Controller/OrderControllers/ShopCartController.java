package com.sjtu.jpw.Controller.OrderControllers;

import com.google.gson.JsonArray;
import com.sjtu.jpw.Service.ShopCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;

@RestController
public class ShopCartController {
    @Autowired
    private ShopCartService shopCartService;
    @RequestMapping(value="/getCurrentCart",produces="application/json;charset=UTF-8")
    public void GetCurrentShopCart(HttpServletRequest request, HttpServletResponse response) throws InterruptedException,IOException {
        response.setHeader("Content-type","application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        int userId=(int)request.getSession().getAttribute("userId");
        String  currentCart=shopCartService.getCurrentCart(userId);

        //System.out.println(currentCart);
        out.print(currentCart);
        out.flush();
    }

    @RequestMapping(value="/deleteCart",produces="application/json;charset=UTF-8")
    public void DeleteShopCart(HttpServletRequest request, HttpServletResponse response) throws InterruptedException,IOException {
        response.setHeader("Content-type","application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        int ticketId=Integer.parseInt(request.getParameter("ticketId"));
        int userId=(int)request.getSession().getAttribute("userId");
        shopCartService.deleteCartItem(userId,ticketId);
        out.print(ticketId);
        out.flush();
    }

    @RequestMapping(value="/addCurrentCart",produces="application/json;charset=UTF-8")
    public void AddCurrentShopCart(HttpServletRequest request, HttpServletResponse response) throws InterruptedException,IOException {
        response.setHeader("Content-type","application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        //    int userId=Integer.parseInt(request.getParameter("userId"));
     //   String  currentCart=shopCartService.getCurrentCart(1);

        HttpSession session=request.getSession();

            int ticketId = Integer.parseInt(request.getParameter("ticketId"));
            int num = Integer.parseInt(request.getParameter("num"));
            System.out.println("add cart"+ticketId+" num:  "+num);
            shopCartService.addCartItem((int) session.getAttribute("userId"), ticketId, num);

        //System.out.println(currentCart);
      //  out.print(currentCart);
        out.flush();
    }

}
