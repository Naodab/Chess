package com.example.pbl4Version1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class SendingEmailService {
	@Autowired
    private JavaMailSender emailSender;

    public void sendSimpleMessage(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        emailSender.send(message);
    }
    
    public void sendHtmlMail(String to, String subject, String htmlContent) 
    		throws MessagingException {
    	MimeMessage message = emailSender.createMimeMessage();
    	MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
    	
    	helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlContent, true);
        
        emailSender.send(message);
    }
}
