package com.sjtu.jpw.Controller.UserInfoControllers;

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
import java.util.UUID;

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

        if (me.size() == 0) {
            System.out.println("[JPW USER  F] -" + username + "- login with password -" + password + "-");
            out.print("null");
            out.flush();
        } else {//normal , banned or unactivated
            if (me.get(0).getState().equals("2")) { //banned
                System.out.println("[JPW USER  B] BANNED -" + username + "- login with password -" + password + "-");
                out.print("banned");
            } else if (me.get(0).getState().equals("3")) { //unactivated
                System.out.println("[JPW USER UA] UNACTIVATED -" + username + "- login with password -" + password + "-");
                out.print("unactivated");
            } else {
                HttpSession session = request.getSession();
                session.setAttribute("userId", me.get(0).getUserId());
                session.setAttribute("username", me.get(0).getUsername());
                System.out.println("[JPW USER LI] -" + username + "- login with password -" + password + "-");
                if (session.isNew()) {
                    System.out.println("[JPW USER  S] create session (id: " + session.getId()
                            + ") for user -" + username + "-");
                } else {
                    System.out.println("[JPW USER  S] change session (id: " + session.getId()
                            + ") for user -" + username + "-");
                }

                Gson userGson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
                String userJson = userGson.toJson(me.get(0));
                JsonObject userObject = new JsonParser().parse(userJson).getAsJsonObject();

                System.out.println(userObject);
                out.print(userObject);
            }
            out.flush();
        }
    }


    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public void logout(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Content-type", "application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        System.out.println("[JPW USER LO] session -" + request.getSession().getId() + "- invalidated");
        request.getSession().invalidate();

        out.print("session invalidated.");
        out.flush();
    }


    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public void saveInfo(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Content-type", "application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        User newUser = getNewUser(request);

        User registeredUser = userService.register(newUser);
        if (registeredUser == null) {
            out.print("null");
            out.flush();
        } else {
            new Thread(
                    new MailUtil(
                            registeredUser.getEmail(),
                            registeredUser.getActivate()
                    )
            ).start();

            Gson userGson = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();
            out.print(userGson.toJson(registeredUser));
            out.flush();
            System.out.println("[JPW USER  R] New user registered: " + userGson.toJson(registeredUser));
        }
    }


    @RequestMapping(value = "/activate", method = RequestMethod.GET)
    public void activate(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Content-type", "application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        String activate = request.getParameter("activate");

        Boolean isActivated = userService.activate(activate);

        System.out.println(isActivated ? "激活成功！" : "激活失败！");
        out.print(isActivated);
        out.flush();
    }


    private User getNewUser(HttpServletRequest request) {
        String username = request.getParameter("username");
        username = username.substring(1, username.length() - 1);
        String password = request.getParameter("password");
        password = password.substring(1, password.length() - 1);
        String nickname = request.getParameter("nickname");
        nickname = nickname.substring(1, nickname.length() - 1);
        String email = request.getParameter("email");
        email = email.substring(1, email.length() - 1);
        String phone = request.getParameter("phone");
        phone = phone.substring(1, phone.length() - 1);

        User newUser = new User();
        Date date = new Date(System.currentTimeMillis());
        newUser.setUsername(username);
        newUser.setPassword(password);
        newUser.setNickname(nickname);
        newUser.setEmail(email);
        newUser.setPhone(phone);
        newUser.setBirthday(date);
        if (request.getSession().getAttribute("userId") == null) {//user register
            newUser.setState("3");
            newUser.setActivate(UUID.randomUUID().toString());//随机uuid激活码
        } else if (request.getSession().getAttribute("userId").equals("0")) {//admin add
            newUser.setState("0");
        }
        return newUser;
    }
}
