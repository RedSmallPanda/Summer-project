package com.sjtu.jpw.Service.ServiceImpl;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.sjtu.jpw.Domain.Shows;
import com.sjtu.jpw.Domain.Ticket;
import com.sjtu.jpw.Repository.CommentRepository;
import com.sjtu.jpw.Repository.ShowsRepository;
import com.sjtu.jpw.Repository.TicketRepository;
import com.sjtu.jpw.Repository.UtilClass.ShowTicket;
import com.sjtu.jpw.Service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class TicketServiceImpl implements TicketService {
    @Autowired
    private ShowsRepository showsRepository;
    @Autowired
    private TicketRepository ticketRepository;
    @Autowired
    private CommentRepository commentRepository;


    @Override
    public JsonArray AllTickets(String city, String type, Timestamp startTime, Timestamp endTime) {

        List<ShowTicket> temp=showsRepository.findAllshowandticket(city,type,startTime,endTime);
        for(int i=0;i<temp.size();i++){
            System.out.println(temp.get(i).toString());
        }

        return null;
    }

    @Override
    public JsonArray UserCollection(Integer userId) {
        return null;
    }

    @Override
    public JsonArray CartTickets(Integer userId) {
        return null;
    }
}
