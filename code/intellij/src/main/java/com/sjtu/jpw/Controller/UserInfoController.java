package com.sjtu.jpw.Controller;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.sjtu.jpw.Domain.User;
import com.sjtu.jpw.Repository.UserRepository;
import com.sjtu.jpw.Service.demoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;

@RestController
public class UserInfoController {
    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value="/userInfo",produces="application/json;charset=UTF-8")
    public void Hello(HttpServletRequest request, HttpServletResponse response) throws InterruptedException,IOException {
        response.setHeader("Content-type","application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        User me = userRepository.findFirstByUsername(request.getParameter("username"));
        Gson showGson=new Gson();
        String showJson = showGson.toJson(me);
        JsonObject showObject = new JsonParser().parse(showJson).getAsJsonObject();

        System.out.println(showObject);
        out.print(showObject);
        out.flush();
    }
/*

    demo- how to use service

    @Resource(name="demoService")
    private demoService demoService;
    @RequestMapping(value="/shows",produces="application/json;charset=UTF-8")
    public void Hello(HttpServletRequest request, HttpServletResponse response) throws InterruptedException,IOException {
        response.setHeader("Content-type","application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

       Integer demo=demoService.userValidation("asd","123");


        System.out.println(demo);
        out.print(demo);
        if(out!=null) {
            out.flush();
        }
    }
    */
}
