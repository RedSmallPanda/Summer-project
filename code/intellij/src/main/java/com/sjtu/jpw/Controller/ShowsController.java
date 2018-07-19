package com.sjtu.jpw.Controller;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.sjtu.jpw.Domain.Shows;
import com.sjtu.jpw.Domain.Ticket;
import com.sjtu.jpw.Domain.User;
import com.sjtu.jpw.Repository.ShowsRepository;
import com.sjtu.jpw.Service.TicketService;
import com.sjtu.jpw.Service.UserService;
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
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;

@RestController
public class ShowsController {
    @Autowired
    /*private ShowsRepository showRepository;

    @RequestMapping(value="/shows",produces="application/json;charset=UTF-8")
    public void Hello(HttpServletRequest request, HttpServletResponse response) throws InterruptedException,IOException {
        response.setHeader("Content-type","application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        List<Shows> listData=new ArrayList<>();
        listData = showRepository.findAllShows();
        JsonArray allShows=new JsonArray();
        for(int i=0;i<listData.size();i++){
            Shows temp=listData.get(i);
            Gson showGson=new Gson();
            String showJson = showGson.toJson(temp);
            JsonObject showObject = new JsonParser().parse(showJson).getAsJsonObject();
            allShows.add(showObject);
        }

        System.out.println(allShows);
        out.print(allShows);
        if(out!=null) {
            out.flush();
        }
        Thread.currentThread().sleep(500);
    }*/
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

    /*private UserService userService;
    @RequestMapping(value="/shows",produces="application/json;charset=UTF-8")
    public void Hello(HttpServletRequest request, HttpServletResponse response) throws InterruptedException,IOException {
        response.setHeader("Content-type", "application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        User u = new User();
        u.setUserId(1);
        u.setUsername("李小狼");
        u.setPassword("123456");
        u.setGender("男");
        u.setNickname("阿贾克斯");
        long time = System.currentTimeMillis();
        java.sql.Date date = new java.sql.Date(time);
        u.setBirthday(date);
        u.setEmail("1111@qq.com");
        u.setPhone("18817716520");

        userService.UpdateInfo(u);

        List<User> temp=userService.Login("","");

        out.print("asdasd");
        if (out != null) {
            out.flush();
        }
    }*/


    private TicketService ticketService;
    @RequestMapping(value="/shows",produces="application/json;charset=UTF-8")
    public void Hello(HttpServletRequest request, HttpServletResponse response) throws InterruptedException,IOException {
        response.setHeader("Content-type","application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        String timestr1="2018-07-18 00:00:00";
        String timestr2="2018-07-30 23:00:00";
        Timestamp temp1=Timestamp.valueOf(timestr1);
        Timestamp temp2=Timestamp.valueOf(timestr2);

         System.out.println("alltickets: "+ticketService.AllTickets("jh","jhjhj",temp1,temp2,1));

        ticketService.UserCollection(1);

    //    System.out.println(demo);
        out.print("asda");
        if(out!=null) {
            out.flush();
        }
    }

}
