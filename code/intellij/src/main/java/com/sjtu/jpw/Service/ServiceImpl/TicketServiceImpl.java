package com.sjtu.jpw.Service.ServiceImpl;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.sjtu.jpw.Domain.Collection;
import com.sjtu.jpw.Domain.Ticket;
import com.sjtu.jpw.Repository.*;
import com.sjtu.jpw.Domain.AssistDomain.ShowTicket;
import com.sjtu.jpw.Service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
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
    @Autowired
    private OrdersRepository ordersRepository;


    @Override
    public String allTickets(String city, String type, Timestamp startTime, Timestamp endTime,
                             String search, Integer userId, int page) {

        List<Integer> showsLike = collectionRepository.findAllShowCollectionId(userId);
        System.out.println(page);
        Page<ShowTicket> tempItemList = showsRepository.findAllShowsByParamsAndPage(city, type, startTime, endTime, "%"+search+"%", new PageRequest(page-1,10));
        System.out.println(tempItemList.getContent());
        List<ShowTicket> itemList=tempItemList.getContent();
        for (int i = 0; i < itemList.size(); i++) {
            ShowTicket temp = itemList.get(i);
            Integer showId = setShowTicketInfo(temp);
            if (showsLike.contains(showId)) {
                temp.setIsLike(true);
            }
            System.out.println("allTickets:"+temp.toString());
        }


        Gson gson = new Gson();
        return gson.toJson(itemList);
    }

    @Override
    public int getOriginNumber(String city, String type, Timestamp startTime, Timestamp endTime,
                             String search) {

        List<ShowTicket> itemList = showsRepository.findAllShowsByParams(city, type, startTime, endTime, search);
        System.out.println(itemList.size());
        return itemList.size();
    }

    private Integer setShowTicketInfo(ShowTicket temp) {
        Integer showId = temp.getShowId();
        Integer commentNum = commentRepository.countByShowId(showId);
        temp.setCommentNum(commentNum);
        Integer rate = commentRepository.getRateByShowId(showId);
        temp.setRate(rate);
        Integer minPrice = ticketRepository.minPrice(showId);
        temp.setMinPrice(minPrice);
        Integer stock = ticketRepository.getStock(showId);
        temp.setStock(stock);
        return showId;
    }

    @Override
    public String userCollection(Integer userId) {

        List<ShowTicket> itemList=showsRepository.findCollectionShows(collectionRepository.findAllShowCollectionId(userId));

        for(int i=0;i<itemList.size();i++){
            ShowTicket temp=itemList.get(i);
            setShowTicketInfo(temp);
            temp.setIsLike(true);
            System.out.println(temp.toString());
        }
        Gson gson=new Gson();
        return gson.toJson(itemList);
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

        return gson.toJson(ticketMap);





      /*  SimpleDateFormat testformat =  new SimpleDateFormat("HH:mm");
        Timestamp timestamp=Timestamp.valueOf("1970-01-06 11:45:55");
        String date=testformat.format(timestamp);
        System.out.println("test format:"+date);*/

    }

    @Override
    public void addCollection(Integer userId,Integer showId){
        Collection temp=new Collection();
        temp.setShowId(showId);
        temp.setUserId(userId);
        collectionRepository.save(temp);
    }

    @Override
    public void deleteCollection(Integer userId,Integer showId){
        collectionRepository.deleteByShowIdAndUserId(showId,userId);
    }

    @Override
    public void deleteAllCollection(Integer userId){
        collectionRepository.deleteByUserId(userId);
    }

    @Override
    public void addTicket(Integer showId, Integer price, String time, String seat, Integer amount){
        Ticket ticket = new Ticket();
        ticket.setShowId(showId);
        ticket.setPrice(price);
        ticket.setTime(strToTimeStamp(time));
        ticket.setSeat(seat);
        ticket.setAmount(amount);
        ticket.setStock(amount);
        ticketRepository.save(ticket);
    }

    @Override
    public void deleteTicket(Integer ticketId){
        ticketRepository.deleteAllByTicketId(ticketId);
    }

    @Override
    public JsonArray getTickets(){
        List<Ticket> tickets = ticketRepository.findAllTickets();
        JsonArray ticketsData = new JsonArray();
        Iterator<Ticket> it = tickets.iterator();
        while(it.hasNext()){
            Ticket ticket = it.next();
            JsonObject ticketObject = new JsonObject();
            ticketObject.addProperty("ticketId",ticket.getTicketId());
            String title = showsRepository.findFirstByShowId(ticket.getShowId()).getTitle();
            ticketObject.addProperty("title",title);
            ticketObject.addProperty("price",ticket.getPrice());
            ticketObject.addProperty("time",ticket.getTime().toString());
            ticketObject.addProperty("seat",ticket.getSeat());
            ticketObject.addProperty("amount",ticket.getAmount());
            ticketObject.addProperty("stock",ticket.getStock());
            ticketsData.add(ticketObject);
        }
        return ticketsData;
    }

    @Override
    public Integer[] recommendBySales(Timestamp startTime, Integer topN) {
        Integer[] tops = ticketRepository.rankOfOnSale(startTime);
        if (tops.length > topN) {
            tops = Arrays.copyOfRange(tops, 0, topN);
        }
        return tops;
    }

    @Override
    public Integer[] recommendByRate(Timestamp startTime, Integer topN) {
        Integer[] onSale = ticketRepository.onSale(startTime);
        Integer[] tops = onSale.length > 0 ? commentRepository.rateRankOfOnSale(onSale) : new Integer[0];
        if (tops.length > topN) {
            tops = Arrays.copyOfRange(tops, 0, topN);
        }
        return tops;
    }

    @Override
    public Integer[] recommendByGuess(int userId, Timestamp startTime, Integer topN) {
//        onSale --filter
        Integer[] onSale = ticketRepository.onSale(startTime);//show ids
        List<Integer> onSaleList = Arrays.asList(onSale);


//        target interests
        Integer[] shows = interestOfUser(userId);
        List<Integer> showsList = Arrays.asList(shows);


//        similar users
        Integer[] tickets = shows.length > 0 ? ticketRepository.ticketIdOfShows(shows) : new Integer[0];
        Integer[] sameBuy = tickets.length > 0 ? ordersRepository.ticketBuyers(tickets) : new Integer[0];
        Integer[] sameCollect = shows.length > 0 ? collectionRepository.showCollectors(shows) : new Integer[0];
//        similarity
        Map<Integer, Integer> similar = new HashMap<>();
        for (Integer user: sameBuy) {
            similar.merge(user, 1, (a, b) -> a + b);//if not exists:1 , else:+=1
        }
        for (Integer user: sameCollect) {
            similar.merge(user, 1, (a, b) -> a + b);
        }//unsorted
        similar = sortMapByValue(similar);//sorted


//        get recommend contents
        List<Integer> recommendList = new ArrayList<>();
        if (similar != null) {
            for (Integer user :
                    similar.keySet()) {
                Integer[] otherLike = interestOfUser(user);
                for (Integer recommendShow : otherLike) {
                    if (onSaleList.contains(recommendShow) && !showsList.contains(recommendShow)) {
                        recommendList.add(recommendShow);
                    }
                }
                if (recommendList.size() >= topN) break;
            }
        }


//        delete after topN parts
        Integer[] recommend = new Integer[recommendList.size()];
        recommendList.toArray(recommend);
        if (recommend.length > topN) {
            recommend = Arrays.copyOfRange(recommend, 0, topN);
        }
        return recommend;
    }

    private Integer[] interestOfUser(int userId) {
        //        collected --target collection
        List<Integer> collectList = collectionRepository.findAllShowCollectionId(userId);
        Integer[] collected = new Integer[collectList.size()];
        collectList.toArray(collected);
//        buyShows --target orders
        Integer[] buyTickets = ordersRepository.allTicketByUserId(userId);
        Integer[] buyShows = buyTickets.length > 0 ?
                ticketRepository.showIdOfTickets(buyTickets) :
                new Integer[0];
//        shows ---target all interests
        List<Integer> showsList = new ArrayList<>();
        for (Integer show: collected) {
            if (!showsList.contains(show)) {
                showsList.add(show);
            }
        }
        for (Integer show: buyShows) {
            if (!showsList.contains(show)) {
                showsList.add(show);
            }
        }
        Integer[] shows = new Integer[showsList.size()];
        showsList.toArray(shows);
        return shows;
    }

    private static Map<Integer, Integer> sortMapByValue(Map<Integer, Integer> oriMap) {
        if (oriMap == null || oriMap.isEmpty()) {
            return null;
        }
        List<Map.Entry<Integer, Integer>> entryList
                = new ArrayList<>(oriMap.entrySet());
        entryList.sort((o1, o2) -> {
            return o2.getValue() - o1.getValue();//maybe descending?
        });

        Map<Integer, Integer> sortedMap = new LinkedHashMap<>();
        for (Map.Entry<Integer, Integer> entry : entryList) {
            sortedMap.put(entry.getKey(), entry.getValue());
        }
        return sortedMap;
    }

    private Timestamp strToTimeStamp(String timeStamp){
        Timestamp ts = new Timestamp(System.currentTimeMillis());
        try {
            ts = Timestamp.valueOf(timeStamp);
            System.out.println(ts);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ts;
    }

}
