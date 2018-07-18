package com.sjtu.jpw.Domain.AssistDomain;

import java.sql.Timestamp;

public class DetailInfo {
    private String showName;
    private Timestamp showDate;

    public String getShowName() {
        return showName;
    }

    public void setShowName(String name) {
        this.showName = name;
    }

    public Timestamp getShowDate() {
        return showDate;
    }

    public void setShowDate(Timestamp date) {
        this.showDate = date;
    }
}
