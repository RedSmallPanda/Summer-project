package com.sjtu.jpw.Domain.AssistDomain;
import java.sql.Timestamp;

public class TicketData {
    private int ticketId;
    private String title;
    private Timestamp time;
    private Integer price;
    private String seat;
    private Integer amount;
    private Integer stock;
    private Integer showId;

    public TicketData(Integer ticketId, String title, Object time, Integer price, String seat,
        Integer amount, Integer stock, Integer showId) {
        this.ticketId = ticketId;
        this.title = title;
        this.time = strToTimeStamp(time.toString());
        this.price = price;
        this.seat = seat;
        this.amount = amount;
        this.stock = stock;
        this.showId = showId;
    }

    private Timestamp strToTimeStamp(String timeStamp){
        Timestamp ts = new Timestamp(System.currentTimeMillis());
        try {
            ts = Timestamp.valueOf(timeStamp);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ts;
    }

    public int getTicketId() {
        return ticketId;
    }

    public void setTicketId(int ticketId) {
        this.ticketId = ticketId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title){
        this.title = title;
    }

    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public String getSeat() {
        return seat;
    }

    public void setSeat(String seat) {
        this.seat = seat;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public Integer getShowId() {
        return showId;
    }

    public void setShowId(Integer showId) {
        this.showId = showId;
    }
}
