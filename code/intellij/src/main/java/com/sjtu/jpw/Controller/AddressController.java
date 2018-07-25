package com.sjtu.jpw.Controller;

import com.google.gson.JsonArray;
import com.sjtu.jpw.Service.AddressService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@Controller
public class AddressController {
    @Resource(name="addressService")
    private AddressService addressService;
    @RequestMapping(value="/address",produces="application/json;charset=UTF-8")
    public void GetAddress(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Content-type","application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        int userId = Integer.parseInt(request.getParameter("userId"));
        JsonArray myAddress = addressService.getAddress(userId);

        System.out.println(myAddress);
        out.print(myAddress);
        out.flush();
    }

    @RequestMapping(value="/getSplitAddress",produces="application/json;charset=UTF-8")
    public void GetSplitAddress(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Content-type","application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        int userId = Integer.parseInt(request.getParameter("userId"));
        JsonArray myAddress = addressService.getSplitAddress(userId);

        System.out.println(myAddress);
        out.print(myAddress);
        out.flush();
    }

    @RequestMapping(value="/addAddress",produces="application/json;charset=UTF-8")
    public void AddAddress(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Content-type","application/x-www-form-urlencoded;charset=UTF-8");

        int userId= Integer.parseInt(request.getParameter("userId"),10);
        int addrId = Integer.parseInt(request.getParameter("key"),10);
        String name = request.getParameter("name");
        String phone = request.getParameter("phone");
        String province = request.getParameter("province");
        String city = request.getParameter("city");
        String block = request.getParameter("block");
        String detail = request.getParameter("detail");
        addressService.addAddress(userId,addrId,name,phone,province,city,block,detail);

        System.out.println("add address successfully");
    }

    @RequestMapping(value="/deleteAddress",produces="application/json;charset=UTF-8")
    public void DeleteAddress(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Content-type","application/json;charset=UTF-8");

        int userId= Integer.parseInt(request.getParameter("userId"));
        int addrId = Integer.parseInt(request.getParameter("key"));
        addressService.deleteAddress(userId, addrId);

        System.out.println("delete address successfully");
    }
}
