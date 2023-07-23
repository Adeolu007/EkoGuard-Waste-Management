package com.waste_management_v1.waste_management_v1.controller;

import com.mashape.unirest.http.exceptions.UnirestException;
import com.waste_management_v1.waste_management_v1.dto.AuthResponse;
import com.waste_management_v1.waste_management_v1.otp.OtpDto;
//import com.waste_management_v1.waste_management_v1.otp.OtpService;
import com.waste_management_v1.waste_management_v1.dto.ProfileRegistrationDto;
import com.waste_management_v1.waste_management_v1.repository.RoleRepository;
import com.waste_management_v1.waste_management_v1.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("api/v1/auth")
@AllArgsConstructor
public class AuthController {
    private AuthenticationManager authenticationManager;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private AuthService authService;


    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody ProfileRegistrationDto profile) throws UnirestException {
        return ResponseEntity.ok(authService.signup(profile));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody ProfileRegistrationDto profile) {
        return ResponseEntity.ok(authService.login(profile));
    }

    @PostMapping("logout")
    public String logout() {
        return "logout successful";
    }


}
