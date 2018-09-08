package com.sjtu.jpw.Repository;
import com.sjtu.jpw.Domain.AssistDomain.RefundData;
import com.sjtu.jpw.Domain.Refund;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.Table;
import java.sql.Timestamp;
import java.util.List;

@Repository
@Table(name="Refund")
@Qualifier("refundRepository")
public interface RefundRepository extends CrudRepository<Refund,Integer> {
    public Refund save(Refund refund);
    public Refund findFirstByOrderId(int orderId);

    @Query("select new com.sjtu.jpw.Domain.AssistDomain.RefundData(orders.orderId,orders.number,orders.time,refund.refundTime,refund.state,orders.totalPrice,shows.title,refund.reason) " +
            "from Orders orders ,Refund refund ,Ticket ticket, Shows shows " +
            "where refund.orderId=orders.orderId and orders.ticketId=ticket.ticketId and ticket.showId=shows.showId and refund.state =:state order by refund.refundTime asc ")
    public List<RefundData> getAllRefundData(@Param("state")String state);
}