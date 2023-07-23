package com.waste_management_v1.waste_management_v1.service.serviceImpl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.json.JsonMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.waste_management_v1.waste_management_v1.dto.RecycleRequestDto;
import com.waste_management_v1.waste_management_v1.dto.RecycleResponseDto;
import com.waste_management_v1.waste_management_v1.dto.ScheduleResponse;
import com.waste_management_v1.waste_management_v1.dto.StatusDto;
import com.waste_management_v1.waste_management_v1.entity.*;
import com.waste_management_v1.waste_management_v1.repository.*;
import com.waste_management_v1.waste_management_v1.service.ScheduleServiceForRecycle;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ScheduleServiceForRecycleImpl implements ScheduleServiceForRecycle {

    private final ScheduleRepositoryForRecycle repositoryForRecycle;
    private final BinRequestRepository binRequestRepository;
    private final RefLocationRepository refLocationRepository;
    private final ProfileRepo profileRepo;
    private final ScheduleHistoryRepository scheduleHistoryRepository;
    private final RecycleCategoryRepository recycleCategoryRepository;
    private final ObjectMapper objectMapper;


    @Override
    public String schedulePickUpForRecycle(RecycleRequestDto recycleRequestDto, Long id, Long categoryId) {
        ProfileEntity loggedInUser = profileRepo.findById(id).orElseThrow();

        // Create a new BinRequest using the retrieved bin size
        BinRequest binRequest = null;
        if (recycleRequestDto.isRequestStatus()) {
            binRequest = BinRequest.builder()
                    .profileEntity(loggedInUser)
                    .requestStatus(recycleRequestDto.isRequestStatus())
                    .binQuantity(recycleRequestDto.getBinQuantity())
                    .build();
            binRequestRepository.save(binRequest);
        }

        // Check if the specified location exists
        boolean isLocationExists = refLocationRepository.existsById(recycleRequestDto.getRefLocationId());
        if (!isLocationExists) {
            return "Location not available";
        }


        // Retrieve the RefLocation based on the location value in RefLocationDto
        RefLocation refLocation = refLocationRepository.findById(recycleRequestDto.getRefLocationId()).orElseThrow();
        RecycleCategories categories = recycleCategoryRepository.findById(categoryId).orElseThrow();
        if (recycleRequestDto.isBag() || recycleRequestDto.isBin()) {
            ScheduleEntityForRecycling recycling = ScheduleEntityForRecycling.builder()
                    .profileEntity(loggedInUser)
                    .pickUpDate(recycleRequestDto.getPickUpDate())
                    .pickupAddress(recycleRequestDto.getPickupAddress())
                    .quantityOfBagsOrBins(recycleRequestDto.getQuantityOfBagsOrBins())
                    .categoriesList(categories)
                    .status(Status.PENDING)
                    .binRequest(binRequest)
                    .refLocation(refLocation)
                    .build();
            repositoryForRecycle.save(recycling);



            ScheduleHistory history = ScheduleHistory.builder()
                    .scheduleType("Recycle")
                    .createdAt(recycling.getCreatedAt())
                    .pickUpDate(recycling.getPickUpDate())
                    .status(recycling.getStatus())
                    .pickUpDay(recycling.getRefLocation().getPickUpDay())
                    .location(recycling.getRefLocation().getLocation())
                    .build();
            scheduleHistoryRepository.save(history);
        }
        return "Schedule successful";
    }
    @Bean
    private static ObjectMapper createObjectMapper() {
        ObjectMapper objectMapper = new ObjectMapper()
                .registerModule(new JavaTimeModule())
                .configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        return objectMapper;
    }

    @Override
    public Status statusUpdated(StatusDto statusDto, Long id) {
        boolean recycle = repositoryForRecycle.existsById(id);
        if (recycle) {
            ScheduleEntityForRecycling recycling = repositoryForRecycle.findById(id).orElseThrow();
            recycling.setStatus(statusDto.getStatus());

        }
        return statusDto.getStatus();
    }

    @Override
    public String updateSchedulePickUpForRecycle(RecycleRequestDto recycleRequestDto, Long scheduleId, Long categoryId) {
        ProfileEntity loggedInUser = profileRepo.findById(recycleRequestDto.getProfileId()).orElseThrow();

        // Create a new BinRequest using the retrieved bin size
        BinRequest binRequest = null;
        if (recycleRequestDto.isRequestStatus()) {
            binRequest = BinRequest.builder()
                    .profileEntity(loggedInUser)
                    .requestStatus(recycleRequestDto.isRequestStatus())
                    .binQuantity(recycleRequestDto.getBinQuantity())
                    .build();
            binRequestRepository.save(binRequest);
        }

        // Check if the specified location exists
        boolean isLocationExists = refLocationRepository.existsById(recycleRequestDto.getRefLocationId());
        if (!isLocationExists) {
            return "Location not available";
        }

        // Retrieve the RefLocation based on the location value in RefLocationDto
        RefLocation refLocation = refLocationRepository.findById(recycleRequestDto.getRefLocationId()).orElseThrow();

        RecycleCategories categories = recycleCategoryRepository.findById(categoryId).orElseThrow();
        ScheduleEntityForRecycling recycling = repositoryForRecycle.findById(scheduleId).orElseThrow();

        LocalDateTime currentDateTime = LocalDateTime.now();
        LocalDateTime scheduledDateTime = recycling.getCreatedAt();

        long minutesElapsed = scheduledDateTime.until(currentDateTime, ChronoUnit.MINUTES);
        if (minutesElapsed <= 60) {
            recycling.setProfileEntity(loggedInUser);
            recycling.setPickupAddress(recycleRequestDto.getPickupAddress());
            recycling.setCategoriesList(categories);
            recycling.setPickUpDate(recycleRequestDto.getPickUpDate());
            recycling.setQuantityOfBagsOrBins(recycling.getQuantityOfBagsOrBins());
            recycling.setBinRequest(binRequest);
            recycling.setRefLocation(refLocation);
            recycling.setStatus(Status.UPDATED);
            repositoryForRecycle.save(recycling);
            return "Schedule successfully updated";
        }
        return "Schedule can no longer be updated after 1 hour";
    }

    @Override
    public List<RecycleResponseDto> GetAllSchedulesForOneRecycleUser(Long id) {
        ProfileEntity profile = profileRepo.findById(id).orElseThrow();
        return profile.getRecycling().stream().map(allSchedules -> RecycleResponseDto.builder()
                .pickupAddress(allSchedules.getPickupAddress())
                .pickUpDate(allSchedules.getPickUpDate())
                .location(allSchedules.getRefLocation().getLocation())
                .pickUpDay(allSchedules.getRefLocation().getPickUpDay())
                .quantityOfBagsOrBins(allSchedules.getQuantityOfBagsOrBins())
                .binQuantity(allSchedules.getBinRequest().getBinQuantity())
                .categories(allSchedules.getCategoriesList())
                .status(allSchedules.getStatus())
                .createdAt(allSchedules.getCreatedAt())
                .modifiedAt(allSchedules.getModifiedAt())
                .build()).collect(Collectors.toList());
    }
}
