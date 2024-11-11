package com.example.pbl4Version1.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		// Set up a WebSocket endpoint for the STOMP client to connect to
		registry.addEndpoint("/chess/websocket").setAllowedOrigins("*").withSockJS();
	}

	@Override
	public void configureMessageBroker(MessageBrokerRegistry config) {
		// Prefix for messages bound for methods annotated with @MessageMapping
		config.setApplicationDestinationPrefixes("/app");
		// Enable a simple in-memory message broker with "/topic" as the destination prefix for broadcasts
		config.enableSimpleBroker("/topic");
	}

	@Override
	public void configureClientInboundChannel(ChannelRegistration registration) {
		registration.interceptors(new ChannelInterceptor() {
			@Override
			public Message<?> preSend(Message<?> message, MessageChannel channel) {
				StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
				String token = accessor.getNativeHeader("Authorization") != null ?
						accessor.getNativeHeader("Authorization").get(0) : null;

				if (token == null || !isValidToken(token)) {
					throw new RuntimeException("Invalid token");
				}

				return message;
			}
		});
	}

	private boolean isValidToken(String token) {
		// Here, you should implement your logic to validate the JWT token
		// For example, you could use a JWT library to decode and verify the token.
		// If the token is valid, return true; otherwise, return false.

		// Example (pseudo-code):
		// try {
		//     DecodedJWT jwt = JWT.decode(token.replace("Bearer ", ""));
		//     // Validate the token (check signature, expiration, etc.)
		//     return true; // or false based on validation
		// } catch (Exception e) {
		//     return false;
		// }

		return true; // Replace this with your actual validation logic
	}
}