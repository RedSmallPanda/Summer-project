package com.sjtu.jpw.Service.ServiceImpl;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.sjtu.jpw.Domain.*;
import com.sjtu.jpw.Domain.AssistDomain.*;
import com.sjtu.jpw.Repository.*;
import com.sjtu.jpw.Service.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.sql.Timestamp;

@Service("ordersService")
public class OrdersServiceImpl implements OrdersService {
    @Autowired
    private OrdersRepository ordersRepository;
    @Autowired
    private TicketRepository ticketRepository;
    @Autowired
    private ShowsRepository showsRepository;
    @Autowired
    private UserCouponRepository ucRepository;
    @Autowired
    private RefundRepository refundRepository;

    public JsonArray getOrderByState(int userId,String state1,String state2){
        JsonArray allOrders=new JsonArray();
        if(userId==-1){
            List<RefundData> neededOrders = new ArrayList<>();
            neededOrders = refundRepository.getAllRefundData(state1);
            for(int i=0;i<neededOrders.size();i++){
                RefundData tempRefund=neededOrders.get(i);
                Gson orderGson=new Gson();
                String orderJson = orderGson.toJson(tempRefund);
                JsonObject orderObject = new JsonParser().parse(orderJson).getAsJsonObject();

                allOrders.add(orderObject);
            }
        }
        else {
            List<OrderShow> neededOrders = new ArrayList<>();
            neededOrders = ordersRepository.findByUserIdAndState(userId, state1, state2);
            for(int i=0;i<neededOrders.size();i++){
                OrderShow tempOrder=neededOrders.get(i);
                Gson orderGson=new Gson();
                String orderJson = orderGson.toJson(tempOrder);
                JsonObject orderObject = new JsonParser().parse(orderJson).getAsJsonObject();

                allOrders.add(orderObject);
            }

        }
        /*JsonArray allOrders=new JsonArray();
        for(int i=0;i<neededOrders.size();i++){
            OrderShow tempOrder=neededOrders.get(i);
            Gson orderGson=new Gson();
            String orderJson = orderGson.toJson(tempOrder);
            JsonObject orderObject = new JsonParser().parse(orderJson).getAsJsonObject();

            allOrders.add(orderObject);
        }*/
        return allOrders;
    }

    @Override
    public JsonArray getCurrentOrder(int userId) {
        JsonArray currentOrders=getOrderByState(userId,"0","3");
        return currentOrders;
    }

    @Override
    public JsonArray getHistoryOrder(int userId) {
        JsonArray historyOrders=getOrderByState(userId,"4","6");
        return historyOrders;
    }

    @Override
    public JsonArray getRefundOrder() {
        JsonArray currentOrders=getOrderByState(-1,"2","-1");
        return currentOrders;
    }

    @Override
    public void UpdateOrderState(String state,int orderId){
        Orders tempOrder=ordersRepository.findFirstByOrderId(orderId);
        tempOrder.setState(state);
        ordersRepository.save(tempOrder);
    }

    @Override
    public void approveRefund(int orderId) {
        Orders tempOrder = ordersRepository.findFirstByOrderId(orderId);
        tempOrder.setState("4");
        ordersRepository.save(tempOrder);
        Refund tempRefund = refundRepository.findFirstByOrderId(orderId);
        tempRefund.setState("4");
        refundRepository.save(tempRefund);
    }

    @Override
    public void rejectRefund(int orderId){
        Orders tempOrder=ordersRepository.findFirstByOrderId(orderId);
        tempOrder.setState("3");
        ordersRepository.save(tempOrder);
        Refund tempRefund=refundRepository.findFirstByOrderId(orderId);
        tempRefund.setState("3");
        refundRepository.save(tempRefund);
    }

    @Override
    public void refund(int orderId,String reason) {
        UpdateOrderState("2", orderId);
        long time = System.currentTimeMillis();
        Timestamp currentTime=new Timestamp(time);
        Refund refund = new Refund();
        refund.setOrderId(orderId);
        refund.setState("2");
        refund.setReason(reason);
        refund.setRefundTime(currentTime);
        refundRepository.save(refund);
    }

    @Override
    public void cancelRefund(int orderId) {
        UpdateOrderState("1",orderId);
        long time = System.currentTimeMillis();
        Timestamp currentTime=new Timestamp(time);
        Refund refund=refundRepository.findFirstByOrderId(orderId);
        refund.setState("0");
        refund.setRefundTime(currentTime);
        refundRepository.save(refund);
    }

    @Override
    public boolean stockDecrease(int ticketId,int number){
        Ticket tempTicket=ticketRepository.findFirstByTicketId(ticketId);
        int currentStock=tempTicket.getStock()-number;
        if(currentStock<0){
            return false;
        }
        tempTicket.setStock(currentStock);
        ticketRepository.save(tempTicket);
        return true;
    }

    @Override
    public void useCoupon(int userId,int couponId){
        UserCoupon uc=ucRepository.findFirstByCouponIdAndUserId(couponId,userId);
        uc.setNumber(uc.getNumber()-1);
        ucRepository.save(uc);
    }

    @Override
    public Orders createOrderAndUseCouponAndDecreaseStockAndDeleteShopCart(int userId, int couponId, Orders order) {
        int ticketId=order.getTicketId();
        if(!stockDecrease(ticketId,order.getNumber())){//stockDecrease()==false
            return null;
        }
        Orders saved = ordersRepository.save(order);
        if(couponId!=-1) {
            useCoupon(userId, couponId);
        }
        return saved;

    }

    public JsonArray editSalesData(List<String> time,List<Integer> number){
        JsonArray salesData=new JsonArray();
        for (int i = 0; i < number.size(); i++) {
            JsonObject sdObject = new JsonObject();
            sdObject.addProperty("time", time.get(i));
            sdObject.addProperty("number", number.get(i));
            salesData.add(sdObject);
        }
        return salesData;
    }

    public List<String> editWeeklyStartEndTime(String timeString){
        List<String> temp=new ArrayList<>();
        int year=Integer.valueOf(timeString.substring(0,4));
        int week=Integer.valueOf(timeString.substring(5,timeString.length()-1));
        DateFormat format1 = new SimpleDateFormat("yyyy-MM-dd");
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.YEAR, year); // xxxx年
        cal.set(Calendar.WEEK_OF_YEAR, week); // 设置为xxxx年的第xx周
        cal.set(Calendar.DAY_OF_WEEK, 2); // 1表示周日，2表示周一，7表示周六
        Date date1 = cal.getTime();
        String temp1=format1.format(date1);
        System.out.println(temp1);
        cal.set(Calendar.YEAR, year);
        cal.set(Calendar.WEEK_OF_YEAR, week+1);
        cal.set(Calendar.DAY_OF_WEEK, 2);
        Date date2 = cal.getTime();
        String temp2=format1.format(date2);
        System.out.println(temp2);

        String tempStartTime = temp1 + " 00:00:00";
        System.out.println(tempStartTime);
        temp.add(tempStartTime);
        String tempEndTime = temp2 + " 00:00:00";
        System.out.println(tempEndTime);
        temp.add(tempEndTime);
        return temp;
    }

    public List<String> editDailyStartEndTime(String timeString){
        List <String> temp=new ArrayList<>();
        DateFormat format1 = new SimpleDateFormat("yyyy-MM-dd");
        String tempStartTime = timeString + " 00:00:00";
        Date today=new Date();
        try {
            today = format1.parse(timeString);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        Calendar cal = Calendar.getInstance();
        cal.setTime(today);
        cal.add(Calendar.DATE, 1);
        Date tommorrow = cal.getTime();
        String tempEndTime=format1.format(tommorrow)+" 00:00:00";

        temp.add(tempStartTime);
        temp.add(tempEndTime);

        System.out.println(tempEndTime);
        return temp;
    }

    @Override
    public JsonArray getSalesData(String choice,String timeString,String kind) {
        Timestamp startTime = new Timestamp(System.currentTimeMillis());
        Timestamp endTime = new Timestamp(System.currentTimeMillis());
        JsonArray salesData=new JsonArray();
        if(kind.equals("all")){
            if(choice.equals("year")) {
                String tempStartTime = timeString + "-01-01 00:00:00";
                String nextYear = String.valueOf(Integer.valueOf(timeString) + 1);
                String tempEndTime = nextYear + "-01-01 00:00:00";
                startTime = Timestamp.valueOf(tempStartTime);
                endTime = Timestamp.valueOf(tempEndTime);
            }
            if(choice.equals("month")) {
                String tempStartTime = timeString + "-01 00:00:00";
                String nextMonth = String.valueOf(Integer.valueOf(timeString.substring(5,7)) + 1);
                System.out.println(nextMonth);
                String tempEndTime = timeString.substring(0,5)+nextMonth+ "-01 00:00:00";
                if(Integer.valueOf(timeString.substring(5,7))==12){
                    String nextYear=String.valueOf(Integer.valueOf(timeString.substring(0,4)));
                    tempEndTime=nextYear+"-01-01 00:00:00";
                }
                startTime = Timestamp.valueOf(tempStartTime);
                endTime = Timestamp.valueOf(tempEndTime);
            }
            if(choice.equals("week")) {
                List <String> time = editWeeklyStartEndTime(timeString);
                startTime = Timestamp.valueOf(time.get(0));
                endTime = Timestamp.valueOf(time.get(1));
            }
            if(choice.equals("day")) {
                List <String> time=editDailyStartEndTime(timeString);
                startTime = Timestamp.valueOf(time.get(0));
                endTime = Timestamp.valueOf(time.get(1));
            }

            List<Integer> allKindSales = Arrays.asList(0, 0, 0, 0, 0, 0, 0);
            List<String> allKinds = Arrays.asList("演唱会", "音乐会", "曲苑杂坛", "话剧歌剧", "体育比赛", "舞蹈芭蕾",
                    "动漫游戏");

            List<SalesData> yearlyOrders=ordersRepository.findAllTypeSales(startTime,endTime);
            for(int i=0;i<yearlyOrders.size();i++){
                SalesData temp=yearlyOrders.get(i);

                System.out.println(temp);
                if(temp.getType().equals("concert")){
                    temp.setType("演唱会");
                    allKindSales.set(0,Integer.valueOf(String.valueOf(temp.getNumber())));
                }
                else if(temp.getType().equals("music")){
                    temp.setType("音乐会");
                    allKindSales.set(1,Integer.valueOf(String.valueOf(temp.getNumber())));
                }
                else if(temp.getType().equals("cnopera")){
                    temp.setType("曲苑杂坛");
                    allKindSales.set(2,Integer.valueOf(String.valueOf(temp.getNumber())));
                }
                else if(temp.getType().equals("opera")){
                    temp.setType("话剧歌剧");
                    allKindSales.set(3,Integer.valueOf(String.valueOf(temp.getNumber())));
                }
                else if(temp.getType().equals("sports")){
                    temp.setType("体育比赛");
                    allKindSales.set(4,Integer.valueOf(String.valueOf(temp.getNumber())));
                }
                else if(temp.getType().equals("dance")){
                    temp.setType("舞蹈芭蕾");
                    allKindSales.set(5,Integer.valueOf(String.valueOf(temp.getNumber())));
                }
                else {
                    temp.setType("动漫游戏");
                    allKindSales.set(6,Integer.valueOf(String.valueOf(temp.getNumber())));
                }
            }

            for (int i = 0; i < allKindSales.size(); i++) {
                JsonObject sdObject = new JsonObject();
                sdObject.addProperty("type", allKinds.get(i));
                sdObject.addProperty("number", allKindSales.get(i));
                salesData.add(sdObject);
            }
        }
        else {
            if (choice.equals("year")) {
                String tempStartTime = timeString + "-01-01 00:00:00";
                String nextYear = String.valueOf(Integer.valueOf(timeString) + 1);
                String tempEndTime = nextYear + "-01-01 00:00:00";
                startTime = Timestamp.valueOf(tempStartTime);
                endTime = Timestamp.valueOf(tempEndTime);

                    List<OneKindData> yearlyOrders = ordersRepository.findOneTypeSales(startTime, endTime, kind);

                    String timeStr1 = timeString + "-01-01 00:00:00";
                    String timeStr2 = timeString + "-02-01 00:00:00";
                    String timeStr3 = timeString + "-03-01 00:00:00";
                    String timeStr4 = timeString + "-04-01 00:00:00";
                    String timeStr5 = timeString + "-05-01 00:00:00";
                    String timeStr6 = timeString + "-06-01 00:00:00";
                    String timeStr7 = timeString + "-07-01 00:00:00";
                    String timeStr8 = timeString + "-08-01 00:00:00";
                    String timeStr9 = timeString + "-09-01 00:00:00";
                    String timeStr10 = timeString + "-10-01 00:00:00";
                    String timeStr11 = timeString + "-11-01 00:00:00";
                    String timeStr12 = timeString + "-12-01 00:00:00";
                    Timestamp time1 = Timestamp.valueOf(timeStr1);
                    Timestamp time2 = Timestamp.valueOf(timeStr2);
                    Timestamp time3 = Timestamp.valueOf(timeStr3);
                    Timestamp time4 = Timestamp.valueOf(timeStr4);
                    Timestamp time5 = Timestamp.valueOf(timeStr5);
                    Timestamp time6 = Timestamp.valueOf(timeStr6);
                    Timestamp time7 = Timestamp.valueOf(timeStr7);
                    Timestamp time8 = Timestamp.valueOf(timeStr8);
                    Timestamp time9 = Timestamp.valueOf(timeStr9);
                    Timestamp time10 = Timestamp.valueOf(timeStr10);
                    Timestamp time11 = Timestamp.valueOf(timeStr11);
                    Timestamp time12 = Timestamp.valueOf(timeStr12);
                    List<Integer> monthlySales = Arrays.asList(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
                    List<String> months = Arrays.asList("一月", "二月", "三月", "四月", "五月", "六月",
                            "七月", "八月", "九月", "十月", "十一月", "十二月");
                    for (int i = 0; i < yearlyOrders.size(); i++) {
                        OneKindData temp = yearlyOrders.get(i);
                        System.out.println(temp);
                        if ((temp.getTime().after(time1) || temp.getTime().equals(time1)) && temp.getTime().before(time2)) {
                            int number = monthlySales.get(0) + temp.getNumber();
                            monthlySales.set(0, number);
                        } else if ((temp.getTime().after(time2) || temp.getTime().equals(time2)) && temp.getTime().before(time3)) {
                            int number = monthlySales.get(1) + temp.getNumber();
                            monthlySales.set(1, number);
                        } else if ((temp.getTime().after(time3) || temp.getTime().equals(time3)) && temp.getTime().before(time4)) {
                            int number = monthlySales.get(2) + temp.getNumber();
                            monthlySales.set(2, number);
                        } else if ((temp.getTime().after(time4) || temp.getTime().equals(time4)) && temp.getTime().before(time5)) {
                            int number = monthlySales.get(3) + temp.getNumber();
                            monthlySales.set(3, number);
                        } else if ((temp.getTime().after(time5) || temp.getTime().equals(time5)) && temp.getTime().before(time6)) {
                            int number = monthlySales.get(4) + temp.getNumber();
                            monthlySales.set(4, number);
                        } else if ((temp.getTime().after(time6) || temp.getTime().equals(time6)) && temp.getTime().before(time7)) {
                            int number = monthlySales.get(5) + temp.getNumber();
                            monthlySales.set(5, number);
                        } else if ((temp.getTime().after(time7) || temp.getTime().equals(time7)) && temp.getTime().before(time8)) {
                            int number = monthlySales.get(6) + temp.getNumber();
                            monthlySales.set(6, number);
                        } else if ((temp.getTime().after(time8) || temp.getTime().equals(time8)) && temp.getTime().before(time9)) {
                            int number = monthlySales.get(7) + temp.getNumber();
                            monthlySales.set(7, number);
                        } else if ((temp.getTime().after(time9) || temp.getTime().equals(time9)) && temp.getTime().before(time10)) {
                            int number = monthlySales.get(8) + temp.getNumber();
                            monthlySales.set(8, number);
                        } else if ((temp.getTime().after(time10) || temp.getTime().equals(time10)) && temp.getTime().before(time11)) {
                            int number = monthlySales.get(9) + temp.getNumber();
                            monthlySales.set(9, number);
                        } else if ((temp.getTime().after(time11) || temp.getTime().equals(time11)) && temp.getTime().before(time12)) {
                            int number = monthlySales.get(10) + temp.getNumber();
                            monthlySales.set(10, number);
                        } else {
                            int number = monthlySales.get(11) + temp.getNumber();
                            monthlySales.set(11, number);
                        }

                    }

                   salesData=editSalesData(months,monthlySales);
            }
            else if(choice.equals("month")){
                String tempStartTime = timeString + "-01 00:00:00";
                String nextMonth = String.valueOf(Integer.valueOf(timeString.substring(5,7)) + 1);
                System.out.println(nextMonth);
                String tempEndTime = timeString.substring(0,5)+nextMonth+ "-01 00:00:00";
                if(Integer.valueOf(timeString.substring(5,7))==12){
                    String nextYear=String.valueOf(Integer.valueOf(timeString.substring(0,4)));
                    tempEndTime=nextYear+"-01-01 00:00:00";
                }
                startTime = Timestamp.valueOf(tempStartTime);
                endTime = Timestamp.valueOf(tempEndTime);
                List<OneKindData> monthlyOrders = ordersRepository.findOneTypeSales(startTime, endTime, kind);

                DateFormat format1 = new SimpleDateFormat("yyyy-MM-dd");
                Date today=new Date();
                try {
                    today = format1.parse(timeString+"-01");
                } catch (ParseException e) {
                    e.printStackTrace();
                }
                Calendar cal = Calendar.getInstance();
                cal.setTime(today);
                cal.add(Calendar.DATE, 5);
                Date tempDate1 = cal.getTime();
                String timeStr1=format1.format(tempDate1)+" 00:00:00";
                Timestamp time1 = Timestamp.valueOf(timeStr1);
                cal.add(Calendar.DATE, 5);
                Date tempDate2 = cal.getTime();
                String timeStr2=format1.format(tempDate2)+" 00:00:00";
                Timestamp time2 = Timestamp.valueOf(timeStr2);
                cal.add(Calendar.DATE, 5);
                Date tempDate3 = cal.getTime();
                String timeStr3=format1.format(tempDate3)+" 00:00:00";
                Timestamp time3 = Timestamp.valueOf(timeStr3);
                cal.add(Calendar.DATE, 5);
                Date tempDate4 = cal.getTime();
                String timeStr4=format1.format(tempDate4)+" 00:00:00";
                Timestamp time4 = Timestamp.valueOf(timeStr4);
                cal.add(Calendar.DATE, 5);
                Date tempDate5 = cal.getTime();
                String timeStr5=format1.format(tempDate5)+" 00:00:00";
                Timestamp time5 = Timestamp.valueOf(timeStr5);

                List<Integer> fiveDaySales = Arrays.asList(0, 0, 0, 0, 0, 0);
                List<String> fiveDays = Arrays.asList("1-5日", "6-10日", "11-15日", "16-20日", "21-25日", "26日至月底");
                for (int i = 0; i < monthlyOrders.size(); i++) {
                    OneKindData temp = monthlyOrders.get(i);
                    System.out.println(temp);
                    if ((temp.getTime().after(startTime) || temp.getTime().equals(startTime)) && temp.getTime().before(time1)) {
                        int number = fiveDaySales.get(0) + temp.getNumber();
                        fiveDaySales.set(0, number);
                    } else if ((temp.getTime().after(time1) || temp.getTime().equals(time1)) && temp.getTime().before(time2)) {
                        int number = fiveDaySales.get(1) + temp.getNumber();
                        fiveDaySales.set(1, number);
                    } else if ((temp.getTime().after(time2) || temp.getTime().equals(time2)) && temp.getTime().before(time3)) {
                        int number = fiveDaySales.get(2) + temp.getNumber();
                        fiveDaySales.set(2, number);
                    } else if ((temp.getTime().after(time3) || temp.getTime().equals(time3)) && temp.getTime().before(time4)) {
                        int number = fiveDaySales.get(3) + temp.getNumber();
                        fiveDaySales.set(3, number);
                    } else if ((temp.getTime().after(time4) || temp.getTime().equals(time4)) && temp.getTime().before(time5)) {
                        int number = fiveDaySales.get(4) + temp.getNumber();
                        fiveDaySales.set(4, number);
                    } else {
                        int number = fiveDaySales.get(5) + temp.getNumber();
                        fiveDaySales.set(5, number);
                    }
                }
                salesData=editSalesData(fiveDays,fiveDaySales);
            }
            else if(choice.equals("week")){
                List <String> time = editWeeklyStartEndTime(timeString);
                startTime = Timestamp.valueOf(time.get(0));
                endTime = Timestamp.valueOf(time.get(1));
                List<OneKindData> weeklyOrders = ordersRepository.findOneTypeSales(startTime, endTime, kind);

                int year=Integer.valueOf(timeString.substring(0,4));
                int week=Integer.valueOf(timeString.substring(5,timeString.length()-1));
                DateFormat format1 = new SimpleDateFormat("yyyy-MM-dd");
                Calendar cal = Calendar.getInstance();
                cal.set(Calendar.YEAR, year); // xxxx年
                cal.set(Calendar.WEEK_OF_YEAR, week); // 设置为xxxx年的第xx周
                cal.set(Calendar.DAY_OF_WEEK, 2); // 1表示周日，2表示周一，7表示周六
                Date date1 = cal.getTime();
                String day1=format1.format(date1)+" 00:00:00";
                Timestamp time1 = Timestamp.valueOf(day1);
                System.out.println(time1);
                cal.set(Calendar.DAY_OF_WEEK, 3); // 1表示周日，2表示周一，7表示周六
                Date date2 = cal.getTime();
                String day2=format1.format(date2)+" 00:00:00";
                Timestamp time2 = Timestamp.valueOf(day2);
                System.out.println(time2);
                cal.set(Calendar.DAY_OF_WEEK, 4); // 1表示周日，2表示周一，7表示周六
                Date date3 = cal.getTime();
                String day3=format1.format(date3)+" 00:00:00";
                Timestamp time3 = Timestamp.valueOf(day3);
                System.out.println(time3);
                cal.set(Calendar.DAY_OF_WEEK, 5); // 1表示周日，2表示周一，7表示周六
                Date date4 = cal.getTime();
                String day4=format1.format(date4)+" 00:00:00";
                Timestamp time4 = Timestamp.valueOf(day4);
                System.out.println(time4);
                cal.set(Calendar.DAY_OF_WEEK, 6); // 1表示周日，2表示周一，7表示周六
                Date date5 = cal.getTime();
                String day5=format1.format(date5)+" 00:00:00";
                Timestamp time5 = Timestamp.valueOf(day5);
                System.out.println(time5);
                cal.set(Calendar.DAY_OF_WEEK, 7); // 1表示周日，2表示周一，7表示周六
                Date date6 = cal.getTime();
                String day6=format1.format(date6)+" 00:00:00";
                Timestamp time6 = Timestamp.valueOf(day6);
                System.out.println(time6);
                cal.set(Calendar.YEAR, year);
                cal.set(Calendar.WEEK_OF_YEAR, week+1);
                cal.set(Calendar.DAY_OF_WEEK, 1);
                Date date7 = cal.getTime();
                String day7=format1.format(date7)+" 00:00:00";
                Timestamp time7 = Timestamp.valueOf(day7);
                System.out.println(time7);

                List<Integer> weeklySales = Arrays.asList(0, 0, 0, 0, 0, 0, 0);
                List<String> sevenDays = Arrays.asList("周一", "周二", "周三", "周四", "周五", "周六", "周日");
                for (int i = 0; i < weeklyOrders.size(); i++) {
                    OneKindData temp = weeklyOrders.get(i);
                    System.out.println(temp);
                    if ((temp.getTime().after(time1) || temp.getTime().equals(time1)) && temp.getTime().before(time2)) {
                        int number = weeklySales.get(0) + temp.getNumber();
                        weeklySales.set(0, number);
                    } else if ((temp.getTime().after(time2) || temp.getTime().equals(time2)) && temp.getTime().before(time3)) {
                        int number = weeklySales.get(1) + temp.getNumber();
                        weeklySales.set(1, number);
                    } else if ((temp.getTime().after(time3) || temp.getTime().equals(time3)) && temp.getTime().before(time4)) {
                        int number = weeklySales.get(2) + temp.getNumber();
                        weeklySales.set(2, number);
                    } else if ((temp.getTime().after(time4) || temp.getTime().equals(time4)) && temp.getTime().before(time5)) {
                        int number = weeklySales.get(3) + temp.getNumber();
                        weeklySales.set(3, number);
                    } else if ((temp.getTime().after(time5) || temp.getTime().equals(time5)) && temp.getTime().before(time6)) {
                        int number = weeklySales.get(4) + temp.getNumber();
                        weeklySales.set(4, number);
                    } else if ((temp.getTime().after(time6) || temp.getTime().equals(time6)) && temp.getTime().before(time7)) {
                        int number = weeklySales.get(5) + temp.getNumber();
                        weeklySales.set(5, number);
                    } else {
                        int number = weeklySales.get(6) + temp.getNumber();
                        weeklySales.set(6, number);
                    }
                }
                salesData=editSalesData(sevenDays,weeklySales);
            }
            else{
                List <String> time=editDailyStartEndTime(timeString);
                startTime = Timestamp.valueOf(time.get(0));
                endTime = Timestamp.valueOf(time.get(1));
                List<OneKindData> dailyOrders = ordersRepository.findOneTypeSales(startTime, endTime, kind);

                String timeStr1 = timeString + " 03:00:00";
                Timestamp time1 = Timestamp.valueOf(timeStr1);
                String timeStr2 = timeString + " 06:00:00";
                Timestamp time2 = Timestamp.valueOf(timeStr2);
                String timeStr3 = timeString + " 09:00:00";
                Timestamp time3 = Timestamp.valueOf(timeStr3);
                String timeStr4 = timeString + " 12:00:00";
                Timestamp time4 = Timestamp.valueOf(timeStr4);
                String timeStr5 = timeString + " 15:00:00";
                Timestamp time5 = Timestamp.valueOf(timeStr5);
                String timeStr6 = timeString + " 18:00:00";
                Timestamp time6 = Timestamp.valueOf(timeStr6);
                String timeStr7 = timeString + " 21:00:00";
                Timestamp time7 = Timestamp.valueOf(timeStr7);

                List<Integer> dailySales = Arrays.asList(0, 0, 0, 0, 0, 0, 0, 0);
                List<String> eightHours = Arrays.asList("0-3时", "3-6时", "6-9时", "9-12时", "12-15时", "15-18时", "18-21时", "21-24时");
                for (int i = 0; i < dailyOrders.size(); i++) {
                    OneKindData temp = dailyOrders.get(i);
                    System.out.println(temp);
                    if ((temp.getTime().after(startTime) || temp.getTime().equals(startTime)) && temp.getTime().before(time1)) {
                        int number = dailySales.get(0) + temp.getNumber();
                        dailySales.set(0, number);
                    } else if ((temp.getTime().after(time1) || temp.getTime().equals(time1)) && temp.getTime().before(time2)) {
                        int number = dailySales.get(1) + temp.getNumber();
                        dailySales.set(1, number);
                    } else if ((temp.getTime().after(time2) || temp.getTime().equals(time2)) && temp.getTime().before(time3)) {
                        int number = dailySales.get(2) + temp.getNumber();
                        dailySales.set(2, number);
                    } else if ((temp.getTime().after(time3) || temp.getTime().equals(time3)) && temp.getTime().before(time4)) {
                        int number = dailySales.get(3) + temp.getNumber();
                        dailySales.set(3, number);
                    } else if ((temp.getTime().after(time4) || temp.getTime().equals(time4)) && temp.getTime().before(time5)) {
                        int number = dailySales.get(4) + temp.getNumber();
                        dailySales.set(4, number);
                    } else if ((temp.getTime().after(time5) || temp.getTime().equals(time5)) && temp.getTime().before(time6)) {
                        int number = dailySales.get(5) + temp.getNumber();
                        dailySales.set(5, number);
                    }
                    else if ((temp.getTime().after(time6) || temp.getTime().equals(time6)) && temp.getTime().before(time7)) {
                        int number = dailySales.get(6) + temp.getNumber();
                        dailySales.set(6, number);
                    } else {
                        int number = dailySales.get(7) + temp.getNumber();
                        dailySales.set(7, number);
                    }
                }
                salesData=editSalesData(eightHours,dailySales);
            }
        }
        return salesData;
    }

    @Override
    public int getShowIdByOrderId(int orderId){
        Orders order=ordersRepository.findFirstByOrderId(orderId);
        int ticketId=order.getTicketId();
        Ticket ticket=ticketRepository.findFirstByTicketId(ticketId);
        int showId=ticket.getShowId();
        return showId;
    }

    @Override
    public JsonArray getAllOrders(int orderId,int userId,int page){
        Page<Orders> tempOrders=ordersRepository.findAllOrdersByPage(orderId,userId,new PageRequest(page-1,10));
        List<Orders> orders=tempOrders.getContent();
        JsonArray orderData=new JsonArray();
        for (int i = 0; i < orders.size(); i++) {
            Orders temp=orders.get(i);
            int state=Integer.valueOf(temp.getState());
            if(state==0){
                temp.setState("待付款");
            }
            else if(state==1){
                temp.setState("已付款");
            }
            else if(state==2){
                temp.setState("退款申请中");
            }
            else if(state==3){
                temp.setState("退款失败");
            }
            else if(state==4){
                temp.setState("已退款");
            }
            else if(state==5){
                temp.setState("待评价");
            }
            else if(state==6){
                temp.setState("已评价");
            }
            Gson orderGson=new Gson();
            String orderJson = orderGson.toJson(temp);
            JsonObject orderObject = new JsonParser().parse(orderJson).getAsJsonObject();
            orderData.add(orderObject);
        }
        return orderData;
    }

    @Override
    public int getOriginNumber(int orderId,int userId){
        int number=ordersRepository.getOriginNumber(orderId,userId).size();
        return number;
    }
}
