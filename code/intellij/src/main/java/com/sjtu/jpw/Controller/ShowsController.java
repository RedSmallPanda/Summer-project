package com.sjtu.jpw.Controller;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.sjtu.jpw.Domain.Shows;
import com.sjtu.jpw.Repository.ShowsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;

@RestController
public class ShowsController {
    @Autowired
    private ShowsRepository showRepository;

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
    }

}
