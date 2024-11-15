package com.example.pbl4Version1.controller;

import org.springframework.web.bind.annotation.*;

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
	
	@GetMapping
	ApiResponse<MatchWithBotResponse> createBoard() {
		return ApiResponse.<MatchWithBotResponse>builder()
				.result(matchWithBotService.create())
				.build();
	}

	@GetMapping("/{matchID}")
	ApiResponse<MatchWithBotResponse> getMatchWithBot(@PathVariable("matchID") Long matchID) {
		return ApiResponse.<MatchWithBotResponse>builder()
				.result(matchWithBotService.getMatch(matchID))
				.build();
	}
}
