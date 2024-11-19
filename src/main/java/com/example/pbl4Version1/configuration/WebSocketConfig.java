package com.example.pbl4Version1.configuration;
import com.example.pbl4Version1.handler.ListRoomSocketHandler;
import com.example.pbl4Version1.handler.LobbySocketHandler;
import com.example.pbl4Version1.interceptor.RoomInterceptor;
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
				.addHandler(LobbySocketHandler.getInstance(),"/websocket")
				.setAllowedOrigins("*");

		webSocketHandlerRegistry
				.addHandler(new ListRoomSocketHandler(),"/websocket/chatInRoom/{roomID}")
				.addInterceptors(new RoomInterceptor())
				.setAllowedOrigins("*");
	}
}