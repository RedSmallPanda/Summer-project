package com.sjtu.jpw.Repository;
import com.sjtu.jpw.Domain.Collection;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Table;
import java.util.List;

@Repository
@Table(name="Collection")
@Qualifier("collectionRepository")
public interface CollectionRepository extends CrudRepository<Collection,Integer> {
    public Collection save(Collection collection);

    @Transactional
    @Modifying
    @Query("delete from Collection collection where collection.userId=:userId and collection.showId=:showId")
    void deleteByShowIdAndUserId(@Param("showId")int showId, @Param("userId")int userId);

    @Query("select collection.showId from Collection collection where collection.userId=:userId")
    public List<Integer>  findAllShowCollectionId(@Param("userId") Integer userId);

}