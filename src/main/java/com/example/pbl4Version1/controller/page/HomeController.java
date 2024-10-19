package com.example.pbl4Version1.controller.page;
import com.example.pbl4Version1.dto.response.UserResponse;
import com.example.pbl4Version1.repository.UserRepository;
import com.example.pbl4Version1.service.UserService;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    
//    @GetMapping("/play-with-bot")
//    public String playWithBot(HttpSession session, Model model) {
//        String username = session.getAttribute("username").toString();
//        UserResponse user = userService.getUserByUsername(username);
//        model.addAttribute("username", username);
//        model.addAttribute("elo", user.getElo());
//        return "user/index";
//    }

    @GetMapping("/play-with-bot")
    public String playWithBot() {
        return "user/index";
    }

    @PostMapping("/save-data")
    public ResponseEntity<?> saveData(@RequestBody DataRequest request, HttpSession session) {
        session.setAttribute(request.getName(), request.getData());
        return ResponseEntity.ok().build();
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class DataRequest {
        String name;
        String data;
    }
}