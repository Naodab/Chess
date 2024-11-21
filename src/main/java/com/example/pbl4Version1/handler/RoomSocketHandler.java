package com.example.pbl4Version1.handler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Slf4j
public class RoomSocketHandler {
    LobbySocketHandler lobbySocketHandler = LobbySocketHandler.getInstance();

    List<WebSocketSession> webSocketSessions;
    WebSocketSession hostSession;
    WebSocketSession playerSession;
    int time;
    int matchNumber = 0;
    final ObjectMapper mapper = new ObjectMapper();
    TimeState timeState = null;
    boolean isMatchExecute = false;

    public RoomSocketHandler() {
        webSocketSessions = Collections.synchronizedList(new ArrayList<>());
    }

    public void add(WebSocketSession session) {
        webSocketSessions.add(session);
    }

    public void remove(WebSocketSession session) {
        webSocketSessions.remove(session);
    }

    public int size() {
        return webSocketSessions.size();
    }

    public void handleMessage(WebSocketSession session,
                              WebSocketMessage<?> message)
            throws Exception {
        if (message instanceof TextMessage) {
            String payload = ((TextMessage) message).getPayload();
            JsonNode jsonNode = mapper.readTree(payload);
            String type = jsonNode.get("type").asText();
            switch (type) {
                case "BEGIN_MATCH" -> {
                    String time = jsonNode.get("time").asText();
                    timeState = new TimeState(Long.parseLong(time));
                    timeState.startTimeWhite();
                    isMatchExecute = true;
                }
                case "END_MATCH" -> {
                    isMatchExecute = false;
                    matchNumber++;
                    timeState.stopAllClocks();
                    return;
                }
                case "ENTER_ROOM" -> {
                    JsonNode user = jsonNode.get("user");
                    String role = user.get("role").asText();
                    if (timeState == null) {
                        timeState = new TimeState(Long
                                .parseLong(jsonNode.get("time").asText()));
                        timeState.startTimeWhite();
                        timeState.toggleTimers();
                        timeState.stopAllClocks();
                    }
                    switch (role) {
                        case "HOST" -> hostSession = session;
                        case "PLAYER" -> playerSession = session;
                    }
                    session.sendMessage(getRoomInfo());
                    log.info("send message to this session");
                }
                case "STEP" -> {
                    timeState.toggleTimers();
                    session.sendMessage(getDataTime());
                    payload = payload.substring(0, payload.length() - 1) + "," +
                            getDataTimeIgnoreType().getPayload().substring(1);
                    message = new TextMessage(payload);
                }
                case "LEAVE_ROOM" -> {
                    String roomId = jsonNode.get("id").asText();
                    lobbySocketHandler.broadcastMessage(jsonStringLeaveRoom(roomId));
                }
            }
        }
        for (WebSocketSession webSocketSession : webSocketSessions) {
            if (session.equals(webSocketSession)) continue;
            webSocketSession.sendMessage(message);
        }
    }

    private String jsonStringLeaveRoom(String roomId) {
        String jsonString = "";
        jsonString = "{" +
                "\"type\": \"LEAVE_ROOM\"," +
                "\"id\":" + roomId +
                "}";
        return jsonString;
    }

    private void broadCast(TextMessage message) throws IOException {
        for (WebSocketSession webSocketSession : webSocketSessions) {
            webSocketSession.sendMessage(message);
        }
    }

    private TextMessage getRoomInfo() {
        long timeWhite = timeState.getTimeWhiteRemaining();
        long timeBlack = timeState.getTimeBlackRemaining();
        String jsonString = "{" +
                "\"type\": \"RESPONSE_ENTER_ROOM\"," +
                "\"timeWhite\":" + timeWhite + "," +
                "\"timeBlack\":" + timeBlack + "," +
                "\"turnWhite\":" + timeState.isTurnWhite() + "," +
                "\"isMatchExecute\":" + isMatchExecute + "," +
                "\"matchNumber\":" + matchNumber +
                 "}";
        return new TextMessage(jsonString);
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
        Instant timeWhiteEndTime = Instant.now();
        Instant timeBlackEndTime = Instant.now();
        boolean turnWhite = true;
        boolean turnBlack = false;

        public synchronized void startTimeWhite() {
            timeWhiteEndTime = Instant.now().plusSeconds(timeWhiteDuration);
            turnWhite = true;
            turnBlack = false;
        }

        public synchronized void startTimeBlack() {
            timeBlackEndTime = Instant.now().plusSeconds(timeBlackDuration);
            turnWhite = false;
            turnBlack = true;
        }

        public synchronized long getTimeWhiteRemaining() {
            return turnWhite ? Math.max(0, timeWhiteEndTime.getEpochSecond() -
                    Instant.now().getEpochSecond()) : timeWhiteDuration;
        }

        public synchronized long getTimeBlackRemaining() {
            return !turnWhite ? Math.max(0, timeBlackEndTime.getEpochSecond() -
                    Instant.now().getEpochSecond()) : timeBlackDuration;
        }

        public synchronized void stopAllClocks() {
            timeWhiteDuration = getTimeWhiteDuration();
            timeBlackDuration = getTimeWhiteDuration();
            turnWhite = false;
            turnBlack = false;
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

        public synchronized boolean isStop() {
            return !turnBlack && !turnWhite;
        }

        // call when createMatch
        TimeState(long timeDuration) {
            timeWhiteDuration = timeDuration;
            timeBlackDuration = timeDuration;
        }
    }
}
