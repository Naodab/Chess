package com.example.pbl4Version1.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.pbl4Version1.dto.response.ApiResponse;
import com.example.pbl4Version1.utils.NetworkUtils;

@RestController
@RequestMapping("/api/network")
public class NetworkController {

    @GetMapping("/local-ip")
    public ApiResponse<String> getLocalIP() {
        String ip = NetworkUtils.getLocalIPAddress();
        return ApiResponse.<String>builder().result(ip).build();
    }
}
