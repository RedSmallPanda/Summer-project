package com.sjtu.jpw.Repository;
import com.sjtu.jpw.Domain.Collection;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.Table;
import java.util.List;

@Repository
@Table(name="Collection")
@Qualifier("collectionRepository")
public interface CollectionRepository extends CrudRepository<Collection,Integer> {
    public Collection save(Collection collection);
    @Query("select collection.showId from Collection collection where collection.userId=:userId")
    public List<Integer>  findAllShowCollectionId(@Param("userId") Integer userId);

}