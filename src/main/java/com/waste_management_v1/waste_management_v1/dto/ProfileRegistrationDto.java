package com.waste_management_v1.waste_management_v1.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProfileRegistrationDto {
    private String firstName;
    private String lastName;
    private String otherName;
    private String gender;
    private String address;
    private String email;
    private String phoneNumber;
    private String password;
    private String feedback;
}
