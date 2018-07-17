package com.sjtu.jpw.Repository;
import com.sjtu.jpw.Domain.Sendingaddr;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.Table;

@Repository
@Table(name="Sendingaddr")
@Qualifier("sendingaddrRepository")
public interface SendingaddrRepository extends CrudRepository<Sendingaddr,Integer> {
    public Sendingaddr save(Sendingaddr sendingaddr);

}