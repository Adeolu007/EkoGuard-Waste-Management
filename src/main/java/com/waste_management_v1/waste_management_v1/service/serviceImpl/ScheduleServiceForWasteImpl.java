package com.waste_management_v1.waste_management_v1.service.serviceImpl;

import com.waste_management_v1.waste_management_v1.dto.*;
import com.waste_management_v1.waste_management_v1.entity.*;
import com.waste_management_v1.waste_management_v1.repository.*;
import com.waste_management_v1.waste_management_v1.service.ScheduleServiceForWaste;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.Arrays.stream;

@Service
@AllArgsConstructor
@Slf4j
public class ScheduleServiceForWasteImpl implements ScheduleServiceForWaste {
    private final ScheduleRepositoryForWaste scheduleRepositoryForWaste;
    private final BinRequestRepository binRequestRepository;
    private final RefLocationRepository refLocationRepository;
    private final ProfileRepo profileRepo;
    private final ScheduleHistoryRepository scheduleHistoryRepository;

    @Override
    public String schedulePickUpForWaste(ScheduleDto scheduleDto, BinRequestDto binRequestDto, Long refLocationId, Long id) {
        ProfileEntity loggedInUser = profileRepo.findById(id).orElseThrow();
        if (binRequestDto == null) {
            return "BinRequestDto is missing";
        }

        // Create a new BinRequest using the retrieved bin size
//        double binPrice = 50000.0;
        BinRequest binRequest = null;
        if (binRequestDto.isRequestStatus()) {
            binRequest = BinRequest.builder()
                    .profileEntity(loggedInUser)
                    .requestStatus(binRequestDto.isRequestStatus())
                    .binQuantity(binRequestDto.getBinQuantity())
                    .build();
//            binRequest.setBinPrice(binRequestDto.getBinQuantity()*binPrice);
            binRequestRepository.save(binRequest);
        }

        // Check if the specified location exists
        boolean isLocationExists = refLocationRepository.existsById(refLocationId);
        if (!isLocationExists) {
            return "Location not available";
        }

        // Retrieve the RefLocation based on the location value in RefLocationDto
        RefLocation refLocation = refLocationRepository.findById(refLocationId).orElseThrow();

        // Create a new ScheduleEntity and set the required fields
        ScheduleEntityForWasteDisposal schedule = ScheduleEntityForWasteDisposal.builder()
                .profileEntity(loggedInUser)
                .pickupAddress(scheduleDto.getPickupAddress())
                .status(Status.PENDING)
                .binRequest(binRequest)
                .refLocation(refLocation)
                .build();
//        double monthlySubscriptionPrice = 5500.0;
//        if(binRequest == null && !loggedInUser.isSubscriptionStatus()){
//            loggedInUser.setSubscriptionStatus(true);
//            loggedInUser.setPrice(monthlySubscriptionPrice);
//            loggedInUser.setStartDate(schedule.getCreatedAt());
//            loggedInUser.setExpiryDate(LocalDate.now().plusDays(20));
//        }

        scheduleRepositoryForWaste.save(schedule);

        ScheduleHistory history = ScheduleHistory.builder()
                .scheduleType("Waste Disposal")
                .createdAt(schedule.getCreatedAt())
                .pickUpDate(schedule.getPickUpDate())
                .status(schedule.getStatus())
                .pickUpDay(schedule.getRefLocation().getPickUpDay())
                .location(schedule.getRefLocation().getLocation())
                .build();
        scheduleHistoryRepository.save(history);


        return "Schedule successful";
    }

    @Override
    public String updateSchedulePickUpForWaste(ScheduleDto scheduleDto, BinRequestDto binRequestDto, Long refLocationId, Long id, Long scheduleId) {
        ProfileEntity loggedInUser = profileRepo.findById(id).orElseThrow();
        if (binRequestDto == null) {
            return "BinRequestDto is missing";
        }


        // Create a new BinRequest using the retrieved bin size
        BinRequest binRequest = null;
        if (binRequestDto.isRequestStatus()) {
            binRequest = BinRequest.builder()
                    .profileEntity(loggedInUser)
                    .requestStatus(binRequestDto.isRequestStatus())
                    .binQuantity(binRequestDto.getBinQuantity())
                    .build();
            binRequestRepository.save(binRequest);
        }

        // Check if the specified location exists
        boolean isLocationExists = refLocationRepository.existsById(id);
        if (!isLocationExists) {
            return "Location not available";
        }

        // Retrieve the RefLocation based on the location value in RefLocationDto
        RefLocation refLocation = refLocationRepository.findById(refLocationId).orElseThrow();

        // Create a new ScheduleEntity and set the required fields
        ScheduleEntityForWasteDisposal schedule = scheduleRepositoryForWaste.findById(scheduleId).orElseThrow();

        LocalDateTime currentDateTime = LocalDateTime.now();
        LocalDateTime scheduledDateTime = schedule.getCreatedAt();

        long minutesElapsed = scheduledDateTime.until(currentDateTime, ChronoUnit.MINUTES);
        if (minutesElapsed <= 60) {
            schedule.setProfileEntity(loggedInUser);
            schedule.setPickupAddress(scheduleDto.getPickupAddress());
            schedule.setBinRequest(binRequest);
            schedule.setRefLocation(refLocation);
            schedule.setStatus(Status.UPDATED);
            scheduleRepositoryForWaste.save(schedule);
            return "Schedule successfully updated";
        }
        return "Schedule can no longer be updated after 1 hour";
    }


    @Override
    public List<ScheduleResponse> GetAllSchedulesForOneWasteUser(Long id) {
            ProfileEntity profile = profileRepo.findById(id).orElseThrow();
            List<ScheduleResponse> scheduleResponses = new ArrayList<>();
            for (ScheduleEntityForWasteDisposal schedule : profile.getSchedules()) {
                ScheduleResponse scheduleResponse = new ScheduleResponse();
                scheduleResponse.setScheduleDto(new ScheduleDto(schedule.getPickupAddress()));
                scheduleResponse.setRefLocationDto(new RefLocationDto(schedule.getRefLocation().getLocation(), schedule.getRefLocation().getPickUpDay()));
                if (schedule.getBinRequest() != null) {
                    scheduleResponse.setBinRequestDto(new BinRequestDto(schedule.getBinRequest().isRequestStatus(), schedule.getBinRequest().getBinQuantity()));
                } else {
                    scheduleResponse.setBinRequestDto(null);
                }
                scheduleResponses.add(scheduleResponse);
            }
            return scheduleResponses;
        }

    @Override
    public ScheduleEntityForWasteDisposal GetAScheduleForOneWasteUser(Long scheduleId, Long userId) {
        ProfileEntity profile = profileRepo.findById(userId).orElseThrow();
        return profile.getSchedules().stream()
                .filter(s -> s.getId().equals(scheduleId))
                .findFirst()
                .orElseThrow(()->new RuntimeException("Schedule Not found"));
    }


    @Override
    public Status statusUpdated(StatusDto statusDto, Long id) {
        boolean schedule = scheduleRepositoryForWaste.existsById(id);
        if (schedule) {
            ScheduleEntityForWasteDisposal scheduleEntityForWasteDisposal = scheduleRepositoryForWaste.findById(id).orElseThrow();
            scheduleEntityForWasteDisposal.setStatus(statusDto.getStatus());
        }
        return statusDto.getStatus();
    }
}

