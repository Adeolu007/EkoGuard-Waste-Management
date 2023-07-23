package com.waste_management_v1.waste_management_v1.service;

import com.waste_management_v1.waste_management_v1.dto.*;
import com.waste_management_v1.waste_management_v1.entity.ScheduleEntityForWasteDisposal;
import com.waste_management_v1.waste_management_v1.entity.Status;

import java.util.List;


public interface ScheduleServiceForWaste {
    String schedulePickUpForWaste(ScheduleDto scheduleDto,BinRequestDto binRequestDto,Long refLocationId,Long id);
    Status statusUpdated(StatusDto statusDto,Long id);
    String updateSchedulePickUpForWaste(ScheduleDto scheduleDto, BinRequestDto binRequestDto, Long refLocationId, Long id, Long scheduleId);
    public List<ScheduleResponse> GetAllSchedulesForOneWasteUser(Long id);

    public ScheduleEntityForWasteDisposal GetAScheduleForOneWasteUser(Long scheduleId, Long userId);
}
