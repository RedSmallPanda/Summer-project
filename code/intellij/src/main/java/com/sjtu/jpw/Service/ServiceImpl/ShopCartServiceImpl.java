package com.sjtu.jpw.Service.ServiceImpl;

import com.sjtu.jpw.Domain.ShopCart;
import com.sjtu.jpw.Repository.ShopCartRepository;
import com.sjtu.jpw.Service.ShopCartService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class ShopCartServiceImpl implements ShopCartService {
    @Autowired
    private ShopCartRepository shopCartRepository;
    @Override
    public String getCurrentCart(Integer userId) {
        return null;
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
