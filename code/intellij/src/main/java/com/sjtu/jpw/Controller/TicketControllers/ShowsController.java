package com.sjtu.jpw.Controller.TicketControllers;

import com.sjtu.jpw.Service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Timestamp;

@RestController
public class ShowsController {
    @Autowired
    private TicketService ticketService;

    @RequestMapping(value = "/shows", produces = "application/json;charset=UTF-8")
    public void getShows(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Content-type", "application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        String timestr1 = "2018-07-18 00:00:00";
        String timestr2 = "2018-07-30 23:00:00";
        Timestamp temp1 = Timestamp.valueOf(timestr1);
        Timestamp temp2 = Timestamp.valueOf(timestr2);
        Object id = request.getSession().getAttribute("userId");
        int userId = 0;
        if (id != null) {
            userId = (int) request.getSession().getAttribute("userId");
        }
        System.out.println("[JPW SHOWS  ] "
                + "city:" + request.getParameter("city")
                + "||type:" + request.getParameter("type")
                + "||userId:" + userId);

        if (request.getParameter("collection").equals("collection")) {
            out.print(ticketService.userCollection(userId));
        } else {
            out.print(
                    ticketService.AllTickets(
                            request.getParameter("city"),
                            request.getParameter("type"),
                            temp1,
                            temp2,
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