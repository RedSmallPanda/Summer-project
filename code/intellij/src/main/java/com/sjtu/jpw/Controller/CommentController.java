package com.sjtu.jpw.Controller;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.sjtu.jpw.Domain.Comment;
import com.sjtu.jpw.Service.CommentService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.List;

@Controller
public class CommentController {

    @Resource(name="commentService")
    private CommentService commentService;
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
}
