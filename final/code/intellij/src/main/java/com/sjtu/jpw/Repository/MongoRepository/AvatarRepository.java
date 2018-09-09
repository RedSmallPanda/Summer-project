package com.sjtu.jpw.Repository.MongoRepository;

import com.sjtu.jpw.Domain.MongoDomain.Avatar;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AvatarRepository extends MongoRepository<Avatar, Integer>{
    Avatar findAvatarByUserId(int userId);
    Avatar save(Avatar avatar);
}
