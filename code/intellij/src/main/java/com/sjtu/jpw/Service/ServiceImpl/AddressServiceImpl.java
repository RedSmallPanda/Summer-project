package com.sjtu.jpw.Service.ServiceImpl;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.sjtu.jpw.Domain.Sendingaddr;

import com.sjtu.jpw.Repository.AddressRepository;
import com.sjtu.jpw.Service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.List;

@Service("addressService")
public class AddressServiceImpl implements AddressService {
    @Autowired
    private AddressRepository addressRepository;

    @Override
    public JsonArray getAddress(Integer userId){
        List<Sendingaddr> listData = addressRepository.findAllByUserId(userId);
        JsonArray addressResult = new JsonArray();
        Iterator<Sendingaddr> it = listData.iterator();
        while(it.hasNext()){
            Sendingaddr sendingaddr = it.next();
            String province = sendingaddr.getProvince();
            String city = sendingaddr.getCity();
            String block = sendingaddr.getBlock();
            String district = province != null ? (province + " " + city + " " + block)
                    : (city + " " + block);
            JsonObject addressObject = new JsonObject();
            addressObject.addProperty("key",sendingaddr.getAddrId());
            addressObject.addProperty("name",sendingaddr.getName());
            addressObject.addProperty("phone",sendingaddr.getPhone());
            addressObject.addProperty("city",district);
            addressObject.addProperty("detail",sendingaddr.getAddrdetail());
            addressResult.add(addressObject);
        }
        return addressResult;
    }

    @Override
    public void addAddress(Integer userId, Integer addrId, String name, String phone,
                           String province, String city, String block, String detail){
        Sendingaddr sendingaddr = new Sendingaddr();
        sendingaddr.setUserId(userId);
        sendingaddr.setAddrId(addrId);
        sendingaddr.setName(name);
        sendingaddr.setPhone(phone);
        sendingaddr.setProvince(province);
        sendingaddr.setCity(city);
        sendingaddr.setBlock(block);
        sendingaddr.setAddrdetail(detail);
        addressRepository.save(sendingaddr);
    }

    @Override
    public void editAddress(Integer userId, Integer addrId, String name, String phone, String detail){
        Sendingaddr sendingaddr = new Sendingaddr();
        sendingaddr.setUserId(userId);
        sendingaddr.setAddrId(addrId);
        sendingaddr.setName(name);
        sendingaddr.setPhone(phone);
        sendingaddr.setAddrdetail(detail);
        addressRepository.save(sendingaddr);
    }

    @Override
    public void deleteAddress(Integer userId, Integer addrId){
        addressRepository.deleteAllByUserIdAndAddrId(userId, addrId);
    }
}
