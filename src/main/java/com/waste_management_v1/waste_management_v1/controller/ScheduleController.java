package com.waste_management_v1.waste_management_v1.controller;

import com.waste_management_v1.waste_management_v1.dto.*;
import com.waste_management_v1.waste_management_v1.entity.ScheduleEntityForWasteDisposal;
import com.waste_management_v1.waste_management_v1.entity.ScheduleHistory;
import com.waste_management_v1.waste_management_v1.entity.Status;
import com.waste_management_v1.waste_management_v1.service.ScheduleServiceForRecycle;
import com.waste_management_v1.waste_management_v1.service.ScheduleServiceForWaste;
import com.waste_management_v1.waste_management_v1.service.serviceImpl.ScheduleHistoryService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/schedule")

public class ScheduleController {

    private final ScheduleServiceForWaste scheduleServiceForWaste;
    private final ScheduleServiceForRecycle scheduleServiceForRecycle;
    private final ScheduleHistoryService scheduleHistoryService;

    public ScheduleController(ScheduleServiceForWaste scheduleServiceForWaste, ScheduleServiceForRecycle scheduleServiceForRecycle, ScheduleHistoryService scheduleHistoryService) {
        this.scheduleServiceForWaste = scheduleServiceForWaste;
        this.scheduleServiceForRecycle = scheduleServiceForRecycle;
        this.scheduleHistoryService = scheduleHistoryService;
    }

    @PostMapping("waste/pickUp/{id}")
    public String SchedulePickup(@RequestBody SchedulePickupRequest request, @PathVariable(name = "id") Long id) {
        return scheduleServiceForWaste.schedulePickUpForWaste(
                request.getScheduleDto(),
                request.getBinRequestDto(),
                request.getRefLocationId(),
                id
        );
    }

    @PutMapping("waste/updateStatus/{id}")
    public Status statusUpdatedForWaste(@RequestBody StatusDto statusDto, @PathVariable(name = "id") Long id) {
        return scheduleServiceForWaste.statusUpdated(statusDto, id);
    }

    @PutMapping("waste/updateSchedule/{id}/{scheduleId}")
    public String updateSchedulePickUp(@RequestBody SchedulePickupRequest request, @PathVariable(name = "id") Long id, @PathVariable(name = "scheduleId") Long scheduleId) {
        return scheduleServiceForWaste.updateSchedulePickUpForWaste(
                request.getScheduleDto(),
                request.getBinRequestDto(),
                request.getRefLocationId(),
                id,
                scheduleId
        );
    }

    @GetMapping("waste/getAllSchedulesForAUser/{id}")
    public List<ScheduleResponse> GetAllSchedules(@PathVariable(name = "id") Long id) {
        return scheduleServiceForWaste.GetAllSchedulesForOneWasteUser(id);
    }
    @GetMapping("waste/getAScheduleForAUser/{scheduleId}/{userId}")
    public ScheduleEntityForWasteDisposal GetAScheduleForAUser(@PathVariable(name = "scheduleId") Long scheduleId,@PathVariable(name = "userId") Long userId) {
        return scheduleServiceForWaste.GetAScheduleForOneWasteUser(scheduleId,userId);
    }

    @PostMapping("recycle/pickUp/{id}/{category}")
    public String schedulePickUpForRecycle(@RequestBody RecycleRequestDto recycleRequestDto, @PathVariable(name = "id") Long id, @PathVariable(name = "category") Long categoryId) {
        return scheduleServiceForRecycle.schedulePickUpForRecycle(recycleRequestDto, id, categoryId);
    }

    @PostMapping("recycle/updateSchedule/{id}")
    public String updateSchedulePickUpForRecycle(@RequestBody RecycleRequestDto recycleRequestDto, @PathVariable(name = "id") Long scheduleId, Long categoryId) {
        return scheduleServiceForRecycle.updateSchedulePickUpForRecycle(recycleRequestDto, scheduleId, categoryId);
    }

    @PostMapping("recycle/updateStatus/{id}")
    public Status statusUpdatedForRecycling(@RequestBody StatusDto statusDto, @PathVariable(name = "id") Long id) {
        return scheduleServiceForRecycle.statusUpdated(statusDto, id);
    }

    @GetMapping("recycle/getAllSchedulesForAUser/{id}")
    public List<RecycleResponseDto> GetAllSchedulesForOneRecycleUser(@PathVariable(name = "id") Long id) {
        return scheduleServiceForRecycle.GetAllSchedulesForOneRecycleUser(id);
    }

    @GetMapping("{id}")
    public List<ScheduleHistoryDto> getAllScheduleHistoryPerUser(@PathVariable(name = "id") Long id) {
        return scheduleHistoryService.getAllScheduleHistoryPerUser(id);
    }


}
