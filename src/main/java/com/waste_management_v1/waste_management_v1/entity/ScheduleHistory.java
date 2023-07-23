package com.waste_management_v1.waste_management_v1.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class ScheduleHistory {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private ProfileEntity profileEntity;

    @Column(columnDefinition = "DATETIME")
    private LocalDateTime createdAt;
//    @Column(columnDefinition = "DATETIME")
    private String pickUpDate;
    @Enumerated(EnumType.STRING)
    private Status status;
    private String pickUpDay;
    private String location;
    private String scheduleType;

}
