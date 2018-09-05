package com.sjtu.jpw.Repository;

import com.sjtu.jpw.Domain.Ticket;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.Table;
import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.util.List;

    @Repository
    @Table(name="Ticket")
    @Qualifier("ticketRepository")
    public interface TicketRepository extends CrudRepository<Ticket,Integer> {

        public Ticket save(Ticket ticket);
        public Ticket findByShowId(Integer showId);

        public Ticket findFirstByTicketId(Integer ticketId);

        @Query("select MIN(ticket.price) from Ticket ticket where ticket.showId=:showId")
        public Integer minPrice(@Param("showId") Integer showId);

        @Query("select sum(ticket.stock) from Ticket ticket where ticket.showId=:showId")
        public Integer getStock(@Param("showId") Integer showId);

        @Query("select ticket from Ticket ticket")
        public List<Ticket> findAllTickets();

        public List<Ticket> findAllByShowId(Integer showId);

        @Transactional
        public void deleteAllByShowId(Integer showId);

        @Transactional
        public void deleteAllByTicketId(Integer ticketId);

        @Query(nativeQuery = true,
                value="select distinct t.show_id from ticket t where t.time>:startTime and t.stock>0")
        public int[] onSale(@Param("startTime") Timestamp startTime);

        @Query(nativeQuery = true,
                value="select show_id from (select t1.show_id as show_id, sum(t1.amount-t1.stock)as sales from ticket t1 " +
                        "where t1.show_id in (select t2.show_id from ticket t2 where t2.time>:startTime and t2.stock>0) " +
                        "group by t1.show_id " +
                        "order by sales desc) as B")
        public int[] rankOfOnSale(@Param("startTime") Timestamp startTime);

        //   @Modifying
        //   @Query("update Shows show set user.password=:password where user.userId=:userId")
        //  public void updatePassword(@Param("password")String password, @Param("userId") int id);


    }

