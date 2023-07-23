package com.waste_management_v1.waste_management_v1.service.serviceImpl;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.mashape.unirest.http.exceptions.UnirestException;
import com.waste_management_v1.waste_management_v1.dto.AuthResponse;
import com.waste_management_v1.waste_management_v1.dto.ProfileRegistrationDto;
import com.waste_management_v1.waste_management_v1.entity.ProfileEntity;
import com.waste_management_v1.waste_management_v1.entity.Roles;
import com.waste_management_v1.waste_management_v1.otp.OtpDto;
//import com.waste_management_v1.waste_management_v1.otp.OtpService;
import com.waste_management_v1.waste_management_v1.otp.OtpService1;
import com.waste_management_v1.waste_management_v1.repository.ProfileRepo;
import com.waste_management_v1.waste_management_v1.repository.RoleRepository;
import com.waste_management_v1.waste_management_v1.security.JwtTokenProvider;
import com.waste_management_v1.waste_management_v1.security.token.Token;
import com.waste_management_v1.waste_management_v1.security.token.TokenRepository;
import com.waste_management_v1.waste_management_v1.security.token.TokenType;
import com.waste_management_v1.waste_management_v1.service.AuthService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.regex.Pattern;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {
    private AuthenticationManager authenticationManager;
    private ProfileRepo profileRepo;
    private PasswordEncoder passwordEncoder;
    private JwtTokenProvider jwtTokenProvider;
    private RoleRepository roleRepository;
    private TokenRepository tokenRepository;
    private OtpService1 otpService;


    @Override
    public AuthResponse login(ProfileRegistrationDto profile) {
//        boolean exists = profileRepo.existsByPhoneNumberOrEmail(profile.getEmail(), profile.getPhoneNumber());
//        if (!exists) {
//            return null;
//        }
        ProfileEntity foundProfileEntity = profileRepo.findByEmailOrPhoneNumber(profile.getEmail(), profile.getPhoneNumber()).orElseThrow();

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(foundProfileEntity.getEmail(), profile.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        AuthResponse authResponse = new AuthResponse();
        authResponse.setToken(jwtTokenProvider.generateToken(authentication));
        revokeAllUserTokens(foundProfileEntity);
        saveUserToken(authentication, foundProfileEntity);
        return authResponse;
    }


    @Override
    public ResponseEntity<?> signup(ProfileRegistrationDto profile) throws UnirestException {
        if (profileRepo.existsByPhoneNumber(profile.getPhoneNumber())) {
            return new ResponseEntity<>("PhoneNumber is already taken", HttpStatus.BAD_REQUEST);
        }

        if (profileRepo.existsByEmail(profile.getEmail())) {
            return new ResponseEntity<>("Email is already taken", HttpStatus.BAD_REQUEST);
        }

        String phoneNumberRegex = "(^$|\\d{13})";//phone number accepts only 13 digits starting with 234
        if (!isInputValid(profile.getPhoneNumber(), phoneNumberRegex)) {
            return new ResponseEntity<>("Invalid Phone number", HttpStatus.BAD_REQUEST);
        }

        ProfileEntity profileEntity = ProfileEntity.builder()
                .email(profile.getEmail().toLowerCase())
                .phoneNumber(profile.getPhoneNumber())
                .password(passwordEncoder.encode(profile.getPassword()))
                .build();

        Roles role = roleRepository.findByRoleName("ROLE_USER").orElseThrow();
        profileEntity.setRoles(Collections.singleton(role));

        otpService.sendOtpTrial(profile.getPhoneNumber());

        profileRepo.save(profileEntity);

        return new ResponseEntity<>("User registered Successfully", HttpStatus.CREATED);
    }

    public ResponseEntity<?> verifyOtp(OtpDto otpDto) throws UnirestException {
        return ResponseEntity.ok(otpService.verifyOtp(otpDto));
    }

    private void saveUserToken(Authentication authentication, ProfileEntity foundProfileEntity) {
        var token = Token.builder()
                .profileEntity(foundProfileEntity)
                .token(jwtTokenProvider.generateToken(authentication))
                .tokenType(TokenType.BEARER)
                .revoked(false)
                .expired(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(ProfileEntity profileEntity) {
        var validUserTokens = tokenRepository.findAllValidTokensById(profileEntity.getId());
        if (validUserTokens.isEmpty()) {
            return;
        }
        validUserTokens.forEach(t -> {
            t.setExpired(true);
            t.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    //boolean for checking phone number
    private boolean isInputValid(String input, String regex) {
        return Pattern.compile(regex)
                .matcher(input)
                .matches();
    }
}
