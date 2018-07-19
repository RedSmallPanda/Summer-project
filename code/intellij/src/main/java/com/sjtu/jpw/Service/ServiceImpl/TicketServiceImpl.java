package com.sjtu.jpw.Service.ServiceImpl;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.sjtu.jpw.Domain.Collection;
import com.sjtu.jpw.Domain.Shows;
import com.sjtu.jpw.Domain.Ticket;
import com.sjtu.jpw.Repository.CollectionRepository;
import com.sjtu.jpw.Repository.CommentRepository;
import com.sjtu.jpw.Repository.ShowsRepository;
import com.sjtu.jpw.Repository.TicketRepository;
import com.sjtu.jpw.Repository.UtilClass.ShowTicket;
import com.sjtu.jpw.Service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.criteria.CriteriaBuilder;
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
    @Autowired
    private CollectionRepository collectionRepository;


    @Override
    public String AllTickets(String city, String type, Timestamp startTime, Timestamp endTime, Integer userId) {

        List<Integer> showsLike=collectionRepository.findAllShowsCollection(userId);
        List<ShowTicket> itemList=showsRepository.findAllShowsByParams(city,type,startTime,endTime);
        System.out.println(itemList.size());
        for(int i=0;i<itemList.size();i++){
            ShowTicket temp=itemList.get(i);
            Integer showId=temp.getShowId();
            Integer commentNum=commentRepository.countByShowId(showId);
            Integer minPrice=ticketRepository.minPrice(showId);
            temp.setCommentNum(commentNum);
            temp.setMinPrice(minPrice);
            if(showsLike.contains(showId)){temp.setIsLike(1);}
            System.out.println(temp.toString());
        }


        Gson gson=new Gson();
        return gson.toJson(itemList);
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
