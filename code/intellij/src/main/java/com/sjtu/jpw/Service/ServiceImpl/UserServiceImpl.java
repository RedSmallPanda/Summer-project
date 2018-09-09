package com.sjtu.jpw.Service.ServiceImpl;

import com.sjtu.jpw.Domain.User;
import com.sjtu.jpw.Repository.UserRepository;
import com.sjtu.jpw.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("userService")
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> login(String username, String password) {
        List<User> toLogin = userRepository.findAllByUsernameAndPassword(username, password);
        //deal with deleted users
        if (toLogin.size() != 0) {
            if (toLogin.get(0).getState().equals("1")) {
                toLogin.clear();
            }
        }
        return toLogin;
    }

    @Override
    public User userInfo(Integer userId) {
        return userRepository.findByUserId(userId);
    }

    @Override
    public User register(User newUser) {
        if(usernameDuplicated(newUser.getUsername())==0){
            return userRepository.save(newUser);
        }
        else return null;
    }

    @Override
    public Integer updateInfo(User updateUser) {
        return userRepository.updateInfo(
                updateUser.getPassword(),
                updateUser.getGender(),
                updateUser.getBirthday(),
                updateUser.getNickname(),
                updateUser.getPhone(),
                updateUser.getEmail(),
                updateUser.getState(),
                updateUser.getUserId()
        );
    }

    @Override
    public Integer usernameDuplicated(String username) {
        List<User> users= userRepository.findAllByUsername(username);
        if(users.size()>0){return 1;}
        else return 0;
    }

    @Override
    public List<User> allUsers(){
        return userRepository.findAll();
    }

    @Override
    public Boolean activate(String activate){
        Integer activated = userRepository.activate(activate);
        if (activated > 1) {
            System.out.println("activate multiple accounts.");
        }
        return activated > 0;
    }

    @Override
    public User usernameMatchEmail(String username, String email){
        User toReset = userRepository.findByUsername(username);
        if (toReset != null && toReset.getEmail().equals(email)) {
            return toReset;
        } else {
            return null;
        }
    }

    @Override
    public String getNicknameByUsername(String username){
        return userRepository.findByUsername(username).getNickname();
    }
}
