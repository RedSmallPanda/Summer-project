package com.sjtu.jpw.Service.ServiceImpl;

import com.sjtu.jpw.Domain.User;
import com.sjtu.jpw.Repository.UserRepository;
import com.sjtu.jpw.Service.demoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("demoService")
public class demoServiceImpl implements demoService {
    @Autowired
    private UserRepository userRepository;
    @Override
    public Integer userValidation(String username, String password) {
        List<User> user= userRepository.findAllByUsernameAndPassword(username,password);
        if(user.size()>0){return 1;}
        else return 0;
    }
}
