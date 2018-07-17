package com.sjtu.jpw.Service;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

public interface TicketService {
   // impl zhong shi xian  static JsonObject ComposeItem(Integer showId);
    JsonArray AllTickets(String city,String type,String time);
    JsonArray UserCollection(Integer userId);
    JsonArray CartTickets(Integer userId);

}
