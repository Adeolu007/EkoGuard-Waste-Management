package com.waste_management_v1.waste_management_v1.service;


import com.mashape.unirest.http.exceptions.UnirestException;
import com.waste_management_v1.waste_management_v1.dto.AuthResponse;
import com.waste_management_v1.waste_management_v1.dto.ProfileRegistrationDto;
import com.waste_management_v1.waste_management_v1.otp.OtpDto;
import org.springframework.http.ResponseEntity;

import java.io.IOException;

public interface AuthService {
    AuthResponse login(ProfileRegistrationDto profile);

    ResponseEntity<?> signup(ProfileRegistrationDto profile) throws UnirestException;

    ResponseEntity<?> verifyOtp(OtpDto otpDto) throws UnirestException;
}
