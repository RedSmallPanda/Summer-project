package com.sjtu.jpw.Service.ServiceImpl;

import com.sjtu.jpw.Repository.ShowsRepository;
import com.sjtu.jpw.Service.ShowService;
import org.springframework.beans.factory.annotation.Autowired;
import com.sjtu.jpw.Domain.Shows;
import org.springframework.stereotype.Service;

@Service("showService")
public class ShowServiceImpl implements ShowService {
    @Autowired
    private ShowsRepository showsRepository;

    public void addShow(String title, String info, String city, String type, String address,
                        String startDate, String endDate){
        Shows show = new Shows();
        show.setTitle(title);
        show.setInfo(info);
        show.setCity(city);
        show.setType(type);
        show.setAddress(address);
        show.setRate(0);


        showsRepository.save(show);
    }
}
