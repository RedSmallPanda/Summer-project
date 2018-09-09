package Jpwcrawler;

import Jpwcrawler.Domain.User;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import java.sql.Date;
import java.util.Random;

public class userGenerator {
    public static void main(String args[]){
        Random random=new Random();
        String[] genders={"男","女"};
        Date birthday=Date.valueOf("1998-01-01");
        String password="1";
        for(int i=1; i<=10000;i++){
            String username="user"+i;
            String gender=genders[random.nextInt(2)];
            String nickname="JpwFollower"+i;
            String phone="12345678901";
            String email=i+"@qq.com";
            String state="0";
            User user=new User();
            user.setUserId(i);
            user.setPassword(password);
            user.setGender(gender);
            user.setBirthday(birthday);
            user.setNickname(nickname);
            user.setPhone(phone);
            user.setEmail(email);
            user.setState(state);
            user.setUsername(username);
            Configuration cfg1 = new Configuration();
            SessionFactory sf1 = cfg1.configure().buildSessionFactory();
            Session session1 = sf1.openSession();
            session1.beginTransaction();
            session1.save(user);
            session1.getTransaction().commit();
            session1.close();
            sf1.close();
        }
    }
}
