package com.example.pbl4Version1.dto.response;

import java.util.List;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MatchWithHumanResponse {
	Long id;
	RoomResponse roomResponse;
	UserResponse white;
	UserResponse black;
	int timeWhite;
	int timeBlack;
	String winner;
	List<StepResponse> steps;
}