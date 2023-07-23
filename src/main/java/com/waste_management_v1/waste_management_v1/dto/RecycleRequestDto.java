package com.waste_management_v1.waste_management_v1.dto;

import com.waste_management_v1.waste_management_v1.entity.RecycleCategories;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RecycleRequestDto {
    private String pickupAddress;
    private String  pickUpDate;
    private boolean bag;
    private boolean bin;
    private int quantityOfBagsOrBins;
    private boolean requestStatus;
    private int binQuantity;
    private Long refLocationId;
    private Long profileId;
    private Long categoryId;
}
