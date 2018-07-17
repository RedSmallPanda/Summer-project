package com.sjtu.jpw.Domain;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Objects;

public class CommentlikesPK implements Serializable {
    private int userId;
    private int commentId;

    @Column(name = "user_id", nullable = false)
    @Id
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Column(name = "comment_id", nullable = false)
    @Id
    public int getCommentId() {
        return commentId;
    }

    public void setCommentId(int commentId) {
        this.commentId = commentId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CommentlikesPK that = (CommentlikesPK) o;
        return userId == that.userId &&
                commentId == that.commentId;
    }

    @Override
    public int hashCode() {

        return Objects.hash(userId, commentId);
    }
}
