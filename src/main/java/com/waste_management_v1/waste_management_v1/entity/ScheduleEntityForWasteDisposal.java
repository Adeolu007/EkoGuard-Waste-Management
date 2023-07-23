package com.waste_management_v1.waste_management_v1.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class ScheduleEntityForWasteDisposal {
    @Id
    @GeneratedValue
    private Long id;
    private String pickupAddress;
//    private int noOfBags;//this is for recycling

    @Enumerated(EnumType.STRING)
    private Status status;


    @ManyToOne
    @JoinColumn(name = "profile_id")
    private ProfileEntity profileEntity;

    @ManyToOne
    private RefLocation refLocation;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private BinRequest binRequest;

    @CreationTimestamp
    @Column(columnDefinition = "DATETIME")
    private LocalDateTime createdAt;
    @UpdateTimestamp
    @Column(columnDefinition = "DATETIME")
    private LocalDateTime modifiedAt;
    @Column(columnDefinition = "DATETIME")
    private String pickUpDate;
}
