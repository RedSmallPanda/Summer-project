package Jpwcrawler.Domain;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.sql.Timestamp;

@Entity
public class Refund {
    private int orderId;
    private String state;
    private String reason;
    private Timestamp refundTime;

    @Id
    @Column(name = "order_id", nullable = false)
    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    @Basic
    @Column(name = "state", nullable = true, length = -1)
    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    @Basic
    @Column(name = "reason", nullable = true, length = -1)
    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    @Basic
    @Column(name = "refund_time", nullable = false)
    public Timestamp getRefundTime() {
        return refundTime;
    }

    public void setRefundTime(Timestamp refundTime) {
        this.refundTime = refundTime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Refund refund = (Refund) o;

        if (orderId != refund.orderId) return false;
        if (state != null ? !state.equals(refund.state) : refund.state != null) return false;
        if (reason != null ? !reason.equals(refund.reason) : refund.reason != null) return false;
        if (refundTime != null ? !refundTime.equals(refund.refundTime) : refund.refundTime != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = orderId;
        result = 31 * result + (state != null ? state.hashCode() : 0);
        result = 31 * result + (reason != null ? reason.hashCode() : 0);
        result = 31 * result + (refundTime != null ? refundTime.hashCode() : 0);
        return result;
    }
}
