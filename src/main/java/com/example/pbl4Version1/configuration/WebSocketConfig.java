package com.example.pbl4Version1.configuration;
import com.example.pbl4Version1.handler.SocketConnectionHandler;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry webSocketHandlerRegistry) {
		webSocketHandlerRegistry
				.addHandler(new SocketConnectionHandler(),"/websocket")
				.setAllowedOrigins("*");

		webSocketHandlerRegistry
				.addHandler(new SocketConnectionHandler(),"/websocket/createRoom")
				.setAllowedOrigins("*");

		webSocketHandlerRegistry
				.addHandler(new SocketConnectionHandler(),"/websocket/joinRoom")
				.setAllowedOrigins("*");

		webSocketHandlerRegistry
				.addHandler(new SocketConnectionHandler(),"/websocket/chatInRoom/{roomID}")
				.setAllowedOrigins("*");
	}
}