package com.sjtu.jpw.Service.ServiceImpl;

import com.google.gson.Gson;
import com.sjtu.jpw.Domain.AssistDomain.ShopCartItem;
import com.sjtu.jpw.Domain.ShopCart;
import com.sjtu.jpw.Domain.Shows;
import com.sjtu.jpw.Domain.Ticket;
import com.sjtu.jpw.Repository.ShopCartRepository;
import com.sjtu.jpw.Repository.ShowsRepository;
import com.sjtu.jpw.Repository.TicketRepository;
import com.sjtu.jpw.Service.ShopCartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@Service
public class ShopCartServiceImpl implements ShopCartService {
    @Autowired
    private ShopCartRepository shopCartRepository;
    @Autowired
    private TicketRepository ticketRepository;
    @Autowired
    private ShowsRepository showsRepository;
    @Override
    public String getCurrentCart(Integer userId) {
        List<Integer> collectionTicketIds = shopCartRepository.findAllTicketIdbyuserId(userId);
        List<ShopCartItem> items = new ArrayList<>();
        for (Integer Id: collectionTicketIds) {
            Ticket tempTicket =ticketRepository.findFirstByTicketId(Id);
            Integer showId=tempTicket.getShowId();
            Shows tempShow=showsRepository.findFirstByShowId(showId);
            SimpleDateFormat dateformat =  new SimpleDateFormat("yyyy-MM-dd HH:mm");
            String time=dateformat.format(tempTicket.getTime());
            ShopCartItem temp= new  ShopCartItem(tempTicket.getTicketId(),showId,tempShow.getTitle(),time,
                    tempTicket.getSeat(),tempTicket.getPrice(),shopCartRepository.findItemNum(userId,Id));
            items.add(temp);
        }
        Gson gson=new Gson();
        System.out.println("shop cart json: "+gson.toJson(items));

        return gson.toJson(items);
    }

    @Override
    public void changeItemNum(Integer userId, Integer ticketId, Integer num) {
        List<ShopCart> tempList= shopCartRepository.findAllByUserIdAndTicketId(userId,ticketId);
        if(tempList.size()==1){
            ShopCart tempCart=  tempList.get(0);
            tempCart.setNumber(num);
            shopCartRepository.save(tempCart);
        }
    }

    @Override
    public void addCartItem(Integer userId, Integer ticketId, Integer num) {
        List<ShopCart> tempList= shopCartRepository.findAllByUserIdAndTicketId(userId,ticketId);
        if(tempList.size()==1){
            ShopCart tempCart=  tempList.get(0);
            Integer newNum=tempCart.getNumber()+num;
            tempCart.setNumber(newNum);
            shopCartRepository.save(tempCart);
        }
        else if (tempList.size()==0){
            ShopCart newCartItem= new ShopCart();
            newCartItem.setUserId(userId);
            newCartItem.setTicketId(ticketId);
            newCartItem.setNumber(num);
            shopCartRepository.save(newCartItem);
        }
    }

    @Override
    public void deleteCart(Integer userId) {
        shopCartRepository.deleteAllByUserId(userId);
    }

    @Override
    public void deleteCartItem(Integer userId, Integer ticketId) {
        shopCartRepository.deleteByUserIdAndTicketId(userId,ticketId);

    }
}
