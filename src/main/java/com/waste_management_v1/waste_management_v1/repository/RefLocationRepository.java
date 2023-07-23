package com.waste_management_v1.waste_management_v1.repository;

import com.waste_management_v1.waste_management_v1.entity.RefLocation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefLocationRepository extends JpaRepository<RefLocation,Long> {
    RefLocation findByLocation(String location);
    boolean existsByLocation(String location);
}
