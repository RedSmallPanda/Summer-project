package com.sjtu.jpw.Domain;

import javax.persistence.*;
import java.util.Objects;

@Entity
@IdClass(ShopCartPK.class)
public class ShopCart {
    private int ticketId;
    private int userId;
    private Integer number;

    @Id
    @Column(name = "ticket_id", nullable = false)
    public int getTicketId() {
        return ticketId;
    }

    public void setTicketId(int ticketId) {
        this.ticketId = ticketId;
    }

    @Id
    @Column(name = "user_id", nullable = false)
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Basic
    @Column(name = "number", nullable = true)
    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ShopCart shopCart = (ShopCart) o;
        return ticketId == shopCart.ticketId &&
                userId == shopCart.userId &&
                Objects.equals(number, shopCart.number);
    }

    @Override
    public int hashCode() {

        return Objects.hash(ticketId, userId, number);
    }
}
