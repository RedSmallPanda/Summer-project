package com.sjtu.jpw.Repository;
import com.sjtu.jpw.Domain.User;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.Table;

@Repository
@Table(name="User")
@Qualifier("userRepository")
public interface UserRepository extends CrudRepository<User,Integer> {
    public User save(User u);

}
