package com.sjtu.jpw.Service;

import com.google.gson.JsonArray;
import com.sjtu.jpw.Domain.Sendingaddr;

import java.util.List;

public interface AddressService {
    JsonArray getAddress(Integer userId);
}
