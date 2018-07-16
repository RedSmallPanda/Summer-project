package com.sjtu.jpw.Repository;

import com.sjtu.jpw.Domain.Ticket;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.Table;
import java.util.List;

    @Repository
    @Table(name="Ticket")
    @Qualifier("ticketRepository")
    public interface TicketRepository extends CrudRepository<Ticket,Integer> {
        public Ticket save(Ticket ticket);
    //    @Query("select * from Ticket ticket where ticket.")
        public List<Ticket> findAllByShowId(int showid);


        //   @Modifying
        //   @Query("update Shows show set user.password=:password where user.userId=:userId")
        //  public void updatePassword(@Param("password")String password, @Param("userId") int id);


    }

