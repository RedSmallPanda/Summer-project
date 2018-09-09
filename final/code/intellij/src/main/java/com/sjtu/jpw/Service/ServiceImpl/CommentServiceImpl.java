package com.sjtu.jpw.Service.ServiceImpl;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.sjtu.jpw.Domain.Comment;
import com.sjtu.jpw.Repository.CommentRepository;
import com.sjtu.jpw.Repository.ShowsRepository;
import com.sjtu.jpw.Service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.sql.Timestamp;
import java.util.Iterator;
import java.util.List;

@Service("commentService")
public class CommentServiceImpl implements CommentService{
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private ShowsRepository showsRepository;

    @Override
    public List<Comment> getComment(Integer showId){
        return commentRepository.findAllByShowId(showId);
    }

    @Override
    public void addComment(String username, Integer showId, Integer parentId, String target,
                    String content, Integer rate, Timestamp time){
        Comment comment = new Comment();
        comment.setUsername(username);
        comment.setShowId(showId);
        comment.setParentId(parentId);
        comment.setTarget(target);
        comment.setContent(content);
        comment.setRate(rate);
        comment.setTime(time);
        commentRepository.save(comment);
    }

    @Override
    public void editComment(Integer commentId, String username, Integer showId, Integer parentId,String target,
                            String content, Integer rate, Timestamp time){
        Comment comment = new Comment();
        comment.setCommentId(commentId);
        comment.setUsername(username);
        comment.setShowId(showId);
        comment.setParentId(parentId);
        comment.setTarget(target);
        comment.setContent(content);
        comment.setRate(rate);
        comment.setTime(time);
        commentRepository.save(comment);
    }

    @Override
    public JsonArray getMyComment(String username){
        List<Comment> listData = commentRepository.findAllByUsername(username);
        JsonArray commentResult = new JsonArray();
        Iterator<Comment> it = listData.iterator();
        while(it.hasNext()){
            Comment comment = it.next();
            JsonObject commentObject = new JsonObject();
            commentObject.addProperty("key",comment.getCommentId());
            String title = showsRepository.findFirstByShowId(comment.getShowId()).getTitle();
            commentObject.addProperty("title",title);
            commentObject.addProperty("showId",comment.getShowId());
            commentObject.addProperty("rate",comment.getRate());
            commentObject.addProperty("parentId",comment.getParentId());
            commentObject.addProperty("target",comment.getTarget());
            commentObject.addProperty("username",comment.getUsername());
            commentObject.addProperty("content",comment.getContent());
            commentObject.addProperty("time",comment.getTime().toString());
            commentResult.add(commentObject);
        }
        return commentResult;
    }

    @Override
    public JsonArray getMyReply(String target){
        List<Comment> listData = commentRepository.findAllByTarget(target);
        JsonArray commentResult = new JsonArray();
        Iterator<Comment> it = listData.iterator();
        while(it.hasNext()){
            Comment comment = it.next();
            JsonObject commentObject = new JsonObject();
            commentObject.addProperty("key",comment.getCommentId());
            String title = showsRepository.findFirstByShowId(comment.getShowId()).getTitle();
            commentObject.addProperty("title",title);
            commentObject.addProperty("showId",comment.getShowId());
            commentObject.addProperty("username",comment.getUsername());
            commentObject.addProperty("content",comment.getContent());
            commentObject.addProperty("time",comment.getTime().toString());
            commentResult.add(commentObject);
        }
        return commentResult;
    }

    @Override
    public void deleteComment(Integer commentId){
        commentRepository.deleteAllByCommentId(commentId);
    }

    @Override
    public void setRate(Integer showId){
        showsRepository.setRateByShowId(showId,commentRepository.getRateByShowId(showId));
    }
}
