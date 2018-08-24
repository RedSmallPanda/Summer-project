package com.sjtu.jpw.Service.ServiceImpl;

import com.sjtu.jpw.Domain.ShowLocation;
import com.sjtu.jpw.Repository.ShowLocationRepository;
import com.sjtu.jpw.Service.ShowLocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("showLocationService")
public class ShowLocationServiceImpl implements ShowLocationService {

    @Autowired
    private ShowLocationRepository showLocationRepository;

    @Override
    public List<ShowLocation> getLocation(String location) {
        return showLocationRepository.findAllByLocation(location);
    }
}
