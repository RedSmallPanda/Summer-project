package com.sjtu.jpw.Domain;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
public class Orders {
    private int orderId;
    private Integer ticketId;
    private Integer userId;
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

    @Id
    @Column(name = "order_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    @Column(name = "user_id", nullable = true)
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
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
        return orderId == orders.orderId &&
                Objects.equals(ticketId, orders.ticketId) &&
                Objects.equals(userId, orders.userId) &&
                Objects.equals(number, orders.number) &&
                Objects.equals(state, orders.state) &&
                Objects.equals(time, orders.time) &&
                Objects.equals(price, orders.price) &&
                Objects.equals(province, orders.province) &&
                Objects.equals(city, orders.city) &&
                Objects.equals(block, orders.block) &&
                Objects.equals(addrdetail, orders.addrdetail) &&
                Objects.equals(phone, orders.phone) &&
                Objects.equals(name, orders.name) &&
                Objects.equals(totalPrice, orders.totalPrice);
    }

    @Override
    public int hashCode() {

        return Objects.hash(orderId, ticketId, userId, number, state, time, price, province, city, block, addrdetail, phone, name, totalPrice);
    }
}
