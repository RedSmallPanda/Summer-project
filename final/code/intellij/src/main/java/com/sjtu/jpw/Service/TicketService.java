package com.sjtu.jpw.Service;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import java.sql.Timestamp;

public interface TicketService {
    // impl 中实现 static JsonObject ComposeItem(Integer showId);
    String allTickets(String city, String type, Timestamp startTime, Timestamp endTime,
                      String search, Integer userId, int page);

    String firstPageTicketsAndNumber(String city, String type, Timestamp startTime, Timestamp endTime,
                      String search, Integer userId, int page);

    int getOriginNumber(String city, String type, Timestamp startTime, Timestamp endTime,
                      String search);
    String userCollection(Integer userId);
    JsonArray CartTickets(Integer userId);
    String ticketsDetail(Integer showId);
    void addCollection(Integer userId,Integer showId);
    void deleteCollection(Integer userId,Integer showId);
    void deleteAllCollection(Integer userId);
    void addTicket(Integer showId, Integer price, String time, String seat, Integer amount);
    JsonArray getTickets();
    JsonArray searchTickets(String search);
    void deleteTicket(Integer ticketId);

    Integer[] recommendBySales(Timestamp startTime, Integer topN);
    Integer[] recommendByRate(Timestamp startTime, Integer topN);
    Integer[] recommendByGuess(int userId, Timestamp startTime, Integer topN);
}
