package com.sjtu.jpw.Repository;
import com.sjtu.jpw.Domain.Admin;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.Table;
import java.util.List;

@Repository
@Table(name="Admin")
@Qualifier("adminRepository")
public interface AdminRepository extends CrudRepository<Admin,Integer> {
    public Admin save(Admin admin);

}