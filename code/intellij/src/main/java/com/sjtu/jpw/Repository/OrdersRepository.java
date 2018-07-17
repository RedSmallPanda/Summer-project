package com.sjtu.jpw.Repository;
import com.sjtu.jpw.Domain.Orders;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.Table;

@Repository
@Table(name="Orders")
@Qualifier("ordersRepository")
public interface OrdersRepository extends CrudRepository<Orders,Integer> {
    public Orders save(Orders orders);

}