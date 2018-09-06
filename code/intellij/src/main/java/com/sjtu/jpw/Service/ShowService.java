package com.sjtu.jpw.Service;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.sjtu.jpw.Domain.Shows;

import java.sql.Date;
import java.util.List;

public interface ShowService {
    void addShow(String title, String info, String city, String type, String address,
                String startDate, String endDate);
    JsonArray getShows();
    JsonObject getShowsByShowId(int showId);
    void deleteShow(Integer showId);
    String getTitleByShowId(Integer showId);
    List<Shows> getShowsByIdArray(int[] showIds);
    JsonArray searchShows(String search);
}
