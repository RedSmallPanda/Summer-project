package Jpwcrawler;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import us.codecraft.webmagic.Page;
import us.codecraft.webmagic.Site;
import us.codecraft.webmagic.Spider;
import us.codecraft.webmagic.downloader.selenium.SeleniumDownloader;
import us.codecraft.webmagic.processor.PageProcessor;

import com.google.gson.*;

import java.io.*;
import java.net.URL;
import java.net.URLConnection;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;
public class ticketCrawler implements PageProcessor{
    public ticketCrawler(String city ){
        this.city=city;

    }
    private String city;
    private
    Site site = Site.me().setRetryTimes(3).setSleepTime(200).setTimeOut(10000)
            .addHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36");
    @Override
    public void process(Page page)  {

        List<String> urls= new ArrayList<String>();
        String pagesStr=page.getHtml().xpath("/html/body/div[2]/div[1]/div[@class='paging']/ul/li[@class='page selected']/a/text()").get();
        String totalpagesStr=page.getHtml().xpath("/html/body/div[2]/div[1]/div[@class='paging']/div[@class='total']/text()").get();
        if(!(pagesStr==null|totalpagesStr==null)) {
            int pages = Integer.parseInt(pagesStr);
            int totalpages = Integer.parseInt(totalpagesStr.substring(1, totalpagesStr.length() - 1));
            if (pages < totalpages - 1) {
                for (int i = 1; i <= 15; i++) {
                    String showsUrl = page.getHtml().xpath("/html/body/div[2]/div[1]/div[4]/ul/li["+i+"]/a/@href").get();
                    urls.add(showsUrl);
                    System.out.println(showsUrl);
                }
                urls.add("https://www.piaoniu.com/" + city + "-"  + "all/hottest/p" + (pages + 1) + "");
            }
            page.addTargetRequests(urls);
        }
        else{
            if(page.getHtml().xpath("/html/body/div[@class='fancy-header headerbar']").get()!=null){
                String title=page.getHtml().xpath("/html/body/div[@class='base-info']/div[@class='container']/div[1]/div[1]/div[@class='title']/text()").get();
                String[] timeStr;
                String price;
                List<String> monthStrList=page.getHtml().xpath("/html/body/div[2]/div[2]/div[1]/div[3]/div/div[@class='events-picker row selections calendar-event-picker']/div[2]/div/div[1]/div[2]/ul/li/text()").all();
                System.out.println(monthStrList);
                System.out.println(title);
            }
        }


    }

    @Override
    public Site getSite() {
        return site;
    }
    public static void main(String[] args) {
        System.setProperty("selenuim_config", "E:\\大二下暑假大作业\\jpwcrawler\\src\\main\\resources\\config.ini");
        String[] cities={"sh","bj","gz","sz","cd","cq","tj","hz","nj","wh","xa","cs","km"};
        for(String city:cities){
                Spider.create(new ticketCrawler(city)).addUrl("https://www.piaoniu.com/"+city+"-"+"all/hottest/p1")
                        .setDownloader(new SeleniumDownloader("E:\\chromedriver\\chromedriver.exe"))
                        .thread(3)
                        .run();
        }
    }
}
