package com.sjtu.jpw.Repository;
import com.sjtu.jpw.Domain.Comment;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.Table;
import javax.persistence.criteria.CriteriaBuilder;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Table(name="Comment")
@Qualifier("commentRepository")
public interface CommentRepository extends CrudRepository<Comment,Integer> {
    public Comment save(Comment comment);
    public Integer countByShowId(Integer showId);
    public List<Comment> findAllByShowId(Integer showId);
    public List<Comment> findAllByUsername(String username);
    public Comment findFirstByCommentId(Integer commentId);
    List<Comment> findAllByTarget(String target);

    @Transactional
    public void deleteAllByCommentId(Integer commentId);

    @Query("select avg(comment.rate) from Comment comment " +
            "where comment.showId=:showId and comment.parentId=-1")
    public Integer getRateByShowId(@Param("showId")Integer showId);

    @Query(nativeQuery = true,
            value = "select show_id from " +
                    "(select show_id,avg(rate)as avg_rate from comment " +
                    "where show_id in :shows and parent_id=-1 group by show_id)as A " +
                    "order by avg_rate")
    public Integer[] rateRankOfOnSale(@Param("shows")Integer[] shows);

}