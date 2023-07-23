package com.waste_management_v1.waste_management_v1.service.serviceImpl;

import com.waste_management_v1.waste_management_v1.dto.ScheduleHistoryDto;
import com.waste_management_v1.waste_management_v1.entity.ProfileEntity;
import com.waste_management_v1.waste_management_v1.entity.ScheduleHistory;
import com.waste_management_v1.waste_management_v1.repository.ProfileRepo;
import com.waste_management_v1.waste_management_v1.repository.ScheduleHistoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ScheduleHistoryService {
    private final ScheduleHistoryRepository scheduleHistoryRepository;
    private final ProfileRepo profileRepo;

    public List<ScheduleHistoryDto> getAllScheduleHistoryPerUser(Long id){
        ProfileEntity profile = profileRepo.findById(id).orElseThrow();
return profile.getScheduleHistoryList().stream().map(list->ScheduleHistoryDto.builder()
        .scheduleType(list.getScheduleType())
        .createdAt(list.getCreatedAt())
        .status(list.getStatus())
        .pickUpDate(list.getPickUpDate())
        .pickUpDay(list.getPickUpDay())
        .location(list.getLocation())
        .build()).collect(Collectors.toList());
    }
}
