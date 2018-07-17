package com.sjtu.jpw.Repository;
import com.sjtu.jpw.Domain.User;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.sql.Date;

import javax.persistence.Table;
import java.util.List;

@Repository
@Table(name="User")
@Qualifier("userRepository")
public interface UserRepository extends CrudRepository<User,Integer> {
    public User save(User u);
    public List<User> findAllByUsernameAndPassword(String username,String password);
    public  User findByUserId(Integer id);
    public List<User> findAllByUsername(String username);

    @Modifying
    @Query("update User user set user.gender=:gender,user.birthday=:birthday,user.nickname=:nickname,user.phone=:phone,user.email=:email")
    public void updateInfo(@Param("gender")String gender,@Param("birthday")Date birthday, @Param("nickname")String nickname,@Param("phone")String phone,@Param("email")String email);

}
