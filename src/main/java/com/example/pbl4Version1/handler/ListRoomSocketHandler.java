package com.example.pbl4Version1.handler;

import java.net.URI;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.example.pbl4Version1.service.RoomService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ListRoomSocketHandler extends TextWebSocketHandler {
    Map<Long, RoomSocketHandler> rooms = Collections.synchronizedMap(new HashMap<>());
    RoomService roomService;

    public ListRoomSocketHandler(RoomService roomService) {
        this.roomService = roomService;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        super.afterConnectionEstablished(session);
        URI uri = session.getUri();
        if (uri == null) return;

        String roomIdStr = uri.getPath().substring(uri.getPath().lastIndexOf("/") + 1);
        Long roomId = Long.parseLong(roomIdStr);
        session.getAttributes().put("roomId", roomId);
        RoomSocketHandler handler = rooms.get(roomId);
        if (handler == null) {
            handler = new RoomSocketHandler(roomId, roomService);
            rooms.put(roomId, handler);
        }
        handler.add(session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        try {
            super.afterConnectionClosed(session, status);
            Long roomId = (Long) session.getAttributes().get("roomId");
            var handler = rooms.get(roomId);
            if (handler != null) {
                handler.remove(session);
                if (handler.size() == 0) {
                    rooms.remove(roomId);
                }
            }
        } catch (Exception ignored) {
        }
    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        super.handleMessage(session, message);
        var handler = rooms.get((Long) session.getAttributes().get("roomId"));
        if (handler != null) {
            handler.handleMessage(session, message);
        } else {
            log.info("Can't get data from room.");
        }
    }
}
