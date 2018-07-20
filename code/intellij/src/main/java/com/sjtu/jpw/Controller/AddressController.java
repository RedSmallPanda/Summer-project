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
        int userId=1;
        JsonArray myAddress = addressService.getAddress(userId);

        System.out.println(myAddress);
        out.print(myAddress);
        out.flush();
    }
}
