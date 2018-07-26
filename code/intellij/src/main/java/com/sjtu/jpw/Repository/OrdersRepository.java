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

    @Query("select order from Orders order where order.userId=:userId and order.state<=:state2 and order.state>=:state1")
    public List<Orders> findByUserIdAndState(@Param("userId") int userId,@Param("state1") String state1,@Param("state2")String state2);
    public Orders findFirstByOrderId(int orderId);

    public List<Orders> findAllByState(String state);

}