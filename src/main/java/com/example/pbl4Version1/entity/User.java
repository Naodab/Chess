package com.example.pbl4Version1.entity;

import java.time.LocalDate;
import java.util.Set;

import com.example.pbl4Version1.enums.OperatingStatus;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	String id;
	String email;
	
	@Size(min = 4, message = "USERNAME_INVALID")
	String username;
	
	@Size(min = 8, message = "PASSWORD_INVALID")
	String password;
	
	@Builder.Default
	LocalDate createDate = LocalDate.now();
	LocalDate latestLogin = LocalDate.now();
	
	@Builder.Default
	int elo = 1200;
	
	@Builder.Default
	int battleNumber = 0;
	
	@Builder.Default
	int winNumber = 0;
	
	@Builder.Default
	int drawNumber = 0;
	
	@Enumerated(EnumType.STRING)
    OperatingStatus operatingStatus;
	
	@ManyToMany(fetch = FetchType.EAGER)
	Set<Role> roles;
	
	@ManyToMany(fetch = FetchType.EAGER)
	Set<Achievement> achievements;

	@Builder.Default
	String avatar = "https://res.cloudinary.com/dcggh7awq/image/upload/v1730984438/ooa4rt3qrsuyoeotc1va.jpg";
}
