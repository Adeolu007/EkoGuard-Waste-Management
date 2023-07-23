package com.waste_management_v1.waste_management_v1.repository;

import com.waste_management_v1.waste_management_v1.entity.ScheduleEntityForRecycling;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleRepositoryForRecycle extends JpaRepository<ScheduleEntityForRecycling,Long> {
}
