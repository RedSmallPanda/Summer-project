package com.sjtu.jpw.Repository;
import com.sjtu.jpw.Domain.Orders;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.Table;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Table(name="Orders")
@Qualifier("ordersRepository")
public interface OrdersRepository extends CrudRepository<Orders,Integer> {
    public Orders save(Orders orders);
    public List<Orders> findAllByUserIdAndState(int userId,String state);
    public Orders findFirstByOrderId(int orderId);

}