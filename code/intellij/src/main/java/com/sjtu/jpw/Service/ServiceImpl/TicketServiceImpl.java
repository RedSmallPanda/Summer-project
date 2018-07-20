package com.sjtu.jpw.Service.ServiceImpl;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.sjtu.jpw.Domain.Ticket;
import com.sjtu.jpw.Repository.CollectionRepository;
import com.sjtu.jpw.Repository.CommentRepository;
import com.sjtu.jpw.Repository.ShowsRepository;
import com.sjtu.jpw.Repository.TicketRepository;
import com.sjtu.jpw.Domain.AssistDomain.ShowTicket;
import com.sjtu.jpw.Service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

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

        List<ShowTicket> itemList=showsRepository.findCollectionShows(collectionRepository.findAllShowsCollection(userId));

        for(int i=0;i<itemList.size();i++){
            ShowTicket temp=itemList.get(i);
            Integer showId=temp.getShowId();
            Integer commentNum=commentRepository.countByShowId(showId);
            Integer minPrice=ticketRepository.minPrice(showId);
            temp.setCommentNum(commentNum);
            temp.setMinPrice(minPrice);
            temp.setIsLike(1);
            System.out.println(temp.toString());
        }
        return null;
    }

    @Override
    public JsonArray CartTickets(Integer userId) {


        return null;
    }

    @Override
    public String ticketsDetail(Integer showId)  {

        SimpleDateFormat dateformat =  new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat timeformat =  new SimpleDateFormat("HH:mm");
        Map<String,Map<String,List<Ticket>>> ticketMap= new HashMap<>();
        List<Ticket> allTickets=ticketRepository.findAllByShowId(showId);
        for (Ticket ticket : allTickets) {
            String date = dateformat.format(ticket.getTime());
            String time = timeformat.format(ticket.getTime());
            if (ticketMap.containsKey(date)) {
                Map<String,List<Ticket>> tempMap=ticketMap.get(date);
                if (tempMap.containsKey(time)){
                    List<Ticket> tempList= tempMap.get(time);
                    tempList.add(ticket);
                    tempMap.put(time,tempList);
                    ticketMap.put(date,tempMap);
                }
                else{
                    List<Ticket> newList=new ArrayList<>();
                    newList.add(ticket);
                    tempMap.put(time,newList);
                }
            }
            else{
                List<Ticket> newList=new ArrayList<>();
                newList.add(ticket);
                Map<String,List<Ticket>> newMap=new HashMap<>();
                newMap.put(time,newList);
                ticketMap.put(date,newMap);
            }
        }
        Gson gson=new Gson();
        System.out.println(gson.toJson(ticketMap));





      /*  SimpleDateFormat testformat =  new SimpleDateFormat("HH:mm");
        Timestamp timestamp=Timestamp.valueOf("1970-01-06 11:45:55");
        String date=testformat.format(timestamp);
        System.out.println("test format:"+date);*/

        return null;
    }
}
