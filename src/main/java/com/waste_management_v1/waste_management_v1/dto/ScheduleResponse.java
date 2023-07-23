package com.waste_management_v1.waste_management_v1.dto;

import com.waste_management_v1.waste_management_v1.entity.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleResponse {
    private ScheduleDto scheduleDto;
    private BinRequestDto binRequestDto;
    private RefLocationDto refLocationDto;
    private Status status;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private String  pickUpDate;

}
