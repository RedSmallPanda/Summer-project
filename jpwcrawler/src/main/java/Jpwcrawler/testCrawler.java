package Jpwcrawler;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import us.codecraft.webmagic.Page;
import us.codecraft.webmagic.downloader.selenium.SeleniumDownloader;
import us.codecraft.webmagic.Site;
import us.codecraft.webmagic.Spider;
import us.codecraft.webmagic.processor.PageProcessor;

import com.google.gson.*;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

import Jpwcrawler.Domain.ShowLocation;

public class testCrawler implements PageProcessor{
    private
    Site site = Site.me().setRetryTimes(3).setSleepTime(200).setTimeOut(1000)
            .addHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36");

    @Override
    public void process(Page page) {

        List<String> urls= new ArrayList<String>();
        urls.add("https://www.piaoniu.com/activity/42540");
        page.addTargetRequests(urls);
        String pagesStr=page.getHtml().xpath("/html/body/div[2]/div[1]/div[@class='paging']/ul/li[@class='page selected']/a/text()").get();
        String totalpagesStr=page.getHtml().xpath("/html/body/div[2]/div[1]/div[@class='paging']/div[@class='total']/text()").get();

        List<String> monthStrList=page.getHtml().xpath("/html/body/div[2]/div[2]/div[1]/div[3]/div/div[@class='events-picker row selections calendar-event-picker']/div[2]/div/div[1]/div[2]/ul/li/text()").all();

        List<String> daysStrList=page.getHtml().xpath("/html/body/div[2]/div[2]/div[1]/div[3]/div/div[@class='events-picker row selections calendar-event-picker']/div[2]/div/div[2]/table/tbody/tr/td[@class='ui-calendar-date ui-calendar-available ui-calendar-date-default has-ticket has-event']/text()" +
                "|/html/body/div[2]/div[2]/div[1]/div[3]/div/div[@class='events-picker row selections calendar-event-picker']/div[2]/div/div[2]/table/tbody/tr/td[@class='ui-calendar-date ui-calendar-available has-ticket has-event']/text()" +
                "|/html/body/div[2]/div[2]/div[1]/div[3]/div/div[@class='events-picker row selections calendar-event-picker']/div[2]/div/div[2]/table/tbody/tr/td[@class='ui-calendar-date ui-calendar-available selected has-ticket has-event']/text()").all();

        List<String> timesStrlist=page.getHtml().xpath("/html/body/div[2]/div[2]/div[1]/div[3]/div/div[@class='eventtime-picker row selections']/div[2]/div/text()").all();

        List<String> priceList=page.getHtml().xpath("/html/body/div[2]/div[2]/div[1]/div[3]/div/div[@class='ticket-category row selections']/div[2]/div/text()").all();

        List<String> dateStrList=new ArrayList<String>();
        for(String i:monthStrList){
            for(String j:daysStrList){
                if(j.length()==1){dateStrList.add(i+"0"+j);}
                else {dateStrList.add(i+j);}
            }
        }
        List<String> datetimeStrList=new ArrayList<String>();
        for(String i : timesStrlist){
            String pattern="\\d\\d\\:\\d\\d";
            if(Pattern.matches(pattern,i)){datetimeStrList.add(i);}
           // else{datetimeStrList.add()}
        }

        List<String> timestampStrList =new ArrayList<String>();
        for(String i:dateStrList){
            for(String j:datetimeStrList){
                timestampStrList.add(i+j);
            }
        }

        System.out.println(daysStrList);
        System.out.println(timesStrlist);
        System.out.println(priceList);
        System.out.println(timestampStrList);

//        if(pagesStr==""){System.out.println("空字符串");}
//        if(pagesStr==null){System.out.println("null");}
//        if(pagesStr.equals("")){System.out.println("空字符串 equal");}

    }

    @Override
    public Site getSite() {
        return site;
    }

    public static void main(String[] args) {
        System.setProperty("selenuim_config", "E:\\大二下暑假大作业\\jpwcrawler\\src\\main\\resources\\config.ini");
        Spider.create(new testCrawler())
                .addUrl("https://www.piaoniu.com/activity/42540")
                .setDownloader(new SeleniumDownloader("E:\\chromedriver\\chromedriver.exe"))
                .runAsync();
    }
}
