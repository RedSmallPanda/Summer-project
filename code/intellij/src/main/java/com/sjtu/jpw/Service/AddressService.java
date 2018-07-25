package com.sjtu.jpw.Service;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.sjtu.jpw.Domain.Sendingaddr;

import java.util.List;

public interface AddressService {
    JsonArray getAddress(Integer userId);
    JsonArray getSplitAddress(Integer userId);
    void addAddress(Integer userId, Integer addrId, String name, String phone,
                    String province, String city, String block, String detail);
    void editAddress(Integer userId, Integer addrId, String name, String phone, String detail);
    void deleteAddress(Integer userId, Integer addrId);
}
