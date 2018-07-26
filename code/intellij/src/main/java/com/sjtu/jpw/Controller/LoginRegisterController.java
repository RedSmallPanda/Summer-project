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
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Date;
import java.util.List;

@RestController
public class LoginRegisterController {
    @Autowired
    private UserService userService;

    @RequestMapping(value = "/login", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    public void login(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Content-type", "application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        String username = request.getParameter("username");
        username = username.substring(1, username.length() - 1);
        String password = request.getParameter("password");
        password = password.substring(1, password.length() - 1);

        List<User> me = userService.login(username, password);

        //TODO: login of deleted/banned users
        if (me.size()==0) {
            System.out.println("[JPW USER  F] -" + username + "- login with password -" + password + "-");
            out.print("null");
            out.flush();
        } else {
            HttpSession session = request.getSession();
            session.setAttribute("userId",me.get(0).getUserId());
            session.setAttribute("username",me.get(0).getUsername());
            System.out.println("[JPW USER   ] -" + username + "- login with password -" + password + "-");
            if (session.isNew()) {
                System.out.println("[JPW USER   ] create session (id: " + session.getId()
                        + ") for user -" + username + "-");
            } else {
                System.out.println("[JPW USER   ] change session (id: " + session.getId()
                        + ") for user -" + username + "-");
            }

            Gson userGson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
            String userJson = userGson.toJson(me.get(0));
            JsonObject userObject = new JsonParser().parse(userJson).getAsJsonObject();

            System.out.println(userObject);
            out.print(userObject);
            out.flush();
        }
    }


    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public void saveInfo(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Content-type", "application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        String username = request.getParameter("username");
        username = username.substring(1, username.length() - 1);
        String password = request.getParameter("password");
        password = password.substring(1, password.length() - 1);
        String email = request.getParameter("email");
        email = email.substring(1, email.length() - 1);
        String phone = request.getParameter("phone");
        phone = phone.substring(1, phone.length() - 1);

        User newUser = new User();
        newUser.setUsername(username);
        newUser.setPassword(password);
        newUser.setEmail(email);
        newUser.setPhone(phone);
        Date date = new Date(System.currentTimeMillis());
        newUser.setBirthday(date);
        newUser.setState("0");

        User registeredUser = userService.register(newUser);
        if (registeredUser == null) {
            out.print("null");
            out.flush();
        } else {
            Gson userGson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
            out.print(userGson.toJson(registeredUser));
            out.flush();
            System.out.println("[JPW USER   ] New user registered: " + userGson.toJson(registeredUser));
        }
    }
}
