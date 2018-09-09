package Jpwcrawler;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import us.codecraft.webmagic.Page;
import us.codecraft.webmagic.Site;
import us.codecraft.webmagic.Spider;
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

import Jpwcrawler.Domain.Shows;
public class ImgCrawler implements PageProcessor{
    public ImgCrawler(String city, String type){
        this.city=city;
        this.type=type;

    }
    private String city;
    private String type;
    private
    Site site = Site.me().setRetryTimes(3).setSleepTime(200).setTimeOut(10000)
            .addHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36");
    public static InputStream inStream = null;
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
            String
            imgUrl=page.getHtml().xpath("/html/body/div[2]/div[1]/div[4]/ul/li["+i+"]/a/img/@src").get();
            String dataSrc=page.getHtml().xpath("/html/body/div[2]/div[1]/div[4]/ul/li["+i+"]/a/img/@data-src").get();
            if(dataSrc!=""){imgUrl=dataSrc;}
            try {
                URL url = new URL(imgUrl);
                URLConnection con = url.openConnection();
                inStream = con.getInputStream();
                ByteArrayOutputStream outStream = new ByteArrayOutputStream();
                byte[] buf = new byte[1024];
                int len = 0;
                while((len = inStream.read(buf)) != -1){
                    outStream.write(buf,0,len);
                }
                inStream.close();
                outStream.close();
                File file = new File("E://jpwImg//"+title+".jpg");	//图片下载地址
                FileOutputStream op = new FileOutputStream(file);
                op.write(outStream.toByteArray());
                op.close();
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }

            System.out.println("title: "+title+" imgurl: "+imgUrl);
        }


        // page.putField("readme", page.getHtml().xpath("//div[@id='readme']/tidyText()"));
        //      System.out.println(page.getResultItems().get("name"));
    }

    @Override
    public Site getSite() {
        return site;
    }
    public static void main(String[] args) {
        String[] cities={"sh","bj","gz","sz","cd","cq","tj","hz","nj","wh","xa","cs","km"};
        String[] types={"concerts","dramas","exhibits","sports","musicale","family","dance","shows"};
        for(String city:cities){
            for(String type:types){
                Spider.create(new ImgCrawler(city,type)).addUrl("https://www.piaoniu.com/"+city+"-"+type+"/hottest/p1").thread(5).run();
            }
        }
    }
}
