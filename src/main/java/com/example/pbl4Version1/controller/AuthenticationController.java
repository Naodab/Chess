package com.example.pbl4Version1.controller;

import java.text.ParseException;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.pbl4Version1.dto.request.AuthenticationRequest;
import com.example.pbl4Version1.dto.request.IntrospectRequest;
import com.example.pbl4Version1.dto.request.LogoutRequest;
import com.example.pbl4Version1.dto.request.RefreshRequest;
import com.example.pbl4Version1.dto.response.ApiResponse;
import com.example.pbl4Version1.dto.response.AuthenticationResponse;
import com.example.pbl4Version1.dto.response.IntrospectResponse;
import com.example.pbl4Version1.service.AuthenticationService;
import com.nimbusds.jose.JOSEException;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {
	AuthenticationService authenticationService;
	
	@PostMapping("/intro")
	ApiResponse<IntrospectResponse> introspect(@RequestBody IntrospectRequest request) 
			throws JOSEException, ParseException {
		return ApiResponse.<IntrospectResponse>builder()
				.result(authenticationService.introspect(request))
				.build();
	}
	
	@PostMapping("/token")
	ApiResponse<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
		return ApiResponse.<AuthenticationResponse>builder()
				.result(authenticationService.authenticate(request))
				.build();
	}
	
	@PostMapping("/logout")
	ApiResponse<?> logout(@RequestBody LogoutRequest request) 
			throws JOSEException, ParseException {
		authenticationService.logout(request);
		return ApiResponse.builder()
				.message("Logout success")
				.build();
	}
	
	@PostMapping("/refresh")
	ApiResponse<AuthenticationResponse> refresh(@RequestBody RefreshRequest request) 
			throws JOSEException, ParseException {
		return ApiResponse.<AuthenticationResponse>builder()
				.result(authenticationService.refreshToken(request))
				.build();
	}
	
}
