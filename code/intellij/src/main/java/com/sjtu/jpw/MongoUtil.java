package com.sjtu.jpw;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
import java.io.File;

import com.mongodb.*;
import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

public class MongoUtil {

    static int depth = 0;
    static String path = null;
    static List<String> list_all = new ArrayList<String>();

    private static List<String> printDirectory(File f, int depth) {
        if (f.isDirectory()) {
            File[] fs = f.listFiles();
            depth++;
            for (int i = 0; i < fs.length; ++i) {
                File file = fs[i];
                path = file.getPath();
                list_all.add(path);
                printDirectory(file, depth);
            }
        }
        return list_all;
    }

    /**
     * @Title: GetImageStrFromPath
     * @Description: TODO(将一张本地图片转化成Base64字符串)
     * @param imgPath
     * @return
     */
    public static String GetImageStrFromPath(String imgPath) {
        InputStream in = null;
        byte[] data = null;
        // 读取图片字节数组
        try {
            in = new FileInputStream(imgPath);
            data = new byte[in.available()];
            in.read(data);
            in.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        // 对字节数组Base64编码
        BASE64Encoder encoder = new BASE64Encoder();
        // 返回Base64编码过的字节数组字符串
        return encoder.encode(data);
    }

    /**
     * @Title: GenerateImage
     * @Description: TODO(base64字符串转化成图片)
     * @param imgStr
     * @return
     */
    public static boolean GenerateImage(String imgStr) {
        if (imgStr == null) // 图像数据为空
            return false;
        BASE64Decoder decoder = new BASE64Decoder();
        try {
            // Base64解码
            byte[] b = decoder.decodeBuffer(imgStr);
            for (int i = 0; i < b.length; ++i) {
                if (b[i] < 0) {// 调整异常数据
                    b[i] += 256;
                }
            }
            // 生成jpeg图片
            String imgFilePath = "";
            OutputStream out = new FileOutputStream(imgFilePath);
            out.write(b);
            out.flush();
            out.close();
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public static void main(String args[]){
        Mongo mongo = new Mongo("localhost",27017);
        DB db = mongo.getDB("test");
        DBCollection dbCollection = db.getCollection("image");

        File file = new File("D:\\SJTU\\2017-2018\\jpwimage");
        List<String> imgPaths = printDirectory(file,depth);
        System.out.println(imgPaths);
        for(int i = 0; i < imgPaths.size(); i++){
            String imgPath = imgPaths.get(i);
            String imgUrl = "data:image/jpeg;base64,"+GetImageStrFromPath(imgPath);
            int startIdx = imgPath.lastIndexOf("\\");
            int endIdx = imgPath.lastIndexOf(".");
            if(startIdx != -1 && endIdx != -1) {
                String title = imgPath.substring(startIdx + 1, endIdx);
                DBObject dbObject = new BasicDBObject();
                dbObject.put("imgUrl", imgUrl);
                dbObject.put("title", title);
                dbCollection.insert(dbObject);
            }
        }
    }
}
