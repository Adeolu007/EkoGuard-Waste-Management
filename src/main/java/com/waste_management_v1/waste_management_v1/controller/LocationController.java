package com.waste_management_v1.waste_management_v1.controller;

import com.waste_management_v1.waste_management_v1.dto.RefLocationDto;
import com.waste_management_v1.waste_management_v1.entity.RefLocation;
import com.waste_management_v1.waste_management_v1.service.RefLocationService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.sql.Ref;
import java.util.List;

@RestController
@RequestMapping("api/v1/location")
@AllArgsConstructor
public class LocationController {
    private final RefLocationService refLocationService;
    @PostMapping("addLocation")
    public String addLocation(@RequestBody RefLocationDto refLocationDto) {
    return refLocationService.addLocation(refLocationDto);
    }

    @GetMapping("getAllLocations")
    public List<RefLocation> getAllLocations(){
        return refLocationService.getAllLocations();
    }

}
