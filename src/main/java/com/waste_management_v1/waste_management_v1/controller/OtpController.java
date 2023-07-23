package com.waste_management_v1.waste_management_v1.controller;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.exceptions.UnirestException;
import com.waste_management_v1.waste_management_v1.otp.OtpDto;
import com.waste_management_v1.waste_management_v1.otp.OtpEntity;
import com.waste_management_v1.waste_management_v1.otp.OtpService1;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/otp")
@AllArgsConstructor
public class OtpController {
    public final OtpService1 otpService;

    @GetMapping("getAllOtp")
    public List<OtpEntity> GetAllOtp() {
        return otpService.GetAllOtps();
    }

    @PostMapping("/verifyOtp")
    public HttpResponse<String> verifyOtp(@RequestBody OtpDto otpDto) throws UnirestException {
        return otpService.verifyOtp(otpDto);
    }

    @PostMapping("sendOtp/{phoneNumber}")
    public HttpResponse<String> sendOtp(@PathVariable(name = "phoneNumber") String phoneNumber) throws UnirestException {
        return otpService.sendOtpTrial(phoneNumber);
    }

}
