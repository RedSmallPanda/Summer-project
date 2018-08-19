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
        System.out.println("city:" +request.getParameter("city"));
        System.out.println("type: "+request.getParameter("type"));
        int userId = (int) request.getSession().getAttribute("userId");

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
 /*       System.out.println(ticketService.AllTickets(
                request.getParameter("city"),
                request.getParameter("type"),
                temp1,
                temp2,
                1));
        System.out.println(ticketService.ticketsDetail(1));
        System.out.println(ticketService.UserCollection(1));*/
        out.flush();
    }
    @RequestMapping(value = "/showDetail", produces = "application/json;charset=UTF-8")
    public void showDetail(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Content-type", "application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        Integer showId=Integer.parseInt(request.getParameter("showId"));

        System.out.println("showdetail");
        out.print(ticketService.ticketsDetail(showId));
 //       System.out.println(ticketService.ticketsDetail(showId));
//        System.out.println(ticketService.userCollection(showId));
        out.flush();
    }

    @RequestMapping(value = "/collect", produces = "application/json;charset=UTF-8")
    public void collect(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Content-type", "application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        boolean isLike = request.getParameter("isLike").equals("1");
        System.out.println("-----isLike: " + isLike);
        int showId = Integer.valueOf(request.getParameter("showId"));
        int userId = (int) request.getSession().getAttribute("userId");

        if (isLike) {
            ticketService.deleteCollection(userId, showId);
            System.out.println("[JPW USER   ] -" + userId + "- delete collection of show -" + showId + "-.");
            out.print(true);
        } else {
            ticketService.addCollection(userId, showId);
            System.out.println("[JPW USER   ] -" + userId + "- add collection of show -" + showId + "-.");
            out.print(false);
        }
    }

}
//    @RequestMapping(value="/shows",produces="application/json;charset=UTF-8")
//    public void Hello(HttpServletRequest request, HttpServletResponse response) throws InterruptedException,IOException {
//        response.setHeader("Content-type","application/json;charset=UTF-8");
//        PrintWriter out = response.getWriter();
//
//        List<Shows> listData=new ArrayList<>();
//        listData = showRepository.findAllShows();
//        JsonArray allShows=new JsonArray();
//        for(int i=0;i<listData.size();i++){
//            Shows temp=listData.get(i);
//            Gson showGson=new Gson();
//            String showJson = showGson.toJson(temp);
//            JsonObject showObject = new JsonParser().parse(showJson).getAsJsonObject();
//            allShows.add(showObject);
//        }
//
//        System.out.println(allShows);
//        out.print(allShows);
//        if(out!=null) {
//            out.flush();
//        }
//        Thread.currentThread().sleep(500);
//    }
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
