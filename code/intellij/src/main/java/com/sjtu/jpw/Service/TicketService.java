package com.sjtu.jpw.Service;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import java.sql.Timestamp;

public interface TicketService {
    // impl 中实现 static JsonObject ComposeItem(Integer showId);
    String AllTickets(String city, String type, Timestamp startTime,Timestamp endTime,Integer userId);
    String userCollection(Integer userId);
    JsonArray CartTickets(Integer userId);
    String ticketsDetail(Integer showId);
    void addCollection(Integer userId,Integer showId);
    void deleteCollection(Integer userId,Integer showId);
    void deleteAllCollection(Integer userId);
}
