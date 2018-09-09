package com.sjtu.jpw.Domain.AssistDomain;

import java.sql.Date;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;

public class SalesData {
    private long number;
    private String type;

    public SalesData(long number, String type) {
        this.number = number;
        this.type = type;
    }

    public long getNumber() {
        return number;
    }

    public void setNumber(long number) {
        this.number = number;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

}
