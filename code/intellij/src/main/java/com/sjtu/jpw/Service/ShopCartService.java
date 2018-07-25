package com.sjtu.jpw.Service;

public interface ShopCartService {
    String getCurrentCart(Integer userId);

    void changeItemNum(Integer userId,Integer ticketId,Integer num);
    void addCartItem(Integer userId,Integer ticketId);
    void deleteCart(Integer userId);
    void deleteCartItem(Integer userId, Integer ticketId);

}
