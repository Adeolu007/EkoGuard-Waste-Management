package com.waste_management_v1.waste_management_v1.service.serviceImpl;

import com.mashape.unirest.http.exceptions.UnirestException;
import com.waste_management_v1.waste_management_v1.dto.ProfileRegistrationDto;
import com.waste_management_v1.waste_management_v1.email.EmailEntity;
import com.waste_management_v1.waste_management_v1.email.EmailRepository;
import com.waste_management_v1.waste_management_v1.email.EmailService;
import com.waste_management_v1.waste_management_v1.entity.ProfileEntity;
import com.waste_management_v1.waste_management_v1.otp.OtpRepository;
//import com.waste_management_v1.waste_management_v1.otp.OtpService;
import com.waste_management_v1.waste_management_v1.otp.OtpService1;
import com.waste_management_v1.waste_management_v1.repository.ProfileRepo;
import com.waste_management_v1.waste_management_v1.service.ProfileService;
import com.waste_management_v1.waste_management_v1.utils.ResponseUtils;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProfileServiceImpl implements ProfileService {
    private ProfileRepo profileRepo;
    private OtpService1 otpService;
    private OtpRepository otpRepository;
    private EmailService emailService;
    private EmailRepository emailRepository;

    @Override
    public String deleteProfile(ProfileRegistrationDto profile) {
        if (profileRepo.existsByEmail(profile.getEmail())) {
            ProfileEntity profileEntity = profileRepo.findByEmail(profile.getEmail()).orElseThrow();
            profileEntity.setDeleted(true);
            profileRepo.save(profileEntity);
            return "Deleted";
        }
        return "Profile is unavailable";
    }

    @Override
    public ResponseEntity<String> updateProfile(ProfileRegistrationDto profile, Long id) {
        if (!profileRepo.existsById(id)) {
            return new ResponseEntity<>(ResponseUtils.USER_NOT_FOUND_MESSAGE, HttpStatus.NOT_FOUND);
        }
        ProfileEntity profileEntity = profileRepo.findById(id).orElseThrow();
        profileEntity.setFirstName(profile.getFirstName());
        profileEntity.setLastName(profile.getLastName());
        profileEntity.setOtherName(profile.getOtherName());
        profileEntity.setGender(profile.getGender());
        profileEntity.setAddress(profile.getAddress());
        profileRepo.save(profileEntity);
        return new ResponseEntity<>(ResponseUtils.SUCCESS_CODE, HttpStatus.CREATED);
    }

    @Override
    public List<ProfileEntity> getAllUser() {
        return profileRepo.findAll();
    }

    public ProfileEntity getAUserDetail(String email, String phoneNumber) {
        ProfileEntity profile = profileRepo.findByEmailOrPhoneNumber(email, phoneNumber).orElseThrow();
        profile = ProfileEntity.builder()
                .id(profile.getId())
                .phoneNumber(profile.getPhoneNumber())
                .email(profile.getEmail())
                .address(profile.getAddress())
                .emailVerificationStatus(profile.isEmailVerificationStatus())
                .firstName(profile.getFirstName())
                .lastName(profile.getLastName())
                .otherName(profile.getOtherName())
                .gender(profile.getGender())
                .build();
        return profile;
    }

    @Override
    public ResponseEntity<String> changePassword(ProfileRegistrationDto profileRegistrationDto) {
        ProfileEntity profile = profileRepo.findByEmailOrPhoneNumber(profileRegistrationDto.getEmail(), profileRegistrationDto.getPhoneNumber()).orElseThrow();
        profile.setPassword(profileRegistrationDto.getPassword());
        profileRepo.save(profile);
        return new ResponseEntity<>("Password changed successfully", HttpStatus.OK);
    }
    @Override
    public ResponseEntity<String> resetPassword(String token, String password) {
        if (token == null) {
            return ResponseEntity.badRequest().body("Invalid token");}
        EmailEntity email = emailRepository.findByToken(token).orElseThrow();
        if (email == null) {
            return ResponseEntity.badRequest().body("Invalid token");
        }
        ProfileEntity profile = profileRepo.findByEmail(email.getEmail()).orElseThrow();
        profile.setPassword(password);
        profileRepo.save(profile);
        return new ResponseEntity<>("Password reset successful", HttpStatus.OK);
    }

    public ResponseEntity<?> forgotPassword(ProfileRegistrationDto profileRegistrationDto) throws UnirestException {
        ProfileEntity profile = profileRepo.findByEmailOrPhoneNumber(profileRegistrationDto.getEmail(), profileRegistrationDto.getPhoneNumber()).orElseThrow();
        if (profile.getEmail().equals(profileRegistrationDto.getEmail())) {
            emailService.sendVerificationLinkForForgotPassword(profileRegistrationDto.getEmail());
            return new ResponseEntity<>("Email sent", HttpStatus.OK);
        } else if (profile.getPhoneNumber().equals(profileRegistrationDto.getPhoneNumber())) {
            otpService.sendOtpTrial(profileRegistrationDto.getPhoneNumber());
            return new ResponseEntity<>("Otp sent", HttpStatus.OK);

        } else {
            return new ResponseEntity<>("Email not found", HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public ResponseEntity<String> feedback(ProfileRegistrationDto profileRegistrationDto) {
        ProfileEntity profile = profileRepo.findByEmail(profileRegistrationDto.getEmail()).orElseThrow();
        profile.setFeedback(profileRegistrationDto.getFeedback());
        profileRepo.save(profile);
        return new ResponseEntity<>("Thank you for the feedback, our team will get back to you.", HttpStatus.OK);
    }

    @Override
    public ResponseEntity<String> recycleSubscriber(ProfileRegistrationDto profileRegistrationDto) {
        if (profileRepo.existsByEmail(profileRegistrationDto.getEmail())) {
            ProfileEntity profileEntity = profileRepo.findByEmail(profileRegistrationDto.getEmail()).orElseThrow();
            profileEntity.setRecycle(true);
            profileRepo.save(profileEntity);
            return new ResponseEntity<>("You have successfully subscribed to our recycle plan", HttpStatus.OK);
        }
        return new ResponseEntity<>("Unable to subscribe", HttpStatus.NOT_FOUND);
    }

}
