package Jpwcrawler;


import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import us.codecraft.webmagic.Page;
import us.codecraft.webmagic.Site;
import us.codecraft.webmagic.Spider;
import us.codecraft.webmagic.processor.PageProcessor;

import com.google.gson.*;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

import Jpwcrawler.Domain.Shows;

import javax.persistence.criteria.CriteriaBuilder;

public class showsCrawler implements PageProcessor {

    public showsCrawler(String city, String type){
        this.city=city;
        this.type=type;

    }
    private String city;
    private String type;
    private
    Site site = Site.me().setRetryTimes(3).setSleepTime(200).setTimeOut(10000)
            .addHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36");

    @Override
    public void process(Page page)  {

        List<String> urls= new ArrayList<String>();
        if((page.getHtml().xpath("/html/body/div[2]/div[1]/div[@class='paging']/ul/li[@class='page selected']/a/text()").get())==null){return;}
        int pages=Integer.parseInt(page.getHtml().xpath("/html/body/div[2]/div[1]/div[@class='paging']/ul/li[@class='page selected']/a/text()").get());
        String city=this.city;
        String type=this.type;
        String totalpagesStr=page.getHtml().xpath("/html/body/div[2]/div[1]/div[@class='paging']/div[@class='total']/text()").get();
        int totalpages=Integer.parseInt(totalpagesStr.substring(1,totalpagesStr.length()-1));
        if(pages<totalpages-1) {
            urls.add("https://www.piaoniu.com/" + city + "-" + type + "/hottest/p" + (pages + 1) + "");
        }
        page.addTargetRequests(urls);
        //   page.putField("author", page.getUrl().regex("https://github\\.com/(\\w+)/.*").toString());
        //    page.putField("name", page.getHtml().xpath("/html/body/script[9]"));
        for(int i=1;i<=15;i++) {
            String title = page.getHtml().xpath("/html/body/div[2]/div[1]/div[4]/ul/li["+i+"]/a/@title").get();
            String address = page.getHtml().xpath("/html/body/div[2]/div[1]/div[4]/ul/li["+i+"]/div[@class='info']/a/text()").get();
            String rawRank = page.getHtml().xpath("/html/body/div[2]/div[1]/div[4]/ul/li["+i+"]/div[@class='info']/div[@class='rank']/span/text()").get();
            int rank;
            if (rawRank != null) {
                rank = Integer.parseInt(rawRank.substring(0, rawRank.indexOf('.')));
            } else {
                rank = 0;
            }

            String time = page.getHtml().xpath("/html/body/div[2]/div[1]/div[4]/ul/li["+i+"]/div[@class='info']/div[@class='time']/text()").get();
            Date startTime = null;
            Date endTime = null;
            if (time.equals("常年")) {
                startTime = Date.valueOf("2018-01-01");
                endTime = Date.valueOf("2018-12-31");
            } else if (time.indexOf('-') != -1) {

                String startStr = time.substring(0, time.indexOf('-')).replace(" ","");
                String endStr="";
                String pattern="\\d\\d\\.\\d\\d";
                String pattern2="\\d{4}\\.\\d{2}\\.\\d{2}";
                if(Pattern.matches(pattern,time.substring(time.indexOf('-') + 1).replace(" ",""))) // 2018.01.02 - 01.03
                {endStr = "2018." + time.substring(time.indexOf('-') + 1).replace(" ","");}
                else if(Pattern.matches(pattern2,time.substring(time.indexOf('-') + 1).replace(" ","")))  //2018.01.02 - 2020.01.01
                {
                    endStr=time.substring(time.indexOf('-') + 1).replace(" ","");
                }
                else {
                    startStr="2018-01-01";
                    endStr="2018-01-01";
                   }
                startTime = Date.valueOf(startStr.replace('.', '-'));
                endTime = Date.valueOf(endStr.replace('.', '-'));

            } else if (time.indexOf(':') != -1) {
                startTime = Date.valueOf(time.replace('.', '-').substring(0, time.indexOf(' ')));
                endTime = startTime;
            }
            else {
                String pattern="\\d{4}\\.\\d{2}\\.\\d{2}";
                if(Pattern.matches(pattern,time)) {
                    startTime = Date.valueOf(time.replace('.', '-'));
                    endTime = startTime;
                }
            }


            System.out.println("title: " + title + " address: " + address + " Rank: " + rank + "time: " + time + " sttime: " + startTime + "end time: " + endTime);

//        String venue = page.getHtml().xpath("/html/body/script[9]").get();
//        String jsonVenue = venue.substring(venue.indexOf('{'), venue.indexOf('}') + 1);
////            if (page.getResultItems().get("name") == null) {
////                //skip this page
////                page.setSkip(true);
////            }
////            System.out.println("json:  " + jsonVenue);
//
//        JsonObject venueObject = new JsonParser().parse(jsonVenue).getAsJsonObject();
////            System.out.println("id: " + venueObject.get("id").getAsString() + "  addr: " + venueObject.get("name").getAsString() + "(" + venueObject.get("address").getAsString() + ")");
//
            Shows shows = new Shows();
            shows.setAddress(address);
            shows.setCity(city);
            shows.setRate(rank);
            shows.setTitle(title);
            shows.setType(type);
            shows.setStarttime(startTime);
            shows.setEndtime(endTime);

            Configuration cfg = new Configuration();
            SessionFactory sf = cfg.configure().buildSessionFactory();
            Session session = sf.openSession();
            session.beginTransaction();
            session.save(shows);
            session.getTransaction().commit();
            session.close();
            sf.close();
        }


        // page.putField("readme", page.getHtml().xpath("//div[@id='readme']/tidyText()"));
        //      System.out.println(page.getResultItems().get("name"));
    }

    @Override
    public Site getSite() {
        return site;
    }

//    public static void main(String[] args) {
//        Spider.create(new showsCrawler()).addUrl("https://www.piaoniu.com/sh-concerts/hottest/p1").thread(1).run();
//    }
}

