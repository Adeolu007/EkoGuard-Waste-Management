package com.waste_management_v1.waste_management_v1.service.serviceImpl;

import com.waste_management_v1.waste_management_v1.dto.RefLocationDto;
import com.waste_management_v1.waste_management_v1.entity.RefLocation;
import com.waste_management_v1.waste_management_v1.repository.RefLocationRepository;
import com.waste_management_v1.waste_management_v1.service.RefLocationService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class RefLocationServiceImpl implements RefLocationService {
    private final RefLocationRepository refLocationRepository;

    @Override
    public String addLocation(RefLocationDto refLocationDto) {
        RefLocation Location = RefLocation.builder()
                .location(refLocationDto.getLocation())
                .pickUpDay(refLocationDto.getPickUpDay())
                .build();
        refLocationRepository.save(Location);
        return "Location added";
    }

    @Override
    public List<RefLocation> getAllLocations() {
        return refLocationRepository.findAll();
    }
}
