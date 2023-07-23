package com.waste_management_v1.waste_management_v1.email;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmailRepository extends JpaRepository<EmailEntity,Long> {
    Optional<EmailEntity> findByToken(String token);
}
