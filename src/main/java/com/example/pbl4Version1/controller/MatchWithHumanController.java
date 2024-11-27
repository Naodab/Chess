package com.example.pbl4Version1.controller;

import com.example.pbl4Version1.dto.request.MatchWithHumanUpdateRequest;
import com.example.pbl4Version1.dto.response.MatchWithHumanMinimalResponse;
import com.example.pbl4Version1.dto.response.MatchWithHumanPageResponse;
import org.springframework.web.bind.annotation.*;

import com.example.pbl4Version1.dto.request.MatchCreationRequest;
import com.example.pbl4Version1.dto.response.ApiResponse;
import com.example.pbl4Version1.dto.response.MatchWithHumanResponse;
import com.example.pbl4Version1.service.MatchWithHumanService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/matches/human")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MatchWithHumanController {
	MatchWithHumanService matchWithHumanService;

	@GetMapping
	ApiResponse<List<MatchWithHumanResponse>> getAll() {
		return ApiResponse.<List<MatchWithHumanResponse>>builder()
				.result(matchWithHumanService.getAll())
				.build();
	}
	
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

	@PostMapping("/{matchId}")
	ApiResponse<MatchWithHumanResponse> update(@PathVariable Long matchId,
											   @RequestBody MatchWithHumanUpdateRequest request) {
		return ApiResponse.<MatchWithHumanResponse>builder()
				.result(matchWithHumanService.updateMatchWithHuman(matchId, request))
				.build();
	}

	@GetMapping("/myMatches/{page}")
	ApiResponse<List<MatchWithHumanMinimalResponse>> getMyMatches(@PathVariable int page) {
		return ApiResponse.<List<MatchWithHumanMinimalResponse>>builder()
				.result(matchWithHumanService.getMyMatches(page))
				.build();
	}

	@GetMapping("/page/{pageNumber}")
	ApiResponse<List<MatchWithHumanPageResponse>> getPage(@PathVariable int pageNumber) {
		return ApiResponse.<List<MatchWithHumanPageResponse>>builder()
				.result(matchWithHumanService.getPageMatches(pageNumber))
				.build();
	}
}
