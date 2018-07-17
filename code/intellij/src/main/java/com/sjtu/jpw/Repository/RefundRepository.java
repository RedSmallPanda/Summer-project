package com.sjtu.jpw.Repository;
import com.sjtu.jpw.Domain.Refund;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.Table;

@Repository
@Table(name="Refund")
@Qualifier("refundRepository")
public interface RefundRepository extends CrudRepository<Refund,Integer> {
    public Refund save(Refund refund);

}