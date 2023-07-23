package com.waste_management_v1.waste_management_v1.controller;

import com.waste_management_v1.waste_management_v1.entity.Roles;
import com.waste_management_v1.waste_management_v1.repository.RoleRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/role")
public class RoleController {
    RoleRepository roleRepository;

    public RoleController(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @PostMapping
    public String addRole(@RequestParam String roleName){
        Roles roles = Roles.builder()
                .roleName(roleName)
                .build();
        roleRepository.save(roles);
        return "Role successfully added";
    }
}
