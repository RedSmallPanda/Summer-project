package com.sjtu.jpw.Controller.AdminControllers;

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
import java.util.List;

@RestController
public class AdminUserController {
    @Autowired
    private UserService userService;

    @RequestMapping(value = "/allUsers", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    public void getAllUsers(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Content-type", "application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        List<User> me = userService.allUsers();
        Gson userGson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
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

        User toReg = userService.register(newUser);
        if (toReg != null) {
            System.out.println("[JPW ADMIN] NewUser registered: " + newUser);
            out.print("New user " + userGson.toJson(toReg) + " registered.");
        } else {
            System.out.println("[JPW ADMIN] Fail to register: " + newUser);
            out.print("Fail to register.");
        }

        out.flush();
    }

    @RequestMapping(value = "/updateUser", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    public void updateUser(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Content-type", "application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        String userJson = request.getParameter("updateUser");
        System.out.println("[JPW ADMIN  ] User update: get JSON from user form: " + userJson);

        Gson userGson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
        User updateUser = userGson.fromJson(userJson, User.class);//对于javabean直接给出class实例

        userService.updateInfo(updateUser);

        System.out.println("[JPW ADMIN  ] User update: " + updateUser);
        System.out.println("[JPW WARNING] User update may fail.");
        out.print("Refresh to confirm.");
        out.flush();
    }
}
