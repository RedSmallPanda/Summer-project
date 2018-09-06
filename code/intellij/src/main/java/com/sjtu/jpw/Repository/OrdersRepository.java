package com.sjtu.jpw.Repository;
import com.sjtu.jpw.Domain.AssistDomain.OneKindData;
import com.sjtu.jpw.Domain.AssistDomain.OrderData;
import com.sjtu.jpw.Domain.AssistDomain.SalesData;
import com.sjtu.jpw.Domain.Orders;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.Table;
import javax.transaction.Transactional;
import java.sql.Timestamp;
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

    @Query("select order from Orders order where order.time>=:startTime and order.time<=:endTime and order.state>=5")
    public List<Orders> findAllByTimeRange(@Param("startTime") Timestamp startTime, @Param("endTime")Timestamp endTime);

    @Query("select order from Orders order where order.time>=:startTime and order.time<=:endTime and order.state>=5")
    public List<Orders> findOneByTimeRange(@Param("startTime") Timestamp startTime, @Param("endTime")Timestamp endTime);

    @Query("select new com.sjtu.jpw.Domain.AssistDomain.SalesData(SUM(o1.number),s1.type) " +
            "from Orders o1 ,Ticket t1 ,Shows s1 where (o1.ticketId=t1.ticketId and t1.showId=s1.showId " +
            "and o1.time between:startTime and :endTime) " +
            "group by s1.type ")
    public List<SalesData> findAllTypeSales(@Param("startTime")Timestamp startTime, @Param("endTime")Timestamp endTime);

    @Query("select new com.sjtu.jpw.Domain.AssistDomain.OneKindData(o1.number,o1.time) " +
            "from Orders o1 ,Ticket t1 ,Shows s1 where (o1.ticketId=t1.ticketId and t1.showId=s1.showId " +
            "and o1.time between:startTime and :endTime and s1.type=:kind)" )
    public List<OneKindData> findOneTypeSales(@Param("startTime")Timestamp startTime, @Param("endTime")Timestamp endTime, @Param("kind")String kind);


    @Query("select order.ticketId from Orders order where order.userId=:userId")
    public Integer[] allTicketByUserId(@Param("userId") int userId);

    @Query("select order.userId from Orders order where order.ticketId in :tickets")
    public Integer[] ticketBuyers(@Param("tickets")Integer[] tickets);

    @Query("select orders from Orders orders where ((orders.orderId=:orderId or (-1)=:orderId) and (orders.userId=:userId or (-1)=:userId)) order by orders.time desc")
    public Page<Orders> findAllOrdersByPage(@Param("orderId")int orderId, @Param("userId")int userId,Pageable pageable);

    @Query("select orders " +
            "from Orders orders " +
            "where (orders.orderId =:orderId or (-1)=:orderId) and (orders.userId=:userId or (-1)=:userId)")
    public List<Orders> getOriginNumber(@Param("orderId") int orderId, @Param("userId")int userId);


}