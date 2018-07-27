package com.sjtu.jpw.Domain.MongoDomain;

import com.mongodb.gridfs.GridFSDBFile;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

@Document(collection="avatar")
public class Avatar {

    private int userId;
    private GridFSDBFile avatar;

    @Id
    public int getUserId(){ return userId; }

    public void setUserId(int userId){ this.userId = userId; }

    public GridFSDBFile getAvatar(){ return avatar; }

    public void setAvatar(GridFSDBFile avatar){ this.avatar = avatar; }
}
