package com.sjtu.jpw.Repository;
import com.sjtu.jpw.Domain.ShopCart;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.Table;
import javax.persistence.criteria.CriteriaBuilder;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Table(name="ShopCart")
@Qualifier("shopCartRepository")
public interface ShopCartRepository extends CrudRepository<ShopCart,Integer> {
    public ShopCart save(ShopCart shopCart);

    public List<ShopCart> findAllByUserIdAndTicketId(Integer userId,Integer ticketId);

    @Transactional
    public void deleteAllByUserId(Integer userId);
    @Transactional
    public void deleteByUserIdAndTicketId(Integer userId,Integer ticketId);


}