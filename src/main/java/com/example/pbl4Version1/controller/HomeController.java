package com.example.pbl4Version1.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/public")
public class HomeController {
    @GetMapping(
            value = {
                "/",
            })
    public String index() {
        return "home";
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/admin")
    public String admin() {
        return "admin/index";
    }

    @GetMapping("/signup")
    public ModelAndView signup() {
        ModelAndView modelAndView = new ModelAndView("login");
        modelAndView.addObject("isSignup", true);
        return modelAndView;
    }

    @GetMapping("home")
    public String test() {
        return "user/home";
    }

    @GetMapping("/forgot")
    public String forgot() {
        return "forgot";
    }

    @GetMapping("/play-with-bot")
    public String playWithBot() {
        return "user/play_with_bot";
    }

    @GetMapping("/playonl")
    public String playonl() {
        return "user/play_online";
    }

    @GetMapping("/review")
    public String review() {
        return "user/review";
    }
}
