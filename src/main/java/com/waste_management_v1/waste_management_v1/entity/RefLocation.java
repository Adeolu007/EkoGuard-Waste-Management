package com.waste_management_v1.waste_management_v1.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.*;

import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class RefLocation {
    @Id
    @GeneratedValue
    private Long id;
    private String location;
    private String pickUpDay;
    @OneToMany(mappedBy = "refLocation")
    private List<ScheduleEntityForWasteDisposal> schedules;
}
