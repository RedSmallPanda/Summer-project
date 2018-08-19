package com.sjtu.jpw.Service.ServiceImpl;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.sjtu.jpw.Repository.ShowsRepository;
import com.sjtu.jpw.Service.ShowService;
import org.springframework.beans.factory.annotation.Autowired;
import com.sjtu.jpw.Domain.Shows;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.List;

@Service("showService")
public class ShowServiceImpl implements ShowService {
    @Autowired
    private ShowsRepository showsRepository;

    public void addShow(String title, String info, String city, String type, String address,
                        String startDate, String endDate){
        Shows show = new Shows();
        show.setTitle(title);
        show.setInfo(info);
        show.setCity(city);
        show.setType(type);
        show.setAddress(address);
        show.setRate(0);


        showsRepository.save(show);
    }

    public JsonArray getShows(){
        List<Shows> shows = showsRepository.findAllShows();
        JsonArray showsData = new JsonArray();
        Iterator<Shows> it = shows.iterator();
        while(it.hasNext()){
            Shows show = it.next();
            JsonObject showObject = new JsonObject();
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
