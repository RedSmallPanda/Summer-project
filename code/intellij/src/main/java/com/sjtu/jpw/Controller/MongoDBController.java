package com.sjtu.jpw.Controller;

import com.mongodb.*;
import com.sjtu.jpw.Repository.ShowsRepository;
import com.sjtu.jpw.Service.MongoDBService;
import com.sjtu.jpw.Service.ShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@Controller
public class MongoDBController {

    @Resource(name="mongoDBService")
    private MongoDBService mongoDBService;

    @Autowired
    private ShowService showService;

    @RequestMapping(value="/uploadImg",produces="application/json;charset=UTF-8")
    public void UploadAvatar(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Content-type","application/json;charset=UTF-8");
    }

    @RequestMapping(value="/addAvatar",produces="application/json;charset=UTF-8")
    public void AddAvatar(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Content-type","application/json;charset=UTF-8");

        DBCollection collection = mongoDBService.getCollection("avatar");
        String imgUrl = request.getParameter("imgUrl");
        String username = request.getParameter("username");
        DBObject dbObject = new BasicDBObject();
        BasicDBObject query = new BasicDBObject();
        query.put("username",username);
        if(collection.findOne(query)!=null){
            collection.remove(query);
        }
        dbObject.put("username",username);
        dbObject.put("imgUrl",imgUrl);
        collection.insert(dbObject);
    }

    @RequestMapping(value="/getAvatar",produces="application/json;charset=UTF-8")
    public void GetAvatar(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Content-type","application/json;charset=UTF-8");

        PrintWriter out = response.getWriter();

        DBCollection collection = mongoDBService.getCollection("avatar");
        String username = request.getParameter("username");
        BasicDBObject query = new BasicDBObject();
        query.put("username",username);
        DBObject img = collection.findOne(query);
        //System.out.println(img);
        if(img != null){
            //System.out.println(img.get("imgUrl"));
            out.print(img.get("imgUrl"));
        }
        out.flush();

    }

    @RequestMapping(value="/addImage",produces="application/json;charset=UTF-8")
    public void AddImg(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Content-type","application/json;charset=UTF-8");

        DBCollection collection = mongoDBService.getCollection("show");
        String imgUrl = request.getParameter("imgUrl");
        String showId = request.getParameter("showId");
        DBObject dbObject = new BasicDBObject();
        dbObject.put("showId",showId);
        dbObject.put("imgUrl",imgUrl);
        collection.insert(dbObject);

    }

    @RequestMapping(value="/getImage",produces="application/json;charset=UTF-8")
    public void GetImg(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Content-type","multipart/form-data;charset=UTF-8");

        PrintWriter out = response.getWriter();

        DBCollection collection = mongoDBService.getCollection("image");
        Integer showId = Integer.valueOf(request.getParameter("showId"),10);
        String title = showService.getTitleByShowId(showId);
        System.out.println("title:"+title);
        BasicDBObject query = new BasicDBObject();
        query.put("title",title);
        DBObject img = collection.findOne(query);
        if(img!=null) {
            out.print(img.get("imgUrl").toString());
            out.flush();
        }

    }

    @RequestMapping(value="/imageCache",produces="application/json;charset=UTF-8")
    public void ImageCache(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Content-type","multipart/form-data;charset=UTF-8");

        DBCollection collection = mongoDBService.getCollection("cache");
        String imgUrl = request.getParameter("imgUrl");
        DBObject img = collection.findOne();
        if(img != null){
            collection.remove(img);
        }
        DBObject dbObject = new BasicDBObject();
        dbObject.put("imgUrl",imgUrl);
        collection.insert(dbObject);
    }
}
