package com.example.pbl4Version1.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.socket.EnableWebSocketSecurity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;

import jakarta.servlet.DispatcherType;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
	private final String[] PUBLIC_ENDPOINTS = { "/api/users", "/api/auth/token", "/api/auth/forgot", 
												"/api/auth/intro", "/api/auth/refresh", 
												"/api/auth/logout", "/api/auth/verify"};
	private final String[] FRONTEND_ENDPOINTS = {"/public/**", "/assets/**"};
	private final String[] WEBSOCKET_ENDPOINTS = {	"/websocket/**", "/websocket/createRoom", "/websocket/joinRoom",
													"/websocket/chatInRoom"};
	@Autowired
	CustomJwtDecoder customJwtDecoder;
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
		http.authorizeHttpRequests(request -> 
			{
				request
						.dispatcherTypeMatchers(DispatcherType.FORWARD).permitAll()
						.requestMatchers(FRONTEND_ENDPOINTS).permitAll()
						.requestMatchers(HttpMethod.POST, PUBLIC_ENDPOINTS).permitAll()
						.requestMatchers(WEBSOCKET_ENDPOINTS).permitAll()
						.anyRequest().authenticated();
			});
		
		http.oauth2ResourceServer(oauth2 -> 
			oauth2.jwt(jwtConfigurer -> jwtConfigurer.decoder(customJwtDecoder)
					.jwtAuthenticationConverter(jwtAuthenticationConverter()))
				.authenticationEntryPoint(new JwtAuthenticationEntry())
		);
		
		http.csrf(AbstractHttpConfigurer::disable);
		return http.build();
	}
	
	@Bean
	JwtAuthenticationConverter jwtAuthenticationConverter() {
		JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
		jwtGrantedAuthoritiesConverter.setAuthorityPrefix("");
		JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
		converter.setJwtGrantedAuthoritiesConverter(jwtGrantedAuthoritiesConverter);
		return converter;
	}
}
