package com.sjtu.jpw.Service;

import com.sjtu.jpw.Domain.Comment;
import com.sjtu.jpw.Domain.User;

import java.util.List;

public interface CommentService {
    List<Comment> getComment(Integer showId);
}
