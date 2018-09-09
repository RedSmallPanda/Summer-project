package com.sjtu.jpw.Service;

import com.sjtu.jpw.Domain.User;

import java.util.List;

public interface UserService {
    List<User> login(String username,String password);
    User userInfo(Integer userId);
    User register(User newUser);
    Integer updateInfo(User updateUser);
    Integer usernameDuplicated(String username);
    List<User> allUsers();
    Boolean activate(String activate);
    User usernameMatchEmail(String username, String email);
    String getNicknameByUsername(String username);
}
