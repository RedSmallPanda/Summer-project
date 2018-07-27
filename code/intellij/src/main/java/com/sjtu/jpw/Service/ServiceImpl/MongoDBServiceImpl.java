package com.sjtu.jpw.Service.ServiceImpl;

import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.Mongo;
import com.sjtu.jpw.Service.MongoDBService;
import org.springframework.stereotype.Service;

@Service("mongoDBService")
public class MongoDBServiceImpl implements MongoDBService{

    private Mongo mongo = new Mongo("localhost",27017);
    private DB db = mongo.getDB("test");

    public DBCollection getCollection(String CollectionName){
        return db.getCollection(CollectionName);
    }
}
