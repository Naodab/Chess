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
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoomResponse {
	Long id;
	LocalDate playDay;
	UserResponse host;
	UserResponse player;
	Set<UserResponse> viewers;
	Long matchActiveId;
	int matchNumber;
	int time;
	String password;
}
