package Jpwcrawler;

import Jpwcrawler.Domain.Shows;
import Jpwcrawler.Domain.User;
import Jpwcrawler.Domain.UserCoupon;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import java.util.List;
import java.util.Random;

public class userCouponGenerator {
    public static void main(String args[]){
        Configuration cfg = new Configuration();
        SessionFactory sf = cfg.configure().buildSessionFactory();
        Session session = sf.openSession();
        session.beginTransaction();
        List<User> users=(List<User>)session.createQuery("select user from User user").list();
        //   for(Shows show :shows){System.out.println(show.getShowId());}
        session.getTransaction().commit();
        session.close();
        sf.close();
        Random random=new Random();
        for(User user: users){
            int couponIdx=random.nextInt(8)+1;
            for(int i=0;i<3;i++) {
                UserCoupon userCoupon = new UserCoupon();
                userCoupon.setUserId(user.getUserId());
                userCoupon.setCouponId(couponIdx+i);
                userCoupon.setNumber(2);
                Configuration cfg1 = new Configuration();
                SessionFactory sf1 = cfg1.configure().buildSessionFactory();
                Session session1 = sf1.openSession();
                session1.beginTransaction();
                session1.save(userCoupon);
                session1.getTransaction().commit();
                session1.close();
                sf1.close();
            }
        }
    }
}
