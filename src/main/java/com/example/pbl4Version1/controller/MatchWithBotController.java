package com.example.pbl4Version1.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.pbl4Version1.dto.request.MatchBotCreationRequest;
import com.example.pbl4Version1.dto.response.ApiResponse;
import com.example.pbl4Version1.dto.response.MatchWithBotResponse;
import com.example.pbl4Version1.service.MatchWithBotService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/matches/bot")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MatchWithBotController {
	MatchWithBotService matchWithBotService;
	
	@PostMapping
	ApiResponse<MatchWithBotResponse> create(@RequestBody MatchBotCreationRequest request) {
		return ApiResponse.<MatchWithBotResponse>builder()
				.result(matchWithBotService.create(request))
				.build();
	}
	
	@GetMapping
	ApiResponse<MatchWithBotResponse> createBoard() {
		return ApiResponse.<MatchWithBotResponse>builder()
				.result(matchWithBotService.playWithBot())
				.build();
	}
}
