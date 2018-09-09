package Jpwcrawler;

import Jpwcrawler.Domain.Orders;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import java.sql.Timestamp;
import java.util.Random;

public class orderGenerator {

    public static void main(String args[]){
        String[] blocks={"黄浦区","徐汇区","长宁区","静安区","普陀区","虹口区","杨浦区"};
        Random random=new Random();

        for(int i=1;i<10000;i++) {
            int num=random.nextInt(10)+1;
            String state=""+(random.nextInt(5)+1);
            int price=random.nextInt(500)+10;
            String province = "上海市";
            String city = "上海市";
            String block = blocks[random.nextInt(7)];
            String addrdetail = " ";
            String phone = "12345678901";
            String name = "Jpwfollower"+i;
            int totalprice=price*num;
            for(int j=0;j<=7;j++) {
                String time = "2018-0" + (random.nextInt(8) + 1) + "-" + (random.nextInt(17) + 10) + " 08:" + (random.nextInt(30) + 10) + ":" + (random.nextInt(30) + 10);
                Orders orders=new Orders();
                orders.setTicketId(random.nextInt(80000)+1);
                orders.setUserId(i);
                orders.setNumber(num);
                orders.setState(state);
                orders.setTime(Timestamp.valueOf(time));
                orders.setPrice(price);
                orders.setPhone(phone);
                orders.setProvince(province);
                orders.setCity(city);
                orders.setBlock(block);
                orders.setAddrdetail(addrdetail);
                orders.setName(name);
                orders.setTotalPrice(totalprice);

                Configuration cfg = new Configuration();
                SessionFactory sf = cfg.configure().buildSessionFactory();
                Session session = sf.openSession();
                session.beginTransaction();
                session.save(orders);
                session.getTransaction().commit();
                session.close();
                sf.close();
            }

        }
    }
}
