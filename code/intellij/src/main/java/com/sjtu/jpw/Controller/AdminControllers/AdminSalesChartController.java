package com.sjtu.jpw.Controller.AdminControllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonParser;
import com.sjtu.jpw.Domain.User;
import com.sjtu.jpw.Service.OrdersService;
import com.sjtu.jpw.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@RestController
public class AdminSalesChartController {

    @Resource(name="ordersService")
    private OrdersService ordersService;

    @RequestMapping(value = "/drawChart", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    public void drawChart(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Content-type", "application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        String choice=request.getParameter("choice");
        String timeString=request.getParameter("timeString");
        String kind=request.getParameter("kind");

        JsonArray salesData=ordersService.getSalesData(choice,timeString,kind);

        System.out.println(salesData);
        out.print(salesData);
        out.flush();
    }

}
