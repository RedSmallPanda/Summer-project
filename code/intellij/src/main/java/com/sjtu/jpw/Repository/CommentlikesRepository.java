package com.sjtu.jpw.Repository;
import com.sjtu.jpw.Domain.Commentlikes;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.Table;

@Repository
@Table(name="Commentlikes")
@Qualifier("commentlikesRepository")
public interface CommentlikesRepository extends CrudRepository<Commentlikes,Integer> {
    public Commentlikes save(Commentlikes commentlikes);

}