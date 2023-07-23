package com.waste_management_v1.waste_management_v1.repository;

import com.waste_management_v1.waste_management_v1.entity.RecycleCategories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecycleCategoryRepository extends JpaRepository<RecycleCategories,Long> {
}
