package com.sjtu.jpw.Controller.TicketControllers;

import com.google.gson.Gson;
import com.sjtu.jpw.Domain.Shows;
import com.sjtu.jpw.Service.CommentService;
import com.sjtu.jpw.Service.ShowService;
import com.sjtu.jpw.Service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@RestController
public class RecommendController {
    @Autowired
    private TicketService ticketService;
    @Autowired
    private ShowService showsService;


    @RequestMapping(value = "/getRecommend", produces = "application/json;charset=UTF-8")
    public void collect(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Content-type", "application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        String recommendBy = request.getParameter("recommendBy");
        int[] showIds;
        List<Shows> recommend = new ArrayList<>();

        switch (recommendBy) {
            case "sales":
//                System.out.println(new Timestamp(System.currentTimeMillis()));
                showIds = ticketService.recommendBySales(new Timestamp(System.currentTimeMillis()), 5);
                recommend = showsService.getShowsByIdArray(showIds);
                break;
            case "rate":
                showIds = ticketService.recommendByRate(new Timestamp(System.currentTimeMillis()), 5);
                recommend = showsService.getShowsByIdArray(showIds);
                break;
            case "guess":
                break;
            default:
        }

        Gson gson = new Gson();
        System.out.println("recommend by " + recommendBy + ":" + gson.toJson(recommend));
        out.print(gson.toJson(recommend));

        out.flush();
    }

}
