package com.waste_management_v1.waste_management_v1.otp;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OtpRepository extends JpaRepository<OtpEntity,Long> {
    String findByPinId(String pinId);
    boolean existsByPinId(String pinId);
}
