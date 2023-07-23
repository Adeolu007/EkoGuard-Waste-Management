package com.waste_management_v1.waste_management_v1.controller;

import com.mashape.unirest.http.exceptions.UnirestException;
import com.waste_management_v1.waste_management_v1.dto.ProfileRegistrationDto;
import com.waste_management_v1.waste_management_v1.entity.ProfileEntity;
import com.waste_management_v1.waste_management_v1.service.ProfileService;
import io.swagger.v3.oas.annotations.ExternalDocumentation;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/profile")
@AllArgsConstructor
@OpenAPIDefinition(
        info = @Info(
                title = "Waste Management Application",
                description = "Waste Management Application REST APIs Documentation",
                version = "v1.0",
                contact = @Contact(
                        name = "EcoGuard",
                        email = "vivianafogu@gmail.com",
                        url = "https://github.com/vhee4/waste_management.git"
                ),
                license = @License(
                        name = "Apache 2.0",
                        url = "https://github.com/vhee4/waste_management.git"
                )
        ),
        externalDocs = @ExternalDocumentation(
                description = "Waste Management Application",
                url = "https://github.com/vhee4/waste_management.git"
        ))
public class ProfileController {
    private final ProfileService profileService;

    @PutMapping("deleted")
    public String deleteProfile(@RequestBody ProfileRegistrationDto profile) {
        return profileService.deleteProfile(profile);
    }

    @PutMapping("updated/{id}")
    public ResponseEntity<String> updateProfile(@RequestBody ProfileRegistrationDto profile, @PathVariable(name = "id") Long id) {
        return profileService.updateProfile(profile, id);
    }

    @GetMapping("changePassword")
    public ResponseEntity<String> changePassword(@RequestBody ProfileRegistrationDto profile) {
        return profileService.changePassword(profile);
    }

    @PutMapping("resetPassword")
    public ResponseEntity<String> resetPassword(@RequestParam(name = "token") String token,@RequestParam(name = "password") String password){
        return profileService.resetPassword(token, password);
    }


    @PostMapping("forgotPassword")
    public ResponseEntity<?> forgotPassword(@RequestBody ProfileRegistrationDto profile) throws UnirestException {
        return profileService.forgotPassword(profile);
    }

    @GetMapping("userdetails/{emailOrPhoneNumber}")
    ProfileEntity getAUserDetail(@PathVariable(name = "emailOrPhoneNumber") String email, @PathVariable(name = "emailOrPhoneNumber") String phoneNumber) {
        return profileService.getAUserDetail(email,phoneNumber);
    }


    @GetMapping
    public List<ProfileEntity> getAllUser() {
        return profileService.getAllUser();
    }

}
