package Jpwcrawler.Domain;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Timestamp;

@Entity
public class Orders {
    private int orderId;
    private Integer ticketId;
    private Integer number;
    private String state;
    private Timestamp time;
    private Integer price;
    private String province;
    private String city;
    private String block;
    private String addrdetail;
    private String phone;
    private String name;
    private Integer totalPrice;
    private Integer userId;

    @Id
    @Column(name = "order_id", nullable = false)
    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    @Basic
    @Column(name = "ticket_id", nullable = true)
    public Integer getTicketId() {
        return ticketId;
    }

    public void setTicketId(Integer ticketId) {
        this.ticketId = ticketId;
    }

    @Basic
    @Column(name = "number", nullable = true)
    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    @Basic
    @Column(name = "state", nullable = true, length = -1)
    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
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
    @Column(name = "province", nullable = true, length = -1)
    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    @Basic
    @Column(name = "city", nullable = true, length = -1)
    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    @Basic
    @Column(name = "block", nullable = true, length = -1)
    public String getBlock() {
        return block;
    }

    public void setBlock(String block) {
        this.block = block;
    }

    @Basic
    @Column(name = "addrdetail", nullable = true, length = -1)
    public String getAddrdetail() {
        return addrdetail;
    }

    public void setAddrdetail(String addrdetail) {
        this.addrdetail = addrdetail;
    }

    @Basic
    @Column(name = "phone", nullable = true, length = -1)
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Basic
    @Column(name = "name", nullable = true, length = -1)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "total_price", nullable = true)
    public Integer getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Integer totalPrice) {
        this.totalPrice = totalPrice;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Orders orders = (Orders) o;

        if (orderId != orders.orderId) return false;
        if (ticketId != null ? !ticketId.equals(orders.ticketId) : orders.ticketId != null) return false;
        if (number != null ? !number.equals(orders.number) : orders.number != null) return false;
        if (state != null ? !state.equals(orders.state) : orders.state != null) return false;
        if (time != null ? !time.equals(orders.time) : orders.time != null) return false;
        if (price != null ? !price.equals(orders.price) : orders.price != null) return false;
        if (province != null ? !province.equals(orders.province) : orders.province != null) return false;
        if (city != null ? !city.equals(orders.city) : orders.city != null) return false;
        if (block != null ? !block.equals(orders.block) : orders.block != null) return false;
        if (addrdetail != null ? !addrdetail.equals(orders.addrdetail) : orders.addrdetail != null) return false;
        if (phone != null ? !phone.equals(orders.phone) : orders.phone != null) return false;
        if (name != null ? !name.equals(orders.name) : orders.name != null) return false;
        if (totalPrice != null ? !totalPrice.equals(orders.totalPrice) : orders.totalPrice != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = orderId;
        result = 31 * result + (ticketId != null ? ticketId.hashCode() : 0);
        result = 31 * result + (number != null ? number.hashCode() : 0);
        result = 31 * result + (state != null ? state.hashCode() : 0);
        result = 31 * result + (time != null ? time.hashCode() : 0);
        result = 31 * result + (price != null ? price.hashCode() : 0);
        result = 31 * result + (province != null ? province.hashCode() : 0);
        result = 31 * result + (city != null ? city.hashCode() : 0);
        result = 31 * result + (block != null ? block.hashCode() : 0);
        result = 31 * result + (addrdetail != null ? addrdetail.hashCode() : 0);
        result = 31 * result + (phone != null ? phone.hashCode() : 0);
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (totalPrice != null ? totalPrice.hashCode() : 0);
        return result;
    }

    @Basic
    @Column(name = "user_id", nullable = true)
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}
