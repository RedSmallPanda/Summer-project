package com.sjtu.jpw.Repository;
import com.sjtu.jpw.Domain.User;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.persistence.Table;
import java.util.List;

@Repository
@Table(name="User")
@Qualifier("userRepository")
public interface UserRepository extends CrudRepository<User,Integer> {
    public User save(User u);
    public List<User> findAllByUsername(String username);

    @Modifying
    @Query("update User user set user.password=:password where user.userId=:userId")
    public void updatePassword(@Param("password")String password,@Param("userId") int id);


}
