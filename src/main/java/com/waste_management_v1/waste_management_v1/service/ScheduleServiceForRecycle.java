package com.waste_management_v1.waste_management_v1.service;

import com.waste_management_v1.waste_management_v1.dto.*;
import com.waste_management_v1.waste_management_v1.entity.Status;

import java.util.List;

public interface ScheduleServiceForRecycle {
    String schedulePickUpForRecycle(RecycleRequestDto recycleRequestDto,Long id,Long categoryId);
    Status statusUpdated(StatusDto statusDto, Long id);
    String updateSchedulePickUpForRecycle(RecycleRequestDto recycleRequestDto, Long scheduleId,Long categoryId);
    public List<RecycleResponseDto> GetAllSchedulesForOneRecycleUser(Long id);
}
