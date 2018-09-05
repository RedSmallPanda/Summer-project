package com.sjtu.jpw.Repository;
import com.sjtu.jpw.Domain.Shows;
import com.sjtu.jpw.Domain.AssistDomain.ShowTicket;
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
@Table(name="Shows")
@Qualifier("showsRepository")
public interface ShowsRepository extends CrudRepository<Shows,Integer> {
    @Query("select show from Shows show")
    public List<Shows> findAllShows();

    @Query("select distinct new com.sjtu.jpw.Domain.AssistDomain.ShowTicket(t1.showId,t1.title,t1.info,t1.address,t1.rate,t1.starttime,t1.endtime,0) " +
            "from Shows t1 join Ticket t2 on t1.showId=t2.showId " +
            "where (t1.city=:city or 'all'=:city) and (t1.type=:showtype or 'all'=:showtype) " +
            "and t2.time between :starttime and :endtime " +
            "and t1.title like %:search%")//todo: 模糊搜索
    public Page<ShowTicket> findAllShowsByParamsAndPage(@Param("city")String city,
                                                   @Param("showtype")String type,
                                                   @Param("starttime")Timestamp startTime,
                                                   @Param("endtime")Timestamp endTime,
                                                   @Param("search")String search,
                                                   Pageable pageable);


    @Query("select distinct new com.sjtu.jpw.Domain.AssistDomain.ShowTicket(t1.showId,t1.title,t1.info,t1.address,t1.rate,t1.starttime,t1.endtime,0) " +
            "from Shows t1 join Ticket t2 on t1.showId=t2.showId " +
            "where (t1.city=:city or 'all'=:city) and (t1.type=:showtype or 'all'=:showtype) " +
            "and t2.time between :starttime and :endtime " +
            "and t1.title like %:search%")//todo: 模糊搜索
    public List<ShowTicket> findAllShowsByParams(@Param("city")String city,
                                                 @Param("showtype")String type,
                                                 @Param("starttime")Timestamp startTime,
                                                 @Param("endtime")Timestamp endTime,
                                                 @Param("search")String search);

    @Query("select distinct new com.sjtu.jpw.Domain.AssistDomain.ShowTicket(t1.showId,t1.title,t1.info,t1.address,t1.rate,t1.starttime,t1.endtime,0) " +
            "from Shows t1 where t1.showId in :showIds")
    public List<ShowTicket> findCollectionShows(@Param("showIds") List<Integer> showIds);

    public Shows save(Shows show);
    Shows findFirstByShowId(int showId);

    @Transactional
    public void deleteAllByShowId(Integer showId);

    @Transactional
    @Modifying
    @Query("update Shows show set rate=:rate where showId=:showId")
    public void setRateByShowId(@Param("showId")Integer showId, @Param("rate")Integer rate);
}