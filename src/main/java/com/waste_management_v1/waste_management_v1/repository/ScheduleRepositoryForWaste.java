package com.waste_management_v1.waste_management_v1.repository;

import com.waste_management_v1.waste_management_v1.entity.ScheduleEntityForWasteDisposal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleRepositoryForWaste extends JpaRepository<ScheduleEntityForWasteDisposal,Long> {
//    boolean existsById(Long id);

}
