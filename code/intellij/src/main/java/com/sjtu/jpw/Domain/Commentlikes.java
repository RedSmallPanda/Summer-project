package com.sjtu.jpw.Domain;

import javax.persistence.*;
import java.util.Objects;

@Entity
@IdClass(CommentlikesPK.class)
public class Commentlikes {
    private int userId;
    private int commentId;

    @Id
    @Column(name = "user_id", nullable = false)
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Id
    @Column(name = "comment_id", nullable = false)
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
        Commentlikes that = (Commentlikes) o;
        return userId == that.userId &&
                commentId == that.commentId;
    }

    @Override
    public int hashCode() {

        return Objects.hash(userId, commentId);
    }

}
