package com.example.pbl4Version1.dto.response;

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
public class MatchWithHumanResponse {
	Long id;
	RoomResponse roomResponse;
	UserResponse white;
	UserResponse black;
	String winner;
	Set<StepResponse> steps;
}