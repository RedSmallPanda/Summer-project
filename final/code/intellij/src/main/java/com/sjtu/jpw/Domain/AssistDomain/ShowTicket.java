package com.sjtu.jpw.Domain.AssistDomain;

import java.sql.Date;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;

public class ShowTicket {
    private Integer showId;
    private String title;
    private String info;
    private String address;
    private Integer rate;
    private Integer minPrice;
    private Integer commentNum;
    private Boolean isLike;
    private String startTime;
    private String endTime;
    private Integer stock;

    public ShowTicket(Integer showId,String title,String info,String address,Integer rate,
                      Object startTime,Object endTime,Integer stock) {

        this.showId=showId;
        this.title=title;
        this.info=info;
        this.address=address;
        this.rate=rate;
        this.minPrice=0;
        this.commentNum=0;
        this.isLike=false;
        SimpleDateFormat format=new SimpleDateFormat("yyyy-MM-dd");
        this.startTime=format.format(Date.valueOf(startTime.toString()));
        this.endTime=format.format(Date.valueOf(endTime.toString()));
        this.stock=stock;
    }

    public Integer getShowId() {
        return showId;
    }

    public void setShowId(Integer showId) {
        this.showId = showId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getRate() {
        return rate;
    }

    public void setRate(Integer rate) {
        this.rate = rate;
    }

    public Integer getMinPrice() {
        return minPrice;
    }

    public void setMinPrice(Integer minPrice) {
        this.minPrice = minPrice;
    }

    public Integer getCommentNum() {
        return commentNum;
    }

    public void setCommentNum(Integer commentNum) {
        this.commentNum = commentNum;
    }

    public Boolean getIsLike() {
        return isLike;
    }

    public void setIsLike(Boolean isLike) {
        this.isLike = isLike;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }


    @Override
    public String toString() {
        return "ShowTicket{" +
                "showId=" + showId +
                ", title='" + title + '\'' +
                ", info='" + info + '\'' +
                ", address='" + address + '\'' +
                ", rate=" + rate +
                ", minPrice=" + minPrice +
                ", commentNum=" + commentNum +
                ", isLike=" + isLike +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", stock=" + stock +
                '}';
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }
}
