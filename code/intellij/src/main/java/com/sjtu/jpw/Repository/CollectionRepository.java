package com.sjtu.jpw.Repository;
import com.sjtu.jpw.Domain.Collection;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.Table;

@Repository
@Table(name="Collection")
@Qualifier("collectionRepository")
public interface CollectionRepository extends CrudRepository<Collection,Integer> {
    public Collection save(Collection collection);

}