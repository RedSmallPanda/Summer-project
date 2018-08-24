package com.sjtu.jpw.Service;

import com.sjtu.jpw.Domain.ShowLocation;

import java.util.List;

public interface ShowLocationService {
    List<ShowLocation> getLocation(String location);
}
