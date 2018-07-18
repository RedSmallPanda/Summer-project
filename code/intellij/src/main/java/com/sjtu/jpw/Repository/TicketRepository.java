package com.sjtu.jpw.Repository;
import com.sjtu.jpw.Domain.Ticket;
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
@Table(name="Ticket")
@Qualifier("ticketRepository")
public interface TicketRepository extends CrudRepository<Ticket,Integer> {
    @Query("select ticket from Ticket ticket")
    List<Ticket> findAllTickets();

    public Ticket save(Ticket ticket);
    public Ticket findFirstByTicketId(int ticketId);


}