package com.example.pbl4Version1.configuration;
import com.example.pbl4Version1.handler.ListRoomSocketHandler;
import com.example.pbl4Version1.handler.LobbySocketHandler;
import com.example.pbl4Version1.interceptor.RoomInterceptor;
import com.example.pbl4Version1.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
	@Autowired
	RoomService roomService;

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry webSocketHandlerRegistry) {
		webSocketHandlerRegistry
				.addHandler(LobbySocketHandler.getInstance(),"/websocket")
				.setAllowedOrigins("*");

		webSocketHandlerRegistry
				.addHandler(new ListRoomSocketHandler(roomService),"/websocket/chatInRoom/{roomID}")
				.addInterceptors(new RoomInterceptor())
				.setAllowedOrigins("*");
	}
}