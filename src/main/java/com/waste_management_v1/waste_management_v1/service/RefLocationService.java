package com.waste_management_v1.waste_management_v1.service;

import com.waste_management_v1.waste_management_v1.dto.RefLocationDto;
import com.waste_management_v1.waste_management_v1.entity.RefLocation;

import java.util.List;

public interface RefLocationService {
    String addLocation(RefLocationDto refLocationDto);

    List<RefLocation> getAllLocations();
}
