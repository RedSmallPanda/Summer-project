package com.sjtu.jpw.Domain.AssistDomain;

import java.sql.Timestamp;

public class OneKindData {
    private int number;
    private Timestamp time;

    public OneKindData(int number, Object time) {
        this.number = number;
        this.time = Timestamp.valueOf(time.toString());
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }

}
