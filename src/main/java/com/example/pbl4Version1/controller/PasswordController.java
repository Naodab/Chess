package com.example.pbl4Version1.controller;

import com.example.pbl4Version1.utils.PasswordUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/password")
public class PasswordController {

    @PostMapping("/check")
    public ResponseEntity<String> checkPassword(@RequestParam String rawPassword, @RequestParam String encodedPassword) {
        boolean isMatch = PasswordUtils.matchPassword(rawPassword, encodedPassword);
        if (isMatch) {
            return ResponseEntity.ok("Password matches");
        } else {
            return ResponseEntity.status(403).body("Password does not match");
        }
    }
}
