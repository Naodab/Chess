package com.example.pbl4Version1.handler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Slf4j
public class RoomSocketHandler extends TextWebSocketHandler {
    List<WebSocketSession> webSocketSessions = Collections.synchronizedList(new ArrayList<>());
    WebSocketSession hostSession;
    WebSocketSession playerSession;
    private final ObjectMapper mapper = new ObjectMapper();
    private TimeState timeState = null;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        super.afterConnectionEstablished(session);
        System.out.println(session.getId() + " connected!");
        webSocketSessions.add(session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        super.afterConnectionClosed(session, status);
        System.out.println(session.getId() + " disconnected!");
        if (timeState != null) {
            if (hostSession.equals(session)) {

            } else if (playerSession.equals(session)) {

            }
        }
        webSocketSessions.remove(session);
    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        super.handleMessage(session, message);
        if (message instanceof TextMessage) {
            String payload = ((TextMessage) message).getPayload();
            JsonNode jsonNode = mapper.readTree(payload);
            String type = jsonNode.get("type").asText();
            switch (type) {
                case "BEGIN_MATCH" -> {
                    String time = jsonNode.get("time").asText();
                    timeState = new TimeState(Long.parseLong(time));
                    timeState.startTimeWhite();
                }
                case "ENTER_ROOM" -> {
                    JsonNode user = jsonNode.get("user");
                    String role = user.get("role").asText();
                    switch (role) {
                        case "HOST" -> hostSession = session;
                        case "PLAYER" -> playerSession = session;
                    }
                    if (timeState != null) {
                        TextMessage textMessage = getDataTime();
                        session.sendMessage(textMessage);
                    }
                }
                case "STEP" -> {
                    timeState.toggleTimers();
                    session.sendMessage(getDataTime());
                    message = new TextMessage(message.getPayload()
                            + getDataTimeIgnoreType().getPayload());
                }
            }
        }
        for (WebSocketSession webSocketSession : webSocketSessions) {
            if (session == webSocketSession) continue;
            webSocketSession.sendMessage(message);
        }
    }

    private TextMessage getDataTime() {
        long timeWhite = timeState.getTimeWhiteRemaining();
        long timeBlack = timeState.getTimeBlackRemaining();
        String jsonString = "{" +
                "\"type\": \"DATA_TIME\"," +
                "\"timeWhite\":" + timeWhite + "," +
                "\"timeBlack\":" + timeBlack + "," +
                "\"turnWhite\":" + timeState.isTurnWhite() +
                 "}";
        return new TextMessage(jsonString);
    }

    private TextMessage getDataTimeIgnoreType() {
        long timeWhite = timeState.getTimeWhiteRemaining();
        long timeBlack = timeState.getTimeBlackRemaining();
        String jsonString = "{" +
                "\"timeWhite\":" + timeWhite + "," +
                "\"timeBlack\":" + timeBlack + "," +
                "\"turnWhite\":" + timeState.isTurnWhite() +
                "}";
        return new TextMessage(jsonString);
    }

    @Getter
    @Setter
    @FieldDefaults(level = AccessLevel.PRIVATE)
    class TimeState {
        long timeWhiteDuration;
        long timeBlackDuration;
        Instant timeWhiteEndTime;
        Instant timeBlackEndTime;
        boolean turnWhite = true;

        public synchronized void startTimeWhite() {
            timeWhiteEndTime = Instant.now().plusSeconds(timeWhiteDuration);
            turnWhite = true;
        }

        public synchronized void startTimeBlack() {
            timeBlackEndTime = Instant.now().plusSeconds(timeBlackDuration);
            turnWhite = false;
        }

        public synchronized long getTimeWhiteRemaining() {
            return turnWhite ? Math.max(0, timeWhiteEndTime.getEpochSecond() -
                    Instant.now().getEpochSecond()) : timeWhiteDuration;
        }

        public synchronized long getTimeBlackRemaining() {
            return !turnWhite ? Math.max(0, timeBlackEndTime.getEpochSecond() -
                    Instant.now().getEpochSecond()) : timeBlackDuration;
        }

        public synchronized void toggleTimers() {
            if (turnWhite) {
                timeWhiteDuration = getTimeWhiteRemaining();
                startTimeBlack();
            } else {
                timeBlackDuration = getTimeBlackRemaining();
                startTimeWhite();
            }
        }

        // call when createMatch
        TimeState(long timeDuration) {
            timeWhiteDuration = timeDuration;
            timeBlackDuration = timeDuration;
        }
    }
}
