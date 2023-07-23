package com.waste_management_v1.waste_management_v1.entity;

import com.waste_management_v1.waste_management_v1.security.token.Token;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "profile_entity")
public class ProfileEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String otherName;
    private String gender;
    private String address;
    @Email
    private String email;
    private String phoneNumber;
    @Size(min = 8)
    private String password;
    private boolean deleted = false;
    private String feedback;
    private boolean recycle= false;
    private String emailVerificationToken;
    private boolean emailVerificationStatus;

//    private double price;
//    private boolean subscriptionStatus;
//    @CreationTimestamp
//    @Column(columnDefinition = "DATETIME")
//    private LocalDateTime startDate;
//    private LocalDate expiryDate;


    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "profileEntity_roles",
            joinColumns = @JoinColumn(name = "profileEntity_id",referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id",referencedColumnName = "id"))
    private Set<Roles> roles;

    @OneToMany(mappedBy = "profileEntity")
    private List<Token> tokens;

    @OneToMany(mappedBy = "profileEntity")
    private List<ScheduleEntityForWasteDisposal> schedules;

    @OneToMany(mappedBy = "profileEntity")
    private List<ScheduleHistory> scheduleHistoryList;

    @OneToMany(mappedBy = "profileEntity")
    private List<ScheduleEntityForRecycling> recycling;

    @OneToMany(mappedBy = "profileEntity")
    private List<BinRequest> binRequest;

}
