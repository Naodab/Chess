package com.example.pbl4Version1.entity;

import java.time.LocalDate;
import java.util.Set;

import com.example.pbl4Version1.enums.OperatingStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
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
	LocalDate lastestLogin; // don't config yet
	
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
	
	@ManyToMany
	Set<Role> roles;
	
	@ManyToMany
	Set<Achievement> achievements;
}
