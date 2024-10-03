package com.example.pbl4Version1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.pbl4Version1.dto.request.TestRequest;
import com.example.pbl4Version1.service.SendingEmailService;

@RestController
@RequestMapping("/auth")
public class TestController {
	 @Autowired
	    private SendingEmailService emailService;

	    @PostMapping("/sendCredentials")
	    public String sendCredentials(@RequestBody TestRequest request) {
	        String subject = "Thông tin xác thực tài khoản";
	        String text = "Tên đăng nhập: " + request.getUsername() + "\nMật khẩu: " + request.getPassword();
	        emailService.sendSimpleMessage(request.getEmail(), subject, text);
	        return "Thông tin xác thực đã được gửi đến email!";
	    }
}
