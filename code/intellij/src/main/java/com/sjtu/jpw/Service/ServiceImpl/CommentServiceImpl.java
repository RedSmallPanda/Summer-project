package com.sjtu.jpw.Service.ServiceImpl;

import com.sjtu.jpw.Domain.Comment;
import com.sjtu.jpw.Repository.CommentRepository;
import com.sjtu.jpw.Service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("commentService")
public class CommentServiceImpl implements CommentService{
    @Autowired
    private CommentRepository commentRepository;

    @Override
    public List<Comment> getComment(Integer showId){
        return commentRepository.findAllByShowId(showId);
    }
}