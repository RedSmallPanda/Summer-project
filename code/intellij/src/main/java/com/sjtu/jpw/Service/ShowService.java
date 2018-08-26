package com.sjtu.jpw.Service;
import com.google.gson.JsonArray;

public interface ShowService {
    void addShow(String title, String info, String city, String type, String address,
                String startDate, String endDate);

    JsonArray getShows();

    void deleteShow(Integer showId);
}
