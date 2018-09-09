package com.sjtu.jpw.Service;

import com.mongodb.DBCollection;

public interface MongoDBService {
    DBCollection getCollection(String CollectionName);
}
