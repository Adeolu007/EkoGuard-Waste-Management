package com.waste_management_v1.waste_management_v1.repository;

import com.waste_management_v1.waste_management_v1.dto.ScheduleHistoryDto;
import com.waste_management_v1.waste_management_v1.entity.ScheduleHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleHistoryRepository extends JpaRepository<ScheduleHistory,Long> {
}
