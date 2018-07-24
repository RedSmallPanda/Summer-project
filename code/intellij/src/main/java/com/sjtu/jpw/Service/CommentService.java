package com.sjtu.jpw.Service;

import com.google.gson.JsonArray;
import com.sjtu.jpw.Domain.Comment;
import java.sql.Timestamp;

import java.util.List;

public interface CommentService {
    List<Comment> getComment(Integer showId);
    void addComment(String username, Integer showId, Integer parentId,
                    String content, Integer rate, Timestamp time);
    JsonArray getMyComment(String username);
    void deleteComment(Integer commentId);
}
