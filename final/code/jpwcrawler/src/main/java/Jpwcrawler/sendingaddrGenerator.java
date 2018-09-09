package Jpwcrawler;

import Jpwcrawler.Domain.Sendingaddr;
import Jpwcrawler.Domain.Shows;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import java.util.List;
import java.util.Random;

public class sendingaddrGenerator {
    public static void main(String [] arg){

        Random random=new Random();
        String[] blocks={"黄浦区","徐汇区","长宁区","静安区","普陀区","虹口区","杨浦区"};
        for(int i=1;i<=10000;i++){
            Sendingaddr sendingaddr=new Sendingaddr();
            sendingaddr.setUserId(i);
            sendingaddr.setAddrId(1);
            sendingaddr.setProvince("上海市");
            sendingaddr.setCity("上海市");
            sendingaddr.setBlock(blocks[random.nextInt(7)]);
            sendingaddr.setAddrdetail(" ");
            sendingaddr.setPhone("12345678901");
            sendingaddr.setName("Jpwfollower"+i);

            Configuration cfg = new Configuration();
            SessionFactory sf = cfg.configure().buildSessionFactory();
            Session session = sf.openSession();
            session.beginTransaction();
            session.save(sendingaddr);
            session.getTransaction().commit();
            session.close();
            sf.close();
        }
    }
}
