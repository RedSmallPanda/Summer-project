package com.sjtu.jpw.Repository;

import com.sjtu.jpw.Domain.ShowLocation;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.persistence.Table;
import java.util.List;

@Repository
@Table(name = "ShowLocation")
@Qualifier("showLocationRepository")
public interface ShowLocationRepository extends CrudRepository<ShowLocation, Integer> {

    public ShowLocation save(ShowLocation location);

    public List<ShowLocation> findAllByLocation(String location);

}
