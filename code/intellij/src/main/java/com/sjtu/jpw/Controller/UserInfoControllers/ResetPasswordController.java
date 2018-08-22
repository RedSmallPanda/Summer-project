package com.sjtu.jpw.Controller.UserInfoControllers;

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
import java.util.UUID;

@RestController
public class ResetPasswordController {
    @Autowired
    private UserService userService;

    @RequestMapping(value = "/createResetAuth", method = RequestMethod.GET)
    public void createResetAuth(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Content-type", "application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        String username = request.getParameter("username");
        String email = request.getParameter("email");
        String auth = "";

        User toReset = userService.usernameMatchEmail(username, email);
        if (toReset != null) {
            auth = UUID.randomUUID().toString();
            request.getSession().setAttribute("auth", auth);
            request.getSession().setAttribute("toReset", toReset);

            new Thread(
                    new MailUtil(
                            email,
                            auth,
                            "reset"
                    )
            ).start();

            System.out.println("[JPW USER RS] user -" + username + "-(" + email + ") request to reset");
        }

        out.print(!auth.equals(""));
        out.flush();
    }

    @RequestMapping(value = "/resetAuth", method = RequestMethod.GET)
    public void resetAuth(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Content-type", "application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        String username = request.getParameter("username");
        String email = request.getParameter("email");
        String auth = request.getParameter("auth");
        if (request.getSession().getAttribute("auth") == null) {
            out.print("请先获取验证码并正确填写");
            out.flush();
            return;
        }
        String correctAuth = (String) request.getSession().getAttribute("auth");
        User toReset = (User) request.getSession().getAttribute("toReset");


        out.print(
                auth.equals(correctAuth)
                        && username.equals(toReset.getUsername())
                        && email.equals(toReset.getEmail())
        );
        out.flush();
    }

    @RequestMapping(value = "/reset", method = RequestMethod.GET)
    public void reset(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Content-type", "application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        String newPassword = request.getParameter("password");
        User toReset;
        if (request.getSession().getAttribute("toReset") != null) {
            toReset = (User) request.getSession().getAttribute("toReset");
            toReset.setPassword(newPassword);
            if (userService.updateInfo(toReset)) {
                out.print(true);
                request.getSession().removeAttribute("auth");
                request.getSession().removeAttribute("toReset");
            }
        } else {
            out.print("过期或错误，请重新验证账号邮箱");
        }
        out.flush();
    }
}