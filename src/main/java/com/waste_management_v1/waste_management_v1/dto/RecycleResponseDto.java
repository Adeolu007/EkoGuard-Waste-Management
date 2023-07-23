package com.waste_management_v1.waste_management_v1.dto;

import com.waste_management_v1.waste_management_v1.entity.RecycleCategories;
import com.waste_management_v1.waste_management_v1.entity.Status;
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
public class RecycleResponseDto {
    private String pickupAddress;
    private String pickUpDate;
    private String location;
    private String pickUpDay;
    private int quantityOfBagsOrBins;
    private int binQuantity;
    private RecycleCategories categories;
    private Status status;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
}

