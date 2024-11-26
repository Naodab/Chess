package com.example.pbl4Version1.controller;

import com.example.pbl4Version1.dto.response.AccountDataResponse;
import com.example.pbl4Version1.dto.response.ApiResponse;
import com.example.pbl4Version1.dto.response.MatchDataResponse;
import com.example.pbl4Version1.dto.response.MatchInDateResponse;
import com.example.pbl4Version1.entity.Traffic;
import com.example.pbl4Version1.service.TrafficService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/traffic")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TrafficController {
    TrafficService trafficService;

    @GetMapping("/account")
    ApiResponse<AccountDataResponse> getAccountData() {
        return ApiResponse.<AccountDataResponse>builder()
                .result(trafficService.getAccountData())
                .build();
    }

    @GetMapping("/page/{pageNumber}")
    ApiResponse<List<Traffic>> getTrafficRecently(@PathVariable("pageNumber") int pageNumber) {
        return ApiResponse.<List<Traffic>>builder()
                .result(trafficService.getTrafficRecently(pageNumber))
                .build();
    }

    @GetMapping("/matches")
    ApiResponse<MatchDataResponse> getMatchData() {
        return ApiResponse.<MatchDataResponse>builder()
                .result(trafficService.getMatchesData())
                .build();
    }

    @GetMapping("/matchDate")
    ApiResponse<List<MatchInDateResponse>> getMatchFor7Days() {
        return ApiResponse.<List<MatchInDateResponse>>builder()
                .result(trafficService.getMatchIn7Days())
                .build();
    }
}
