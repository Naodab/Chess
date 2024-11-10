package com.example.pbl4Version1.controller;

import com.example.pbl4Version1.dto.response.AccountDataResponse;
import com.example.pbl4Version1.dto.response.ApiResponse;
import com.example.pbl4Version1.service.TrafficService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
