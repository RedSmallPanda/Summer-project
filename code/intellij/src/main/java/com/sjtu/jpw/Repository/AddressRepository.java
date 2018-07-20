package com.sjtu.jpw.Repository;
import com.sjtu.jpw.Domain.Sendingaddr;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.Table;
import java.util.List;

@Repository
@Table(name="Sendingaddr")
@Qualifier("addressRepository")
public interface AddressRepository extends CrudRepository<Sendingaddr,Integer> {
    public Sendingaddr save(Sendingaddr sendingaddr);

    public List<Sendingaddr> findAllByUserId(Integer userId);


}