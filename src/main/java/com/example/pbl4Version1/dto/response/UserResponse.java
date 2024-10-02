package com.example.pbl4Version1.dto.response;

import java.time.LocalDate;
import java.util.Set;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
	String id;
	String email;
	String username;
	String name;
	LocalDate dob;
	int elo;
	int battleNumber;
	int winNumber;
	int drawNumber;
	Set<RoleResponse> roles;
	Set<AchievementResponse> achievements;
	String rank;
}