package com.waste_management_v1.waste_management_v1.repository;

import com.waste_management_v1.waste_management_v1.entity.ProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProfileRepo extends JpaRepository<ProfileEntity,Long> {

    List<ProfileEntity> findAllByDeleted(boolean t);
    Optional<ProfileEntity> findByEmail(String email);
    Optional<ProfileEntity> findByEmailVerificationToken(String emailVerificationToken);
    Optional<ProfileEntity> findByPhoneNumber(String phoneNumber);
    boolean existsByPhoneNumberOrEmail(String phoneNumber, String email);
    Boolean existsByEmail(String email);
    Boolean existsByPhoneNumber(String phoneNumber);
    Optional<ProfileEntity> findByEmailOrPhoneNumber(String email, String phoneNumber);

}
