package com.waste_management_v1.waste_management_v1.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;


@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class RecycleCategories {
    @Id
    @GeneratedValue
    private Long id;
    private String category;

    @OneToMany(mappedBy = "categoriesList")
    private List<ScheduleEntityForRecycling> scheduleEntityForRecycling;
}
