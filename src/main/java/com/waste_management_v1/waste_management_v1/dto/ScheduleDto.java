package com.waste_management_v1.waste_management_v1.dto;


import com.waste_management_v1.waste_management_v1.entity.BinRequest;
import com.waste_management_v1.waste_management_v1.entity.RefLocation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleDto {
    private String pickupAddress;
//    private LocalDateTime pickUpDate;
//    private int quantity;//this is for recycling


}
