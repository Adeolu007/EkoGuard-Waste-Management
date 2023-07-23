package com.waste_management_v1.waste_management_v1.service.serviceImpl;

import com.waste_management_v1.waste_management_v1.entity.ProfileEntity;
import com.waste_management_v1.waste_management_v1.repository.ProfileRepo;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private ProfileRepo profileRepo;

    @Override
    public UserDetails loadUserByUsername(String emailOrPhoneNumber) throws UsernameNotFoundException {
        ProfileEntity profileEntity = profileRepo.findByEmailOrPhoneNumber(emailOrPhoneNumber, emailOrPhoneNumber)
                .orElseThrow(() -> new UsernameNotFoundException("User with provided credentials not found!" + emailOrPhoneNumber));

        //retrieve roles associated with the user
        //granted authority is what we used for mapping a role to a user
        Set<GrantedAuthority> authorities = profileEntity.getRoles().stream()
                .map((role) -> new SimpleGrantedAuthority(role.getRoleName()))
                .collect(Collectors.toSet());

        return new org.springframework.security.core.userdetails.User(profileEntity.getEmail(), profileEntity.getPassword(), authorities);
    }
}
