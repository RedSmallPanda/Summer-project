package com.sjtu.jpw.Repository;
import com.sjtu.jpw.Domain.ShopCart;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.Table;

@Repository
@Table(name="ShopCart")
@Qualifier("shopCartRepository")
public interface ShopCartRepository extends CrudRepository<ShopCart,Integer> {
    public ShopCart save(ShopCart shopCart);

}