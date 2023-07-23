package com.waste_management_v1.waste_management_v1.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
    public class SchedulePickupRequest {
        private ScheduleDto scheduleDto;
        private BinRequestDto binRequestDto;
        private Long refLocationId;
//        private Long id;

        // Constructors, getters, and setters
    }

