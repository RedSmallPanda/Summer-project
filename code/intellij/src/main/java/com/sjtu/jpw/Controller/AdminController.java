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
import java.sql.Date;
import java.util.List;

@RestController
public class AdminController {
    @Autowired
    private UserService userService;

    @RequestMapping(value = "/allUsers", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    public void getAllUsers(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Content-type", "application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        List<User> me = userService.allUsers();
        Gson userGson = new Gson();
        String userJson = userGson.toJson(me);
        JsonArray userArray = new JsonParser().parse(userJson).getAsJsonArray();

        System.out.println(userArray);
        out.print(userArray);
        out.flush();
    }

    @RequestMapping(value = "/addUser", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    public void addUser(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Content-type", "application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        String userJson = request.getParameter("newUser");
        System.out.println("get JSON from user form: " + userJson);

        Gson userGson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
        User newUser = userGson.fromJson(userJson, User.class);//对于javabean直接给出class实例

        userService.register(newUser);

        System.out.println("newUser registered: " + newUser);
        out.print("Registered.");
        out.flush();
    }
}
