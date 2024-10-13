package com.example.pbl4Version1.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/public")	
public class HomeController {
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
}