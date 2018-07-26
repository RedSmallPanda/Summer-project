package com.sjtu.jpw.Service;

import com.sjtu.jpw.Domain.User;

import java.util.List;

public interface UserService {
    List<User> login(String username,String password);
    User userInfo(Integer userId);
    User register(User newUser);
    void updateInfo(User updateUser);
    Integer UsernameDuplicated(String username);
    List<User> allUsers();
}
