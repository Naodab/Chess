package com.example.pbl4Version1.dto.response;

import java.util.List;

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
public class MatchWithHumanResponse {
	Long id;
	RoomResponse roomResponse;
	UserResponse white;
	UserResponse black;
	float timeWhite;
	float timeBlack;
	String winner;
	List<StepResponse> steps;
}