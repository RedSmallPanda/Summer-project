package com.sjtu.jpw.Domain.AssistDomain;

public class ShopCartItem {
    private Integer key;
    private Integer showId;
    private String title;
    private String time;
    private String seat;
    private Integer price;
    private Integer amount;
    private Integer totalPrice;

    public ShopCartItem(Integer key, Integer showId, String title, String time, String seat, Integer price, Integer amount) {
        this.key = key;
        this.showId = showId;
        this.title = title;
        this.time = time;
        this.seat = seat;
        this.price = price;
        this.amount = amount;
        this.totalPrice = price*amount;
    }


    public Integer getKey() {
        return key;
    }

    public void setKey(Integer key) {
        this.key = key;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getSeat() {
        return seat;
    }

    public void setSeat(String seat) {
        this.seat = seat;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }


    public Integer getShowId() {
        return showId;
    }

    public void setShowId(Integer showId) {
        this.showId = showId;
    }

    public Integer getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Integer totalPrice) {
        this.totalPrice = totalPrice;
    }
}
