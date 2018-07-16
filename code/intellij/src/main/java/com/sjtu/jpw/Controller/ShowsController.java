package com.sjtu.jpw.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

@RestController
public class ShowsController {

    @RequestMapping("/shows")
    public String Hello(HttpServletRequest request, HttpServletResponse response) throws InterruptedException{
        List<Object> listData=new ArrayList<>();

        System.out.println("get ticket");
        Thread.currentThread().sleep(500);
        return "Request sent by ResultList.  " +
                "\ncity: " + request.getParameter("city") +
                "\ntype: " + request.getParameter("type") +
                "\ntime: " + request.getParameter("time") +
                "\nsearch by: " + request.getParameter("search") +
                "\nrespond after 0.5s" +
                "\nHello";
    }

}
