package com.waste_management_v1.waste_management_v1.otp;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Builder
@Getter
public class OtpDto {
    private Long id;
    private String pin;
}
