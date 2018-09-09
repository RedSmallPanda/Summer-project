package Jpwcrawler;

import Jpwcrawler.Domain.Comment;
import Jpwcrawler.Domain.Shows;
import Jpwcrawler.hibernateUtil.Singlefactory;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import us.codecraft.webmagic.Page;
import us.codecraft.webmagic.Site;
import us.codecraft.webmagic.Spider;
import us.codecraft.webmagic.downloader.selenium.SeleniumDownloader;
import us.codecraft.webmagic.processor.PageProcessor;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class commentCrawler implements PageProcessor {

    public commentCrawler(String city ){
        this.city=city;

    }
    private String city;
    private
    Site site = Site.me().setRetryTimes(3).setSleepTime(200).setTimeOut(10000)
            .addHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36");
    @Override
    public void process(Page page)  {

        SessionFactory factory = Singlefactory.getSessionFactory();

        List<String> urls= new ArrayList<String>();
        String pagesStr=page.getHtml().xpath("/html/body/div[2]/div[1]/div[@class='paging']/ul/li[@class='page selected']/a/text()").get();
        String totalpagesStr=page.getHtml().xpath("/html/body/div[2]/div[1]/div[@class='paging']/div[@class='total']/text()").get();
        if(!(pagesStr==null|totalpagesStr==null)) {
            int pages = Integer.parseInt(pagesStr);
            int totalpages = Integer.parseInt(totalpagesStr.substring(1, totalpagesStr.length() - 1));
            if (pages < totalpages - 1) {
                for (int i = 1; i <= 15; i++) {
                    String showsUrl = page.getHtml().xpath("/html/body/div[2]/div[1]/div[4]/ul/li["+i+"]/a/@href").get();
                    urls.add(showsUrl+"/review");
                    System.out.println(showsUrl);
                }
                urls.add("https://www.piaoniu.com/" + city + "-"  + "all/hottest/p" + (pages + 1) + "");
            }
            page.addTargetRequests(urls);
        }
        else{
            String title=page.getHtml().xpath("/html/body/div[2]/div/a[3]/text()").get();
            int commentNum=0;
            List<String> commentList=page.getHtml().xpath("/html/body/div[3]/div[1]/div[2]/ul/li/text()").all();
            if(commentList!=null){ commentNum=commentList.size();}
            if(commentList!=null&&commentNum!=0){
                for(int i=1; i<commentNum+1; i++){
                    String timeStr=page.getHtml().xpath("/html/body/div[3]/div[1]/div[2]/ul/li["+i+"]/div/div[1]/div[@class='time']/text()").get()+" 00:00:00";
                    String content=page.getHtml().xpath("/html/body/div[3]/div[1]/div[2]/ul/li["+i+"]/div/a[@class='content']/text()").get();
                    if (content==null){content="";}
                    if(content.length()>50){content=content.substring(0,50);}
                    content.replace('\\',' ');



                    Session session = factory.openSession();
                    session.beginTransaction();
                    List<Shows>shows=(List<Shows>)session.createQuery("select show from Shows show where show.title=:name").setParameter("name",title).list();
                    //   for(Shows show :shows){System.out.println(show.getShowId());}
                    session.getTransaction().commit();
                    session.close();


                    if(shows.size()>0) {
                        int showid = shows.get(0).getShowId();
                        System.out.println("showid: " + showid + "  " + timeStr + " " + content);

                        Comment comment = new Comment();
                        Random random = new Random();
                        comment.setUsername("user" + (random.nextInt(10000) + 1));
                        comment.setParentId(-1);
                        comment.setContent(content);
                        comment.setRate(random.nextInt(4) + 7);
                        comment.setTime(Timestamp.valueOf(timeStr));
                        comment.setShowId(showid);

                        try {
                            Session session1 = factory.openSession();
                            session1.beginTransaction();
                            session1.save(comment);
                            session1.getTransaction().commit();
                            session1.close();
                        }
                        catch (Exception e){
                            comment.setContent("666");
                            Session session1 = factory.openSession();
                            session1.beginTransaction();
                            session1.save(comment);
                            session1.getTransaction().commit();
                            session1.close();
                        }

                    }

                }
            }

            }
        }



    @Override
    public Site getSite() {
        return site;
    }
    public static void main(String[] args) {
   //     System.setProperty("selenuim_config", "E:\\大二下暑假大作业\\jpwcrawler\\src\\main\\resources\\config.ini");
        String[] cities={"sh","bj","gz","sz","cd","cq","tj","hz","nj","wh","xa","cs","km"};
        for(String city:cities){
            Spider.create(new commentCrawler(city)).addUrl("https://www.piaoniu.com/"+city+"-"+"all/hottest/p1")
     //               .setDownloader(new SeleniumDownloader("E:\\chromedriver\\chromedriver.exe"))
                    .thread(5)
                    .run();
        }
    }
}
