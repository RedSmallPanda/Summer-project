package com.sjtu.jpw.Domain.AssistDomain;


import java.sql.Timestamp;

public class RefundData {
    private int orderId;
    private Integer number;
    private Timestamp time;
    private Timestamp refundTime;
    private String state;
    private Integer totalPrice;
    private String showName;
    private String reason;


    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
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

    public Timestamp getRefundTime() {
        return refundTime;
    }

    public void setRefundTime(Timestamp refundTime) {
        this.refundTime = refundTime;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Integer getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Integer totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getShowName() {
        return showName;
    }

    public void setShowName(String showName) {
        this.showName = showName;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

}
