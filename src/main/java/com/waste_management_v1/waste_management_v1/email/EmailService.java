package com.waste_management_v1.waste_management_v1.email;

import com.waste_management_v1.waste_management_v1.entity.ProfileEntity;
import com.waste_management_v1.waste_management_v1.repository.ProfileRepo;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.view.RedirectView;

import java.util.List;
import java.util.UUID;

@Component
@Slf4j
public class EmailService {
    private final JavaMailSender mailSender;
    private final ProfileRepo profileRepo;
    private final EmailRepository emailRepository;

    public EmailService(JavaMailSender mailSender, ProfileRepo profileRepo,EmailRepository emailRepository) {
        this.mailSender = mailSender;
        this.profileRepo = profileRepo;
        this.emailRepository = emailRepository;
    }

    @Value("${spring.mail.username}")
    private String senderEmail;

    public List<EmailEntity> getAllEmailToken(){
        return emailRepository.findAll();
    }


    public String sendVerificationLink(Long id) {
        // Generate a verification token
        String verificationToken = UUID.randomUUID().toString();

        // Save the verification token along with the user's ID in a database or cache
        ProfileEntity profile = profileRepo.findById(id).orElseThrow();
        log.info("Email found" + profile.getEmail());
        profile.setEmailVerificationToken(verificationToken);
        profile.setEmailVerificationStatus(false);
        profileRepo.save(profile);
        EmailEntity email = emailRepository.findByToken(verificationToken).orElseThrow();
        email.setEmail(profile.getEmail());
        email.setToken(verificationToken);
        emailRepository.save(email);

        // Compose the verification link with the token
        String verificationLink = "http://ecoguard.us-east-1.elasticbeanstalk.com/api/v1/email/verify/" + verificationToken;
        try {
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setFrom(senderEmail);
            simpleMailMessage.setTo(profile.getEmail());
            simpleMailMessage.setSubject("Email Verification");
            simpleMailMessage.setText("Please click the following link to verify your email: " + verificationLink);

            mailSender.send(simpleMailMessage);
            return "Mail sent successfully";
        } catch (MailException e) {
            throw new RuntimeException(e);
        }
    }
    public String sendVerificationLinkForForgotPassword(String email) {
        // Generate a verification token
        String verificationToken = UUID.randomUUID().toString();

        // Save the verification token along with the user's ID in a database or cache
        ProfileEntity profile = profileRepo.findByEmail(email).orElseThrow();
        log.info("Email found" + profile.getEmail());
        profile.setEmailVerificationToken(verificationToken);
        profile.setEmailVerificationStatus(false);
        profileRepo.save(profile);

        // Compose the verification link with the token
        String verificationLink = "http://ecoguard.us-east-1.elasticbeanstalk.com/api/v1/email/verifyForForgotPassword/" + verificationToken;
        try {
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setFrom(senderEmail);
            simpleMailMessage.setTo(email);
            simpleMailMessage.setSubject("Change Password");
            simpleMailMessage.setText("Please click the following link to change your password: " + verificationLink);

            mailSender.send(simpleMailMessage);
            EmailEntity email1= new EmailEntity();
            email1.setEmail(profile.getEmail());
            email1.setToken(verificationToken);
            emailRepository.save(email1);
            return "Mail sent successfully";
        } catch (MailException e) {
            throw new RuntimeException(e);
        }
    }

    public RedirectView verifyEmail(String verificationToken) {
        // Retrieve the user's ID based on the verification token from the database or cache
        ProfileEntity profile = profileRepo.findByEmailVerificationToken(verificationToken).orElseThrow();

        if (profile.getId() != null) {
            profile.setEmailVerificationStatus(true);
            profileRepo.save(profile);
            RedirectView redirectView = new RedirectView();
            redirectView.setUrl("http://localhost:3000/services");
            return redirectView; // Redirect to the success URL after email verification
        }

        // Create a RedirectView for the unsuccessful verification case
        RedirectView redirectView = new RedirectView();
        redirectView.setUrl("http://localhost:3000/auth/login");
        return redirectView; // Redirect to the unsuccessful URL
    }
    public ResponseEntity<?> verifyEmailForForgotPassword(String verificationToken) {
        // Retrieve the user's ID based on the verification token from the database or cache
        ProfileEntity profile = profileRepo.findByEmailVerificationToken(verificationToken).orElseThrow();

        if (profile.getId() != null) {
            profile.setEmailVerificationStatus(true);
            profileRepo.save(profile);
            RedirectView redirectView = new RedirectView();
            redirectView.setUrl("http://localhost:3000/reset-password");
            return new ResponseEntity<>(redirectView, HttpStatus.OK); // Redirect to the success URL after email verification
        }
        return new ResponseEntity<>("Unsuccessful",HttpStatus.BAD_REQUEST); // Redirect to the unsuccessful URL
    }
}

