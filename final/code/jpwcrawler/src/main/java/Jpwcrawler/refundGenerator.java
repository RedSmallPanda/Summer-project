package Jpwcrawler;

import Jpwcrawler.Domain.Orders;
import Jpwcrawler.Domain.Refund;
import Jpwcrawler.Domain.User;
import com.sun.jna.platform.win32.Sspi;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.hibernate.criterion.Order;

import java.sql.Timestamp;
import java.util.List;
import java.util.Random;

public class refundGenerator {
    public static void main(String [] args){
        Configuration cfg = new Configuration();
        SessionFactory sf = cfg.configure().buildSessionFactory();
        Session session = sf.openSession();
        session.beginTransaction();
        List<Integer> ordersId=(List<Integer>)session.createQuery("select orders.orderId from Orders orders where state=:state").setParameter("state","2").list();
        List<Timestamp> timestamps=(List<Timestamp>)session.createQuery("select orders.time from Orders orders where state=:state").setParameter("state","2").list();
        //   for(Shows show :shows){System.out.println(show.getShowId());}
        session.getTransaction().commit();
        session.close();
        sf.close();

        Random random=new Random();
        String [] reasonss={"没钱了","买错票了","买多了","买错时间了","买错座位了","我就是要退啊啊啊"};
        for(int i=0;i<ordersId.size();i++){
            Refund refund=new Refund();
            refund.setOrderId(ordersId.get(i));
            refund.setState("2");
            refund.setRefundTime(timestamps.get(i));
            refund.setReason(reasonss[random.nextInt(6)]);

            Configuration cfg1 = new Configuration();
            SessionFactory sf1 = cfg1.configure().buildSessionFactory();
            Session session1 = sf1.openSession();
            session1.beginTransaction();
            session1.save(refund);
            session1.getTransaction().commit();
            session1.close();
            sf1.close();
        }
    }
}
