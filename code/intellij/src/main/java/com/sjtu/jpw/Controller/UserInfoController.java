package com.sjtu.jpw.Controller;

import com.google.gson.*;
import com.sjtu.jpw.Domain.User;
import com.sjtu.jpw.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@RestController
public class UserInfoController {
    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "/userInfo", produces = "application/json;charset=UTF-8")
    public void Hello(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Content-type", "application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        User me = userRepository.findFirstByUsername(request.getParameter("username"));
        Gson userGson = new Gson();
        String userJson = userGson.toJson(me);
        JsonObject userObject = new JsonParser().parse(userJson).getAsJsonObject();

        userObject.remove("birthday");
        userObject.addProperty("birthday", me.getBirthday().toString());

        System.out.println(userObject);
        out.print(userObject);
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
