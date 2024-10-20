package com.example.pbl4Version1.controller.page;
import com.example.pbl4Version1.repository.UserRepository;
import com.example.pbl4Version1.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.slf4j.Slf4j;

import jakarta.servlet.http.HttpSession;

@Slf4j
@Controller
@RequestMapping("/public")
public class HomeController {
    @Autowired
    UserService userService;
    private UserRepository userRepository;

    @GetMapping(value = {"/", "/home"})
	public String index() {
		return "home";
	}

    @GetMapping("/login")
    public String login() {
        return "login";
    }
    
    @GetMapping("/forgot")
    public String forgot() {
    	return "forgot";
    }
    
    @GetMapping("/verify")
    public String verify() {
    	return "verify";
    }

    @GetMapping("/play-with-bot")
    public String playWithBot() {
        return "user/index";
    }
}