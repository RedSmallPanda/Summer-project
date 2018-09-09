package Jpwcrawler;

import us.codecraft.webmagic.Spider;

import java.util.ArrayList;
import java.util.List;

public class SpiderRun {
    public static void main(String[] args) {
        String[] cities={"sh","bj","gz","sz","cd","cq","tj","hz","nj","wh","xa","cs","km"};
        String[] types={"concerts","dramas","exhibits","sports","musicale","family","dance","shows"};
        for(String city:cities){
            for(String type:types){
                Spider.create(new showsCrawler(city,type)).addUrl("https://www.piaoniu.com/"+city+"-"+type+"/hottest/p1").thread(5).run();
            }
        }
//        Spider.create(new showsCrawler("sh","concerts")).addUrl("https://www.piaoniu.com/sh-concerts/hottest/p1").thread(5).run();
//        Spider.create(new showsCrawler("sh","dramas")).addUrl("https://www.piaoniu.com/sh-dramas/hottest/p1").thread(1).run();
    }
}
