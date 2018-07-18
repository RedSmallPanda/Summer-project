package com.sjtu.jpw.Repository;
import com.sjtu.jpw.Domain.Shows;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.Table;
import java.util.List;

@Repository
@Table(name="Shows")
@Qualifier("showsRepository")
public interface ShowsRepository extends CrudRepository<Shows,Integer> {
    @Query("select show from Shows show")
    List<Shows> findAllShows();

    public Shows save(Shows show);
    Shows findFirstByShowId(int showId);

}