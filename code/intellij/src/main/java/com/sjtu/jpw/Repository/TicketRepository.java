package com.sjtu.jpw.Repository;

import com.sjtu.jpw.Domain.Ticket;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.Table;
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

        public List<Ticket> findAllByShowId(Integer showId);


        //   @Modifying
        //   @Query("update Shows show set user.password=:password where user.userId=:userId")
        //  public void updatePassword(@Param("password")String password, @Param("userId") int id);


    }

