package com.sjtu.jpw.Controller.TicketControllers;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.sjtu.jpw.Domain.Comment;
import com.sjtu.jpw.Service.CommentService;
import com.sjtu.jpw.Service.OrdersService;
import com.sjtu.jpw.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Timestamp;
import java.util.Iterator;
import java.util.List;

@Controller
public class CommentController {

    @Resource(name="commentService")
    private CommentService commentService;

    @Resource(name="ordersService")
    private OrdersService ordersService;

    @Autowired
    private UserService userService;

    @RequestMapping(value="/comments",produces="application/json;charset=UTF-8")
    public void GetComment(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Content-type","application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();

        int showId=Integer.parseInt(request.getParameter("showId"));
        List<Comment> listData = commentService.getComment(showId);

        Iterator<Comment> it = listData.iterator();

        JsonArray allComment = new JsonArray();
        Gson gson =new Gson();
        while(it.hasNext()){
            Comment comment = it.next();
            String commentJson = gson.toJson(comment);
            JsonObject commentObject = new JsonParser().parse(commentJson).getAsJsonObject();
            String tempName = commentObject.get("username").toString();
            commentObject.addProperty("nickname",userService.getNicknameByUsername(tempName.substring(1,tempName.length()-1)));
            commentObject.addProperty("replyCount",0);
            if(comment.getParentId() == -1){
                allComment.add(commentObject);
            }
            else{
                for(int i = 0; i < allComment.size(); i++){
                    JsonObject tempObject = allComment.get(i).getAsJsonObject();
                    Comment temp = gson.fromJson(tempObject,Comment.class);
                    if(temp.getCommentId() == comment.getParentId()){
                        int currentCount = tempObject.get("replyCount").getAsInt() + 1;
                        tempObject.addProperty("replyCount",currentCount);
                        if(!tempObject.has("reply")){
                            JsonArray replyArray = new JsonArray();
                            replyArray.add(commentObject);
                            tempObject.add("reply",replyArray);
                        }
                        else{
                            JsonArray replyArray = tempObject.get("reply").getAsJsonArray();
                            replyArray.add(commentObject);
                            tempObject.add("reply",replyArray);
                        }
                    }
                }
            }
        }

        System.out.println(allComment);
        out.print(allComment);
        out.flush();
        out.close();
    }

    @RequestMapping(value="/addComment",produces="application/json;charset=UTF-8")
    public void AddComment(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Content-type","application/json;charset=UTF-8");

        String purpose = request.getParameter("purpose");
        int showId=Integer.parseInt(request.getParameter("showId"),10);
        int isFromOrder=Integer.parseInt(request.getParameter("isFromOrder"),10);
        String username = request.getParameter("username");
        int parentId = Integer.parseInt(request.getParameter("parentId"),10);
        String target = request.getParameter("target");
        String content = request.getParameter("content");
        int rate = Integer.parseInt(request.getParameter("rate"),10);
        Timestamp time = Timestamp.valueOf(request.getParameter("time"));

        if(isFromOrder==1){
            int orderId=Integer.parseInt(request.getParameter("orderId"),10);
            ordersService.UpdateOrderState("6",orderId);
        }

        if(purpose.equals("add")){
            commentService.addComment(username, showId, parentId, target, content, rate, time);
        }
        else{
            int commentId = Integer.parseInt(request.getParameter("commentId"),10);
            commentService.editComment(commentId, username, showId, parentId, target, content, rate, time);
        }
        commentService.setRate(showId);
        System.out.println("add comment successfully");
    }

    @RequestMapping(value="/myComments",produces = "application/json;charset=UTF-8")
    public void GetMyComment(HttpServletRequest request, HttpServletResponse response) throws IOException{
        response.setHeader("Content-type","application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        String username=request.getParameter("username");

        JsonArray myComment = commentService.getMyComment(username);
        System.out.println(myComment);
        out.print(myComment);
        out.flush();
    }

    @RequestMapping(value="/myReply",produces = "application/json;charset=UTF-8")
    public void GetMyReply(HttpServletRequest request, HttpServletResponse response) throws IOException{
        response.setHeader("Content-type","application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        String username=request.getParameter("username");

        JsonArray myComment = commentService.getMyReply(username);
        System.out.println(myComment);
        out.print(myComment);
        out.flush();
    }

    @RequestMapping(value="/deleteComment",produces="application/json;charset=UTF-8")
    public void DeleteComment(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Content-type","application/json;charset=UTF-8");

        int commentId= Integer.parseInt(request.getParameter("commentId"));
        commentService.deleteComment(commentId);

        System.out.println("delete comment successfully");
    }
}
