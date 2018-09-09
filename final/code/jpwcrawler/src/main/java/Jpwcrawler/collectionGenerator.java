package Jpwcrawler;

import Jpwcrawler.Domain.Collection;
import Jpwcrawler.Domain.User;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import java.util.List;
import java.util.Random;

public class collectionGenerator {
    public static  void main(String[] args){

        for(int j=1;j<=10000;j++){
                Random random=new Random();
                int showIdx=random.nextInt(8590);
                for(int i=0;i<=7;i++){
                    Collection collection=new Collection();
                    collection.setUserId(j);
                    collection.setShowId(showIdx+i);
                    Configuration cfg1 = new Configuration();
                    SessionFactory sf1 = cfg1.configure().buildSessionFactory();
                    Session session1 = sf1.openSession();
                    session1.beginTransaction();
                   session1.save(collection);
                    session1.getTransaction().commit();
                    session1.close();
                    sf1.close();
                }

        }
    }
}
