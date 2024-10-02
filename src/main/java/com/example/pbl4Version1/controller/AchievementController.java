package com.example.pbl4Version1.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.pbl4Version1.dto.request.AchievementRequest;
import com.example.pbl4Version1.dto.response.AchievementResponse;
import com.example.pbl4Version1.dto.response.ApiResponse;
import com.example.pbl4Version1.service.AchievementService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/achievements")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AchievementController {
	AchievementService achievementService;
	
	@PostMapping
	ApiResponse<AchievementResponse> create(AchievementRequest request) {
		return ApiResponse.<AchievementResponse>builder()
				.result(achievementService.create(request))
				.build();
	}
	
	@GetMapping
	ApiResponse<List<AchievementResponse>> getAll() {
		return ApiResponse.<List<AchievementResponse>>builder()
				.result(achievementService.getAll())
				.build();
	}
	
	@DeleteMapping("/{name}")
	ApiResponse<?> delete(@PathVariable("name") String name) {
		achievementService.delete(name);
		return ApiResponse.builder()
				.message("Achievement " + name + " delete successfully!")
				.build();
	}
}
