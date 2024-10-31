package com.example.pbl4Version1.controller;
import com.example.pbl4Version1.repository.UserRepository;
import com.example.pbl4Version1.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.ModelAndView;

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

    @GetMapping("/signup")
    public ModelAndView signup() {
        ModelAndView modelAndView = new ModelAndView("login");
        modelAndView.addObject("isSignup", true);
        return modelAndView;
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
    @GetMapping("/playonl")
    public String playonl() {
    	return "user/playonl";
    }
    @GetMapping("/selectplay")
    public String selectplay() {
    	return "user/selectplay";
    }
    @GetMapping("/playbot")
    public String playbot() {
    	return "user/playbot";
    }
    
    @GetMapping("/play-with-people/choose-room")
    public String chooseRoom() {
    	return "user/choose-room";
    }
    
    @GetMapping("play-with-people/new-room")
    public String newRoom() {
    	return "user/new-room";
    }

    @GetMapping("/play-with-people/enter-game")
    public String enterGame() {
        return "user/enter-game";
    }
}