package com.sjtu.jpw.Service;

import com.sjtu.jpw.Domain.User;

import java.util.List;

public interface UserService {
    List<User> Login(String username,String password);
    User UserInfo(Integer userId);
    User Register(User newUser);
    void updateInfo(User updateUser);
    Integer UsernameDuplicated(String username);
}
