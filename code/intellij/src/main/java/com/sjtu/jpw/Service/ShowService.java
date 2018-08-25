package com.sjtu.jpw.Service;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

public interface ShowService {
    void addShow(String title, String info, String city, String type, String address,
                String startDate, String endDate);

    JsonArray getShows();
    JsonObject getShowsByShowId(int showId);
}
