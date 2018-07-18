package com.sjtu.jpw.Repository;
import com.sjtu.jpw.Domain.Comment;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.Table;
import javax.persistence.criteria.CriteriaBuilder;

@Repository
@Table(name="Comment")
@Qualifier("commentRepository")
public interface CommentRepository extends CrudRepository<Comment,Integer> {
    public Comment save(Comment comment);
    public Integer countByShowId(Integer showId);
}