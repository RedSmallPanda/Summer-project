package com.sjtu.jpw.Domain;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import java.util.Objects;

@Entity
public class ShopCart {
    private Integer number;

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
        return Objects.equals(number, shopCart.number);
    }

    @Override
    public int hashCode() {

        return Objects.hash(number);
    }
}
