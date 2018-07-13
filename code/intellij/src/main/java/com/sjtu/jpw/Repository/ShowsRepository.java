package com.sjtu.jpw.Repository;

import com.sjtu.jpw.Domain.Shows;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.Table;
import java.util.List;

    @Repository
    @Table(name="Shows")
    @Qualifier("showsRepository")
    public interface ShowsRepository extends CrudRepository<Shows,Integer> {
        public Shows save(Shows show);
        public List<Shows> findAllByCityAndType(String city,String type);


     //   @Modifying
     //   @Query("update Shows show set user.password=:password where user.userId=:userId")
      //  public void updatePassword(@Param("password")String password, @Param("userId") int id);


    }

