package Jpwcrawler.Domain;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Timestamp;

@Entity
public class Ticket {
    private int ticketId;
    private Integer showId;
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
    @Column(name = "show_id", nullable = true)
    public Integer getShowId() {
        return showId;
    }

    public void setShowId(Integer showId) {
        this.showId = showId;
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

        if (ticketId != ticket.ticketId) return false;
        if (showId != null ? !showId.equals(ticket.showId) : ticket.showId != null) return false;
        if (time != null ? !time.equals(ticket.time) : ticket.time != null) return false;
        if (price != null ? !price.equals(ticket.price) : ticket.price != null) return false;
        if (seat != null ? !seat.equals(ticket.seat) : ticket.seat != null) return false;
        if (amount != null ? !amount.equals(ticket.amount) : ticket.amount != null) return false;
        if (stock != null ? !stock.equals(ticket.stock) : ticket.stock != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = ticketId;
        result = 31 * result + (showId != null ? showId.hashCode() : 0);
        result = 31 * result + (time != null ? time.hashCode() : 0);
        result = 31 * result + (price != null ? price.hashCode() : 0);
        result = 31 * result + (seat != null ? seat.hashCode() : 0);
        result = 31 * result + (amount != null ? amount.hashCode() : 0);
        result = 31 * result + (stock != null ? stock.hashCode() : 0);
        return result;
    }
}
