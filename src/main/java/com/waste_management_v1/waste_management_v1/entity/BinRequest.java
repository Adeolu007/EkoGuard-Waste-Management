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
public class BinRequest {
    @Id
    @GeneratedValue
    private Long id;
    private boolean requestStatus;
    private int binQuantity;
    @ManyToOne
    private ProfileEntity profileEntity;


}
