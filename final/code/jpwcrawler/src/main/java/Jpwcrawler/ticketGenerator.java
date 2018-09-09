package Jpwcrawler;

import Jpwcrawler.Domain.Shows;
import Jpwcrawler.Domain.Ticket;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import us.codecraft.webmagic.Spider;
import us.codecraft.webmagic.downloader.selenium.SeleniumDownloader;

import java.sql.Timestamp;
import java.text.ParseException;
import java.util.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Random;

public class ticketGenerator {
    private static List<Date> getBetweenDates(Date start, Date end) {
        List<Date> result = new ArrayList<Date>();
        Calendar tempStart = Calendar.getInstance();
        tempStart.setTime(start);

        Calendar tempEnd = Calendar.getInstance();
        tempEnd.setTime(end);
        tempEnd.add(Calendar.DAY_OF_YEAR, 1);
        while (tempStart.before(tempEnd)) {
            result.add(tempStart.getTime());
            tempStart.add(Calendar.DAY_OF_YEAR, 1);
        }
        return result;
    }
    public static void main(String[] args) {
        String[] seatinfo={"A座","B座","C座","D座","E座","F座","G座","H座","I座","J座","K座","L座","M座","N座","O座","P座","Q座","R座","S座","T座","U座","V座","W座","X座","Y座","Z座"};
        SimpleDateFormat format1=new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat format2=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        List<Shows> shows=new ArrayList<Shows>();


        Configuration cfg = new Configuration();
        SessionFactory sf = cfg.configure().buildSessionFactory();
        Session session = sf.openSession();
        session.beginTransaction();
        shows=(List<Shows>)session.createQuery("select show from Shows show").list();
     //   for(Shows show :shows){System.out.println(show.getShowId());}
        session.getTransaction().commit();
        session.close();
        sf.close();


        for (Shows show:shows){
            int showid=show.getShowId();
            Date starttime=null;
            Date endtime=null;
            try {
                starttime=format1.parse(format1.format(show.getStarttime()));
                endtime=format1.parse(format1.format(show.getEndtime()));
            } catch (ParseException e) {
                e.printStackTrace();
            }

     //       System.out.println(starttime+" "+endtime);
            String[] times={"19:00:00","16:00:00","14:00:00","08:00:00","10:00:00"};
            int[] prices={60,80,90,110,180,150,280,190,210,380,390,420,440,460,490,520,580,546,600,700,900,1200,1000,999,888,666};


            List<Date> dates=getBetweenDates(starttime,endtime);
//            System.out.println(show.getShowId()+" "+dates.size());

            if(dates.size()>10){
                Random random=new Random();
                for(int i=0;i<20&&i<dates.size();i++){
                    String tickettimeStr = format1.format(dates.get(i)) + " " + times[random.nextInt(times.length)];
                    Timestamp time = Timestamp.valueOf(tickettimeStr);
                    int price = prices[random.nextInt(prices.length)];
                    int stock=random.nextInt(500);
                    String seat = "";
                    System.out.println("cao"+show.getShowId() + " " + tickettimeStr + " " + time + " " + price + " " + stock + " " + seat);


                    Ticket ticket = new Ticket();
                    ticket.setShowId(showid);
                    ticket.setTime(time);
                    ticket.setPrice(price);
                    ticket.setSeat(seat);
                    ticket.setStock(stock);
                    ticket.setAmount(stock);
                    Configuration cfg1 = new Configuration();
                    SessionFactory sf1 = cfg1.configure().buildSessionFactory();
                    Session session1 = sf1.openSession();
                    session1.beginTransaction();
                    session1.save(ticket);
                    session1.getTransaction().commit();
                    session1.close();
                    sf1.close();
                }
            }
            else {
                Random random=new Random();
                int timeIdx1=random.nextInt(times.length);
                int priceIdx1=random.nextInt(prices.length-4);
                int priceIdx2=priceIdx1+random.nextInt(3);
                for (Date i : dates) {
                    for (int j = 0; j <= timeIdx1; j++) {
                        for (int k = priceIdx1; k <= priceIdx2; k++) {
                            String tickettimeStr = format1.format(i) + " " + times[j];
                            Timestamp time = Timestamp.valueOf(tickettimeStr);
                            int price = prices[k];
                            int stock = random.nextInt(500);
                            String seat = seatinfo[k - priceIdx1];
                            System.out.println("fuck"+show.getShowId() + " " + tickettimeStr + " " + time + " " + price + " " + stock + " " + seat);

                            Ticket ticket = new Ticket();
                            ticket.setShowId(showid);
                            ticket.setTime(time);
                            ticket.setPrice(price);
                            ticket.setSeat(seat);
                            ticket.setStock(stock);
                            ticket.setAmount(stock);
                            Configuration cfg1 = new Configuration();
                            SessionFactory sf1 = cfg1.configure().buildSessionFactory();
                            Session session1 = sf1.openSession();
                            session1.beginTransaction();
                            session1.save(ticket);
                            session1.getTransaction().commit();
                            session1.close();
                            sf1.close();


                        }
                    }
                }
            }
        }

    }
}
