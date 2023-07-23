package com.waste_management_v1.waste_management_v1.service;

import com.mashape.unirest.http.exceptions.UnirestException;
import com.waste_management_v1.waste_management_v1.dto.ProfileRegistrationDto;
import com.waste_management_v1.waste_management_v1.entity.ProfileEntity;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ProfileService {
    //    ResponseEntity<String> registerProfile (EarlyLoginDto earlyLoginDto);
    String deleteProfile(ProfileRegistrationDto profile);

    public ResponseEntity<String> updateProfile(ProfileRegistrationDto profile, Long id);

    List<ProfileEntity> getAllUser();
    ResponseEntity<String> resetPassword(String token, String password);

    ResponseEntity<String> changePassword(ProfileRegistrationDto profileRegistrationDto);

    public ResponseEntity<?> forgotPassword(ProfileRegistrationDto profileRegistrationDto) throws UnirestException;

    ProfileEntity getAUserDetail(String email, String phoneNumber);

    ResponseEntity<String> feedback(ProfileRegistrationDto profileRegistrationDto);

    ResponseEntity<String> recycleSubscriber(ProfileRegistrationDto profileRegistrationDto);
}
