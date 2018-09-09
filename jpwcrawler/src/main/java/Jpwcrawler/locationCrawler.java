package Jpwcrawler;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import us.codecraft.webmagic.Page;
import us.codecraft.webmagic.Site;
import us.codecraft.webmagic.Spider;
import us.codecraft.webmagic.processor.PageProcessor;

import com.google.gson.*;
import java.util.ArrayList;
import java.util.List;
import Jpwcrawler.Domain.ShowLocation;

public class locationCrawler implements PageProcessor {

    private
    Site site = Site.me().setRetryTimes(3).setSleepTime(200).setTimeOut(10000)
              .addHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36");

    @Override
    public void process(Page page) {

        List<String> urls= new ArrayList<String>();
        for(int i=1;i<=5400;i++) {
            urls.add("https://www.piaoniu.com/venue/" + i + "");
        }
            page.addTargetRequests(urls);
            //   page.putField("author", page.getUrl().regex("https://github\\.com/(\\w+)/.*").toString());
        //    page.putField("name", page.getHtml().xpath("/html/body/script[9]"));
            String venue = page.getHtml().xpath("/html/body/script[9]").get();
            String jsonVenue = venue.substring(venue.indexOf('{'), venue.indexOf('}') + 1);
//            if (page.getResultItems().get("name") == null) {
//                //skip this page
//                page.setSkip(true);
//            }
//            System.out.println("json:  " + jsonVenue);

            JsonObject venueObject = new JsonParser().parse(jsonVenue).getAsJsonObject();
//            System.out.println("id: " + venueObject.get("id").getAsString() + "  addr: " + venueObject.get("name").getAsString() + "(" + venueObject.get("address").getAsString() + ")");

//            int id =venueObject.get("id").getAsInt();
//            if(id<5440){ urls.add("https://www.piaoniu.com/venue/" + (id+1) + ""); page.addTargetRequests(urls);}
            ShowLocation location = new ShowLocation();
            try{
                location.setLocation(venueObject.get("name").getAsString());
                location.setLatitude(venueObject.get("latitudeBd").getAsDouble());
                location.setLongitude(venueObject.get("longitudeBd").getAsDouble());
            }
            catch (java.lang.UnsupportedOperationException e){
                location.setLocation(venueObject.get("name").getAsString());
                location.setLongitude(0.0);
                location.setLatitude(0.0);

            }
            Configuration cfg = new Configuration();
            SessionFactory sf = cfg.configure().buildSessionFactory();
            Session session = sf.openSession();
            session.beginTransaction();
            session.save(location);
            session.getTransaction().commit();
            session.close();
            sf.close();



        // page.putField("readme", page.getHtml().xpath("//div[@id='readme']/tidyText()"));
  //      System.out.println(page.getResultItems().get("name"));
    }

    @Override
    public Site getSite() {
        return site;
    }

    public static void main(String[] args) {
        Spider.create(new locationCrawler()).addUrl("https://www.piaoniu.com/venue/1").thread(5).run();
    }
}