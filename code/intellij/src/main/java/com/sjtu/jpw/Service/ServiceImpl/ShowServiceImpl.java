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
import com.sjtu.jpw.Service.MongoDBService;
import com.sjtu.jpw.Service.ShowService;
import org.springframework.beans.factory.annotation.Autowired;
import com.sjtu.jpw.Domain.Shows;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Iterator;
import java.util.List;
import java.sql.Date;

@Service("showService")
public class ShowServiceImpl implements ShowService {
    @Autowired
    private ShowsRepository showsRepository;

    @Autowired
    private TicketRepository ticketRepository;

    @Resource(name="mongoDBService")
    private MongoDBService mongoDBService;

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
        DBCollection collection = mongoDBService.getCollection("image");
        BasicDBObject query = new BasicDBObject();
        JsonArray showsData = new JsonArray();
        Iterator<Shows> it = shows.iterator();
        while(it.hasNext()){
            Shows show = it.next();
            JsonObject showObject = new JsonObject();
            showObject.addProperty("showId",show.getShowId());
            showObject.addProperty("title",show.getTitle());
            query.put("title",show.getTitle());
            DBObject img = collection.findOne(query);
            if (img != null) {
                showObject.addProperty("image", img.get("imgUrl").toString());
                System.out.println("imgTest:"+img.get("imgUrl").toString());
            }
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
}
