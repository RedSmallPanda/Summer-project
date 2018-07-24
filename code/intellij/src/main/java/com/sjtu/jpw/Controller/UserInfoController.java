package com.sjtu.jpw.Controller;

import com.google.gson.*;
import com.sjtu.jpw.Domain.User;
import com.sjtu.jpw.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@RestController
public class UserInfoController {
    @Autowired
    private UserService userService;

    @RequestMapping(value = "/userInfo", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    public void getInfo(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Content-type", "application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        User me = userService.UserInfo(3);//TODO: request.getParameter("userID")
        Gson userGson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
        String userJson = userGson.toJson(me);
        JsonObject userObject = new JsonParser().parse(userJson).getAsJsonObject();

        System.out.println(userObject);
        out.print(userObject);
        out.flush();
    }

    @RequestMapping(value = "/userInfo", method = RequestMethod.POST)
    public void saveInfo(HttpServletRequest request, HttpServletResponse response) throws IOException {
        //response.setHeader("Content-type", "application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        String userJson = request.getParameter("form");
        System.out.println("get JSON from user form: " + userJson);

        Gson userGson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
        User updateUser = userGson.fromJson(userJson, User.class);//对于javabean直接给出class实例

        userService.updateInfo(updateUser);

        out.print(userGson.toJson(updateUser));
        System.out.println("changed into: " + userGson.toJson(updateUser));
        out.flush();
    }
}
//
//    demo- how to use service
//
//    @Resource(name="demoService")
//    private demoService demoService;
//    @RequestMapping(value="/shows",produces="application/json;charset=UTF-8")
//    public void Hello(HttpServletRequest request, HttpServletResponse response) throws InterruptedException,IOException {
//        response.setHeader("Content-type","application/json;charset=UTF-8");
//        PrintWriter out = response.getWriter();
//
//        Integer demo=demoService.userValidation("asd","123");
//
//        System.out.println(demo);
//        out.print(demo);
//        if(out!=null) {
//            out.flush();
//        }
//    }