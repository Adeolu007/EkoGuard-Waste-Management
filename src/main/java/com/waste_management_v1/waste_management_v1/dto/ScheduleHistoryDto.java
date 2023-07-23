package com.waste_management_v1.waste_management_v1.dto;

import com.waste_management_v1.waste_management_v1.entity.Status;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class ScheduleHistoryDto {
    private LocalDateTime createdAt;
    private String pickUpDate;
    private Status status;
    private String pickUpDay;
    private String location;
    private String scheduleType;
}
