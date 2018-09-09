package Jpwcrawler.hibernateUtil;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class Singlefactory {

    private static SessionFactory factory;
    // 静态初始化块，加载配置信息，获取SessionFactory
    static {
        // 读取hibernate.cfg.xml文件
        Configuration cfg = new Configuration().configure();
        // 建立SessionFactory
        factory = cfg.buildSessionFactory();
    }

    public static SessionFactory getSessionFactory() {
        return factory;
    }
}
