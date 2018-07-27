package com.sjtu.jpw.Controller.OrderControllers;

import com.google.gson.JsonArray;
import com.sjtu.jpw.Service.ShopCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
    //    int userId=Integer.parseInt(request.getParameter("userId"));
        String  currentCart=shopCartService.getCurrentCart(1);

        //System.out.println(currentCart);
        out.print(currentCart);
        out.flush();
    }

    @RequestMapping(value="/addCurrentCart",produces="application/json;charset=UTF-8")
    public void AddCurrentShopCart(HttpServletRequest request, HttpServletResponse response) throws InterruptedException,IOException {
        response.setHeader("Content-type","application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        //    int userId=Integer.parseInt(request.getParameter("userId"));
     //   String  currentCart=shopCartService.getCurrentCart(1);

        int ticketId=Integer.parseInt(request.getParameter("ticketId"));
        int num=Integer.parseInt(request.getParameter("num"));
        shopCartService.addCartItem(1,ticketId,num);

        //System.out.println(currentCart);
      //  out.print(currentCart);
        out.flush();
    }

}
