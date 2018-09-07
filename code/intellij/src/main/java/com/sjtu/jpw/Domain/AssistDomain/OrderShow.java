package com.sjtu.jpw.Domain.AssistDomain;


import java.sql.Timestamp;

public class OrderShow {
    private int orderId;
    private int showId;
    private Integer number;
    private Timestamp time;
    private Integer ticketId;
    private Integer userId;
    private Integer price;
    private String province;
    private String city;
    private String block;
    private String addrdetail;
    private String phone;
    private String name;
    private String state;
    private Integer totalPrice;
    private DetailInfo detailInfo=new DetailInfo();

    public OrderShow(int orderId, int showId, Integer number, Object time, Integer ticketId, Integer userId, Integer price, String province, String city, String block, String addrdetail, String phone, String name, String state, Integer totalPrice, String showName,Object showDate) {
        this.orderId = orderId;
        this.showId = showId;
        this.number = number;
        this.time = Timestamp.valueOf(time.toString());
        this.ticketId = ticketId;
        this.userId = userId;
        this.price = price;
        this.province = province;
        this.city = city;
        this.block = block;
        this.addrdetail = addrdetail;
        this.phone = phone;
        this.name = name;
        this.state = state;
        this.totalPrice = totalPrice;
        this.detailInfo = new DetailInfo();
        this.setDetailInfo(showName,Timestamp.valueOf(showDate.toString()));
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public int getShowId() {
        return showId;
    }

    public void setShowId(int showId) {
        this.showId = showId;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }

    public Integer getTicketId() {
        return ticketId;
    }

    public void setTicketId(Integer ticketId) {
        this.ticketId = ticketId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Integer getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Integer totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getBlock() {
        return block;
    }

    public void setBlock(String block) {
        this.block = block;
    }

    public String getAddrdetail() {
        return addrdetail;
    }

    public void setAddrdetail(String addrdetail) {
        this.addrdetail = addrdetail;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public DetailInfo getDetailInfo() {
        return detailInfo;
    }

    public void setDetailInfo(String showName,Timestamp showDate) {
        this.detailInfo.setShowName(showName);
        this.detailInfo.setShowDate(showDate);
    }

}
