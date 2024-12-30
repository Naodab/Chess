package com.example.pbl4Version1.controller;

import java.io.IOException;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.pbl4Version1.dto.response.ApiResponse;
import com.example.pbl4Version1.service.CloudinaryService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@RestController
@RequestMapping("/api/avatar")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FileUploadController {
    CloudinaryService cloudinaryService;

    @PostMapping
    public ApiResponse<String> setAvatar(@RequestParam("file") MultipartFile file) throws IOException {
        String url = cloudinaryService.uploadFile(file);
        return ApiResponse.<String>builder().result(url).build();
    }
}
