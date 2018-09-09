package com.sjtu.jpw.Repository;
import com.sjtu.jpw.Domain.User;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;

import javax.persistence.Table;
import java.util.List;

@Repository
@Table(name="User")
@Qualifier("userRepository")
public interface UserRepository extends CrudRepository<User,Integer> {
    public User save(User u);

    //todo: findALL or find one?
    public List<User> findAllByUsernameAndPassword(String username, String password);

    public User findByUserId(Integer id);

    public User findByUsername(String username);

    public List<User> findAllByUsername(String username);

    //    @Query(value = "select user from User user")
    public List<User> findAll();

    @Transactional        //待定
    @Modifying
    @Query(value = "update User user set user.password=:password,user.gender=:gender," +
            "user.birthday=:birthday,user.nickname=:nickname,user.phone=:phone," +
            "user.email=:email, user.state=:state where user.userId=:userId")
    public Integer updateInfo(
            @Param("password") String password,
            @Param("gender") String gender,
            @Param("birthday") Date birthday,
            @Param("nickname") String nickname,
            @Param("phone") String phone,
            @Param("email") String email,
            @Param("state") String state,
            @Param("userId") Integer userId
    );

    @Transactional
    @Modifying
    @Query("update User user set user.state='0' " +
            "where user.activate=:activate and user.state='3'")
    public Integer activate(
            @Param("activate") String activate
    );

}
