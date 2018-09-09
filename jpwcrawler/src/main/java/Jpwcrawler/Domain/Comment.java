package Jpwcrawler.Domain;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Timestamp;

@Entity
public class Comment {
    private int commentId;
    private String username;
    private Integer parentId;
    private String content;
    private Integer rate;
    private Timestamp time;
    private Integer showId;
    private String target;

    @Id
    @Column(name = "comment_id", nullable = false)
    public int getCommentId() {
        return commentId;
    }

    public void setCommentId(int commentId) {
        this.commentId = commentId;
    }

    @Basic
    @Column(name = "username", nullable = true, length = -1)
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Basic
    @Column(name = "parent_id", nullable = true)
    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    @Basic
    @Column(name = "content", nullable = true, length = -1)
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Basic
    @Column(name = "rate", nullable = true)
    public Integer getRate() {
        return rate;
    }

    public void setRate(Integer rate) {
        this.rate = rate;
    }

    @Basic
    @Column(name = "time", nullable = true)
    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }

    @Basic
    @Column(name = "show_id", nullable = true)
    public Integer getShowId() {
        return showId;
    }

    public void setShowId(Integer showId) {
        this.showId = showId;
    }

    @Basic
    @Column(name = "target", nullable = true, length = -1)
    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Comment comment = (Comment) o;

        if (commentId != comment.commentId) return false;
        if (username != null ? !username.equals(comment.username) : comment.username != null) return false;
        if (parentId != null ? !parentId.equals(comment.parentId) : comment.parentId != null) return false;
        if (content != null ? !content.equals(comment.content) : comment.content != null) return false;
        if (rate != null ? !rate.equals(comment.rate) : comment.rate != null) return false;
        if (time != null ? !time.equals(comment.time) : comment.time != null) return false;
        if (showId != null ? !showId.equals(comment.showId) : comment.showId != null) return false;
        if (target != null ? !target.equals(comment.target) : comment.target != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = commentId;
        result = 31 * result + (username != null ? username.hashCode() : 0);
        result = 31 * result + (parentId != null ? parentId.hashCode() : 0);
        result = 31 * result + (content != null ? content.hashCode() : 0);
        result = 31 * result + (rate != null ? rate.hashCode() : 0);
        result = 31 * result + (time != null ? time.hashCode() : 0);
        result = 31 * result + (showId != null ? showId.hashCode() : 0);
        result = 31 * result + (target != null ? target.hashCode() : 0);
        return result;
    }
}
