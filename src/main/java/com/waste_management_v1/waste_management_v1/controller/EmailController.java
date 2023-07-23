package com.waste_management_v1.waste_management_v1.controller;

import com.waste_management_v1.waste_management_v1.email.EmailEntity;
import com.waste_management_v1.waste_management_v1.email.EmailService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.List;

@RestController
@RequestMapping("api/v1/email")
@AllArgsConstructor
public class EmailController {
    private final EmailService emailService;

    @PostMapping("send/{id}")
    public String sendVerificationLink(@PathVariable(name = "id") Long id){
        return emailService.sendVerificationLink(id);
    }

    @GetMapping("verify/{token}")
    public RedirectView verifyEmail(@PathVariable(name = "token") String verificationToken) {
        return emailService.verifyEmail(verificationToken);
    }

    @GetMapping("verifyForForgotPassword/{token}")
    public ResponseEntity<?> verifyEmailForForgotPassword(@PathVariable(name = "token") String verificationToken) {
        return emailService.verifyEmailForForgotPassword(verificationToken);
    }

    @GetMapping("getAllEmailToken")
    public List<EmailEntity> getAllEmailToken(){
        return emailService.getAllEmailToken();
    }

}
