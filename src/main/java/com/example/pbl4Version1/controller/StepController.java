package com.example.pbl4Version1.controller;

import org.springframework.web.bind.annotation.*;

import com.example.pbl4Version1.dto.request.StepRequest;
import com.example.pbl4Version1.dto.request.StepToBotRequest;
import com.example.pbl4Version1.dto.response.ApiResponse;
import com.example.pbl4Version1.dto.response.StepResponse;
import com.example.pbl4Version1.service.StepService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/steps")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class StepController {
	StepService stepService;
	
	@PostMapping
	public ApiResponse<StepResponse> create(@RequestBody StepRequest request) {
		return ApiResponse.<StepResponse>builder()
				.result(stepService.create(request))
				.build();
	}
	
	@PostMapping("/bot")
	public ApiResponse<StepResponse> createBotStep(@RequestBody StepToBotRequest request) {
		return ApiResponse.<StepResponse>builder()
				.result(stepService.toBot(request))
				.build();
	}

	@GetMapping("/bot/{matchID}")
	public ApiResponse<StepResponse> getNewestBotStep(@PathVariable Long matchID) {
		return ApiResponse.<StepResponse>builder()
				.result(stepService.getNewestStepOfMatchWithBot(matchID))
				.build();
	}
}
