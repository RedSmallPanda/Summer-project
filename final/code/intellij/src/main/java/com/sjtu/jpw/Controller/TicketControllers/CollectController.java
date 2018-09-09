package com.sjtu.jpw.Controller.TicketControllers;

import com.sjtu.jpw.Service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@RestController
public class CollectController {
    @Autowired
    private TicketService ticketService;

    @RequestMapping(value = "/collect", produces = "application/json;charset=UTF-8")
    public void collect(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Content-type", "application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        boolean isLike = request.getParameter("isLike").equals("true");
        System.out.println("-----isLike: " + isLike);
        int showId = Integer.valueOf(request.getParameter("showId"));
        int userId = (int) request.getSession().getAttribute("userId");

        if (isLike) {
            ticketService.deleteCollection(userId, showId);
            System.out.println("[JPW USER   ] -" + userId + "- delete collection of show -" + showId + "-.");
            out.print(false);
        } else {
            ticketService.addCollection(userId, showId);
            System.out.println("[JPW USER   ] -" + userId + "- add collection of show -" + showId + "-.");
            out.print(true);
        }
    }

    @RequestMapping(value = "/clearCollection", produces = "application/json;charset=UTF-8")
    public void clearCollection(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Content-type", "application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        int userId = (int) request.getSession().getAttribute("userId");

        ticketService.deleteAllCollection(userId);

    }
}
