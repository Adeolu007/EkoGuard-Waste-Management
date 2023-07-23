package com.waste_management_v1.waste_management_v1.repository;

import com.waste_management_v1.waste_management_v1.entity.Roles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Roles,Long> {
    Optional<Roles> findByRoleName(String roleName);

}
