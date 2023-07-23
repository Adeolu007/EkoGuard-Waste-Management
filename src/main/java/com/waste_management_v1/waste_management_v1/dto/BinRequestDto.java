package com.waste_management_v1.waste_management_v1.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BinRequestDto {
    private boolean requestStatus;
    private int binQuantity;
//    private double binPrice;

}
