package com.sjtu.jpw.Domain.AssistDomain;


import java.sql.Date;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;

public class MyCoupon {
    private int couponId;
    private String title;
    private Integer discount;
    private Integer discCond;
    private Date begindate;
    private Date enddate;
    private Integer number;

    public MyCoupon(int couponId, String title, Integer discount, Integer discCond, Object begindate, Object enddate, Integer number) {
        this.couponId = couponId;
        this.title = title;
        this.discount = discount;
        this.discCond = discCond;
        this.begindate = java.sql.Date.valueOf(begindate.toString());
        this.enddate = java.sql.Date.valueOf(enddate.toString());
        this.number = number;
    }

    public java.sql.Date objectToDate(Object date){
        java.util.Date utilDate=null;
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        try {
            utilDate = format.parse(date.toString());
        } catch (ParseException e) {
            e.printStackTrace();
        }

        java.sql.Date sqlDate=new java.sql.Date(utilDate.getTime());
        return sqlDate;
    }

    public int getCouponId() {
        return couponId;
    }

    public void setCouponId(int couponId) {
        this.couponId = couponId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getDiscount() {
        return discount;
    }

    public void setDiscount(Integer discount) {
        this.discount = discount;
    }

    public Integer getDiscCond() {
        return discCond;
    }

    public void setDiscCond(Integer discCond) {
        this.discCond = discCond;
    }

    public Date getBegindate() {
        return begindate;
    }

    public void setBegindate(Date begindate) {
        this.begindate = begindate;
    }

    public Date getEnddate() {
        return enddate;
    }

    public void setEnddate(Date enddate) {
        this.enddate = enddate;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }
}
