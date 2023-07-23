package com.waste_management_v1.waste_management_v1.dto;

import com.waste_management_v1.waste_management_v1.entity.RefLocation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RefLocationDto {
     private String location;
     private String pickUpDay;


}
