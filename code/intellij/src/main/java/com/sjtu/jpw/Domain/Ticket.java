package com.sjtu.jpw.Domain;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
public class Ticket {
    private int ticketId;
    private Timestamp time;
    private Integer price;
    private String seat;
    private Integer amount;
    private Integer stock;

    @Id
    @Column(name = "ticket_id", nullable = false)
    public int getTicketId() {
        return ticketId;
    }

    public void setTicketId(int ticketId) {
        this.ticketId = ticketId;
    }

    @Basic
    @Column(name = "time", nullable = true)
    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }

    @Basic
    @Column(name = "price", nullable = true)
    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    @Basic
    @Column(name = "seat", nullable = true, length = -1)
    public String getSeat() {
        return seat;
    }

    public void setSeat(String seat) {
        this.seat = seat;
    }

    @Basic
    @Column(name = "amount", nullable = true)
    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    @Basic
    @Column(name = "stock", nullable = true)
    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Ticket ticket = (Ticket) o;
        return ticketId == ticket.ticketId &&
                Objects.equals(time, ticket.time) &&
                Objects.equals(price, ticket.price) &&
                Objects.equals(seat, ticket.seat) &&
                Objects.equals(amount, ticket.amount) &&
                Objects.equals(stock, ticket.stock);
    }

    @Override
    public int hashCode() {

        return Objects.hash(ticketId, time, price, seat, amount, stock);
    }
}
