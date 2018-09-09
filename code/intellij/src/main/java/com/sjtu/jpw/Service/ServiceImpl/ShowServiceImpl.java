package com.sjtu.jpw.Service.ServiceImpl;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.sjtu.jpw.Repository.ShowsRepository;
import com.sjtu.jpw.Repository.TicketRepository;
import com.sjtu.jpw.Service.CommentService;
import com.sjtu.jpw.Service.MongoDBService;
import com.sjtu.jpw.Service.ShowService;
import org.springframework.beans.factory.annotation.Autowired;
import com.sjtu.jpw.Domain.Shows;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.sql.Date;

@Service("showService")
public class ShowServiceImpl implements ShowService {
    @Autowired
    private ShowsRepository showsRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @Resource(name="commentService")
    private CommentService commentService;

    public void addShow(String title, String info, String city, String type, String address,
                        String startDate, String endDate){
        Shows show = new Shows();
        show.setTitle(title);
        show.setInfo(info);
        show.setCity(city);
        show.setType(type);
        show.setAddress(address);
        show.setRate(0);
        show.setStarttime(strToDate(startDate));
        show.setEndtime(strToDate(endDate));
        showsRepository.save(show);
    }

    public JsonArray getShows(){
        List<Shows> shows = showsRepository.findAllShows();
        return tempShows(shows);
    }

    public JsonObject getShowsByShowId(int showId) {
        Shows show = showsRepository.findFirstByShowId(showId);
        Gson showGson = new Gson();
        String showJson = showGson.toJson(show);
        JsonObject showObject = new JsonParser().parse(showJson).getAsJsonObject();
        return showObject;
    }

    public void deleteShow(Integer showId){
        ticketRepository.deleteAllByShowId(showId);
        showsRepository.deleteAllByShowId(showId);
    }

    public List<Shows> getShowsByIdArray(Integer[] showIds){
        List<Shows> recommendList = new ArrayList<>();
        for (Integer i : showIds) {
            recommendList.add(showsRepository.findFirstByShowId(i));
        }
        return recommendList;
    }

    private Date strToDate(String strDate){
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        java.util.Date d = null;
        try {
            d = format.parse(strDate);
        } catch (Exception e) {
            e.printStackTrace();
        }
        //Date date = new java.sql.Date(d.getTime());
        return new Date(d.getTime());
    }

    public String getTitleByShowId(Integer showId){
        return showsRepository.findFirstByShowId(showId).getTitle();
    }

    public JsonArray searchShows(String search){
        List<Shows> shows = showsRepository.searchShows(search);
        return tempShows(shows);
    }

    private JsonArray tempShows(List<Shows> shows){
        JsonArray showsData = new JsonArray();
        Iterator<Shows> it = shows.iterator();
        while(it.hasNext()){
            Shows show = it.next();
            JsonObject showObject = new JsonObject();
            showObject.addProperty("showId",show.getShowId());
            showObject.addProperty("title",show.getTitle());
            showObject.addProperty("info",show.getInfo());
            showObject.addProperty("city",show.getCity());
            showObject.addProperty("type",show.getType());
            showObject.addProperty("address",show.getAddress());
            showObject.addProperty("rate",show.getRate());
            showObject.addProperty("startDate",show.getStarttime().toString());
            showObject.addProperty("endDate",show.getEndtime().toString());
            showsData.add(showObject);
        }
        return showsData;
    }
}
