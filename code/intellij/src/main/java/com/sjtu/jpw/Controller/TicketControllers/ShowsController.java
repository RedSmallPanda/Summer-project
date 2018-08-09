package com.sjtu.jpw.Controller.TicketControllers;

import com.sjtu.jpw.Service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Date;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;

@RestController
public class ShowsController {
    @Autowired
    private TicketService ticketService;

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
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            Date date;
            String timestr1 = "0001-01-01 00:00:00";
            String timestr2 = "9999-12-31 23:59:59";
            switch (request.getParameter("time")) {
                case "all":
                    break;
                case "today":
                    date = new Date(System.currentTimeMillis());
                    timestr1 = format.format(date)+" 00:00:00";
                    timestr2 = format.format(date)+" 23:59:59";
                    break;
                case "tomorrow":
                    date = new Date(System.currentTimeMillis() + 24 * 60 * 60 * 1000);
                    timestr1 = format.format(date)+" 00:00:00";
                    timestr2 = format.format(date)+" 23:59:59";
                    break;
                case "week":
                    date = new Date(System.currentTimeMillis());
                    timestr1 = format.format(date)+" 00:00:00";
                    date = new Date(System.currentTimeMillis() + 7 * 24 * 60 * 60 * 1000);
                    timestr2 = format.format(date)+" 23:59:59";
                    break;
                case "month":
                    date = new Date(System.currentTimeMillis());
                    timestr1 = format.format(date)+" 00:00:00";
                    date = new Date(System.currentTimeMillis() + 31 * 24 * 60 * 60 * 1000L);
                    timestr2 = format.format(date)+" 23:59:59";
                    break;
                default:
                    System.out.println("[JPW   ERROR] invalid time filter:"+request.getParameter("time"));
            }
            Timestamp temp1 = Timestamp.valueOf(timestr1);
            Timestamp temp2 = Timestamp.valueOf(timestr2);
            System.out.println("[JPW SHOWS  ] "
                    + "city:" + request.getParameter("city")
                    + "||type:" + request.getParameter("type")
                    + "||time:" + request.getParameter("time") + "(" + timestr1 + "--" + timestr2 + ")"
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

        System.out.println("showdetail");
        out.print(ticketService.ticketsDetail(1));
     //   System.out.println(ticketService.ticketsDetail(1));
      //  System.out.println(ticketService.userCollection(1));
        out.flush();
    }

}