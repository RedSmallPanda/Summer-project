package com.sjtu.jpw.Domain;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Objects;

public class ShopCartPK implements Serializable {
    private int ticketId;
    private int userId;

    @Column(name = "ticket_id", nullable = false)
    @Id
    public int getTicketId() {
        return ticketId;
    }

    public void setTicketId(int ticketId) {
        this.ticketId = ticketId;
    }

    @Column(name = "user_id", nullable = false)
    @Id
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ShopCartPK that = (ShopCartPK) o;
        return ticketId == that.ticketId &&
                userId == that.userId;
    }

    @Override
    public int hashCode() {

        return Objects.hash(ticketId, userId);
    }
}
