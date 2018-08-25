package com.sjtu.jpw.Controller.TicketControllers;

import com.google.gson.JsonArray;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.sjtu.jpw.Service.MongoDBService;
import com.sjtu.jpw.Service.ShowService;
import com.sjtu.jpw.Service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Timestamp;

@RestController
public class ShowsController {
    @Autowired
    private TicketService ticketService;
    @Autowired
    private ShowService showService;

    @Resource(name="mongoDBService")
    private MongoDBService mongoDBService;

    @RequestMapping(value = "/shows", produces = "application/json;charset=UTF-8")
    public void getShows(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Content-type", "application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        //get userId to display whether collected
        Object id = request.getSession().getAttribute("userId");
        int userId = 0;
        if (id != null) {
            userId = (int) id;
        }

        //print result list
        if (request.getParameter("collection").equals("collection")) {//my collection
            out.print(ticketService.userCollection(userId));
        } else {//all directory
            Timestamp temp1;
            Timestamp temp2;
            if (request.getParameter("time").equals("all")) {
                temp1 = Timestamp.valueOf("0001-01-01 00:00:00");
                temp2 = Timestamp.valueOf("9999-12-31 23:59:59");
            } else {
                temp1 = Timestamp.valueOf(request.getParameter("starttime") + " 00:00:00");
                temp2 = Timestamp.valueOf(request.getParameter("endtime") + " 23:59:59");
            }

            System.out.println("[JPW SHOWS  ] "
                    + "city:" + request.getParameter("city")
                    + "||type:" + request.getParameter("type")
                    + "||time:" + request.getParameter("time")
                    + "(" + temp1.toString() + "--" + temp2.toString() + ")"
                    + "||search by:" + request.getParameter("search")
                    + "||userId:" + userId);
            out.print(
                    ticketService.allTickets(
                            request.getParameter("city"),
                            request.getParameter("type"),
                            temp1,
                            temp2,
                            request.getParameter("search"),
                            userId
                    )
            );
        }

        out.flush();
    }

    @RequestMapping(value = "/showDetail", produces = "application/json;charset=UTF-8")
    public void showDetail(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Content-type", "application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        Integer showId=Integer.parseInt(request.getParameter("showId"));

        System.out.println(showId);
        out.print(ticketService.ticketsDetail(showId));
        out.flush();
    }

    @RequestMapping(value="/addShow",produces="application/json;charset=UTF-8")
    public void AddShow(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Content-type","application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        String title = request.getParameter("title");
        String info = request.getParameter("info");
        String city = request.getParameter("city");
        String type = request.getParameter("type");
        String address = request.getParameter("address");
        String startDate = request.getParameter("startDate");
        String endDate = request.getParameter("endDate");

        showService.addShow(title,info,city,type,address,startDate,endDate);
        DBCollection collection = mongoDBService.getCollection("cache");
        DBObject img = collection.findOne();
        System.out.println(img.get("imgUrl"));
        out.print(img.get("imgUrl").toString());
        out.flush();

        collection = mongoDBService.getCollection("image");
        DBObject dbObject = new BasicDBObject();
        dbObject.put("imgUrl",img.get("imgUrl").toString());
        dbObject.put("title",title);
        collection.insert(dbObject);

        System.out.println("send and get image successfully");
    }

    @RequestMapping(value="/getShows",produces = "application/json;charset=UTF-8")
    public void GetShows(HttpServletRequest request, HttpServletResponse response) throws IOException{
        response.setHeader("Content-type","application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        JsonArray allShows = showService.getShows();
        out.print(allShows);
        out.flush();
    }

    @RequestMapping(value="/addTicket",produces="application/json;charset=UTF-8")
    public void AddTicket(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Content-type","application/json;charset=UTF-8");
        String title = request.getParameter("title");
        int price = Integer.parseInt(request.getParameter("price"),10);
        String time = request.getParameter("time");
        String seat = request.getParameter("seat");
        int amount = Integer.parseInt(request.getParameter("amount"),10);

        ticketService.addTicket(title,price,time,seat,amount);
        System.out.println("add ticket successfully");
    }

    @RequestMapping(value="/getTickets",produces = "application/json;charset=UTF-8")
    public void GetTickets(HttpServletRequest request, HttpServletResponse response) throws IOException{
        response.setHeader("Content-type","application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        JsonArray allTickets = ticketService.getTickets();
        System.out.println(allTickets);
        out.print(allTickets);
        out.flush();
    }
}