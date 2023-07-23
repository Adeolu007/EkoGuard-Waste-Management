package com.waste_management_v1.waste_management_v1.otp;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import lombok.AllArgsConstructor;
import org.json.JSONObject;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@JsonDeserialize
public class OtpService1 {

    private final OtpRepository otpRepository;

    public OtpService1(OtpRepository otpRepository) {
        this.otpRepository = otpRepository;
    }

    public final String apiKey = "TLRbAQAJQwKjZNFNW0y0vkbaUKjmXyfRkMKzBbOn1BDq3P2KAfRkB0fkboF3BA";
    public final String apiUrl = "https://api.ng.termii.com/api/sms/otp/send";

    //    Unirest.setTimeouts(0, 0);
    public HttpResponse<String> sendOtpTrial(String phoneNumber) throws UnirestException {
        String requestBody = String.format("""
                {\r
                       "api_key" : "%s",\r
                       "message_type" : "ALPHANUMERIC",\r
                       "to" : "%s",\r
                       "from" : "EcoGuard",\r
                       "channel" : "generic",\r
                       "pin_attempts" : 4,\r
                       "pin_time_to_live" :  60,\r
                       "pin_length" : 4,\r
                       "pin_placeholder" : "< 1234 >",\r
                       "message_text" : "Your pin is < 1234 >",\r
                       "pin_type" : "NUMERIC"\r
                   }\r
                     \s""", apiKey, phoneNumber);

        HttpResponse<String> response = Unirest.post(apiUrl)
                .header("Content-Type", "application/json")
                .body(requestBody).asString();

        JSONObject sendResponseJson = new JSONObject(response.getBody());
        String pinId = sendResponseJson.getString("pinId");
        String to = sendResponseJson.getString("to");
        String smsStatus = sendResponseJson.getString("smsStatus");
        OtpEntity sentOtp = OtpEntity.builder()
                .pinId(pinId)
                .destinationNumber(to)
                .smsStatus(smsStatus)
                .build();
        otpRepository.save(sentOtp);
        if (response.getStatus() == 200) {
            return response;
        } else {
            throw new RuntimeException("Failed to send OTP. Status code: " + response.getStatus());
        }
    }

    @Bean
    public MappingJackson2HttpMessageConverter mappingJackson2HttpMessageConverter() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter(mapper);
        return converter;
    }

    public HttpResponse<String> verifyOtp(OtpDto otpDto) throws UnirestException {
        String apiUrl = "https://api.ng.termii.com/api/sms/otp/verify";
        OtpEntity otp = otpRepository.findById(otpDto.getId()).orElseThrow();
        String sentOtpId = otp.getPinId();
        String requestBody = String.format("""
                {\r
                "api_key" : "%s",\r
                "pin_id" : "%s",\r
                "pin" : "%s" \r
                }""", apiKey, sentOtpId, otpDto.getPin());

        HttpResponse<String> response = Unirest.post(apiUrl)
                .header("Content-Type", "application/json")
                .body(requestBody)
                .asString();

        if (response.getStatus() == 200) {
            otp.setVerificationStatus("verified");
            return response;
        } else {
            otp.setVerificationStatus("Invalid");
            throw new RuntimeException("Invalid Otp: " + response.getStatus());
        }

    }

    public List<OtpEntity> GetAllOtps() {
        List<OtpEntity> otp = otpRepository.findAll();
        return otp;
//        return otp.stream().map(list -> OtpDto.builder()
//                .id(list.getId())
//                .pin(list.getPinId())
//                .build()).collect(Collectors.toList());
    }
}
