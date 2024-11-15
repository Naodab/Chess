package com.example.pbl4Version1.controller;

import org.springframework.web.bind.annotation.*;

import com.example.pbl4Version1.dto.request.MatchCreationRequest;
import com.example.pbl4Version1.dto.response.ApiResponse;
import com.example.pbl4Version1.dto.response.MatchWithHumanResponse;
import com.example.pbl4Version1.service.MatchWithHumanService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/matches/human")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MatchWithHumanController {
	MatchWithHumanService matchWithHumanService;
	
	@PostMapping
	ApiResponse<MatchWithHumanResponse> create(@RequestBody MatchCreationRequest request) {
		return ApiResponse.<MatchWithHumanResponse>builder()
				.result(matchWithHumanService.create(request))
				.build();
	}

	@GetMapping("/{matchId}")
	ApiResponse<MatchWithHumanResponse> get(@PathVariable Long matchId) {
		return ApiResponse.<MatchWithHumanResponse>builder()
				.result(matchWithHumanService.getMatch(matchId))
				.build();
	}
	
	//Don't finish yet
}
