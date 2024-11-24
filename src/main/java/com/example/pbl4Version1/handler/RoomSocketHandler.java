package com.example.pbl4Version1.handler;

import com.example.pbl4Version1.dto.response.RoomResponse;
import com.example.pbl4Version1.service.RoomService;
import com.example.pbl4Version1.utils.DelayAction;
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

import java.io.IOException;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Slf4j
public class RoomSocketHandler {
    RoomService roomService;
    LobbySocketHandler lobbySocketHandler = LobbySocketHandler.getInstance(roomService);
    DelayAction delayHostAction = new DelayAction();
    DelayAction delayPlayerAction = new DelayAction();

    final Long roomId;
    List<WebSocketSession> webSocketSessions;
    List<String> forbiddenUsernames = new ArrayList<>();
    WebSocketSession hostSession;
    WebSocketSession playerSession;
    int matchNumber = 0;
    final ObjectMapper mapper = new ObjectMapper();
    TimeState timeState = null;
    boolean isMatchExecute = false;

    public RoomSocketHandler(long roomId, RoomService roomService) {
        webSocketSessions = Collections.synchronizedList(new ArrayList<>());
        this.roomId = roomId;
        this.roomService = roomService;
    }

    public void add(WebSocketSession session) {
        webSocketSessions.add(session);
    }

    public void remove(WebSocketSession session) throws Exception {
        webSocketSessions.remove(session);
        String username = session.getAttributes()
                .get("username").toString();
        String role = session.getAttributes()
                .get("role").toString();
        if (role.equals("HOST")) {
            if (!isMatchExecute) {
                handlerHostDisconnection(username, role);
            } else {
                boolean isLeft = session.getAttributes().containsKey("left");
                if (isLeft) {
                    handlerHostDisconnection(username, role);
                } else {
                    delayPlayerAction.executeWithDelay(() -> {
                        handlerHostDisconnection(username, role);
                    }, 10);
                }
            }
        } else if (role.equals("PLAYER")) {
            boolean isBanned = session.getAttributes().containsKey("banned");
            if (isBanned) {
                return;
            }
            if (!isMatchExecute) {
                handlePlayerDisconnection(username, role);
            } else {
                boolean isLeft = session.getAttributes().containsKey("left");
                if (isLeft) {
                    handlePlayerDisconnection(username, role);
                } else {
                    delayPlayerAction.executeWithDelay(() -> {
                        handlePlayerDisconnection(username, role);
                    }, 10);
                }
            }
        } else {
            RoomResponse response = roomService.leaveRoom(roomId, username);
            broadCast(leaveRoom(username, role, response.isActive()));
            lobbySocketHandler.handleMessage(null,
                    leaveRoom(username, role, response.isActive(), roomId + ""));
        }
    }

    private void handlerHostDisconnection(String username, String role) {
        try {
            if (playerSession != null) {
                hostSession = playerSession;
                playerSession = null;
            }
            RoomResponse response = roomService.leaveRoom(roomId, username);
            broadCast(leaveRoom(username, role, response.isActive()));
            lobbySocketHandler.handleMessage(null, leaveRoom(username, role, response.isActive(), roomId + ""));
        } catch (Exception ignored) {}
    }

    private void handlePlayerDisconnection(String username, String role) {
        try {
            playerSession = null;
            RoomResponse response = roomService.leaveRoom(roomId, username);
            broadCast(leaveRoom(username, role, response.isActive()));
            lobbySocketHandler.handleMessage(null, leaveRoom(username, role, response.isActive(), roomId + ""));
        } catch (Exception ignored) {}
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
                    String username = user.get("username").asText();
                    if (forbiddenUsernames.contains(username)) {
                        session.sendMessage(banUser());
                        roomService.leaveRoom(roomId, username);
                        return;
                    }
                    session.getAttributes().put("username", username);
                    String role = user.get("role").asText();
                    session.getAttributes().put("role", role);
                    if (timeState == null) {
                        timeState = new TimeState(Long
                                .parseLong(jsonNode.get("time").asText()));
                        timeState.startTimeWhite();
                        timeState.toggleTimers();
                        timeState.stopAllClocks();
                    }
                    switch (role) {
                        case "HOST" -> {
                            hostSession = session;
                            delayHostAction.cancelAction();
                        }
                        case "PLAYER" -> {
                            playerSession = session;
                            delayPlayerAction.cancelAction();
                        }
                    }
                    session.sendMessage(getRoomInfo());
                    log.info("send message to this session");
                }
                case "FORBIDDEN_USER" -> {
                    String username = jsonNode.get("username").asText();
                    forbiddenUsernames.add(username);
                    sendBanned(username, banUser());
                    return;
                }
                case "LEAVE_ROOM_ACTIVELY" -> {
                    session.getAttributes().put("left", true);
                    return;
                }
                case "STEP" -> {
                    timeState.toggleTimers();
                    session.sendMessage(getDataTime());
                    payload = payload.substring(0, payload.length() - 1) + "," +
                            getDataTimeIgnoreType().getPayload().substring(1);
                    message = new TextMessage(payload);
                }
                //former: case "leave room"
            }
        }
        for (WebSocketSession webSocketSession : webSocketSessions) {
            if (session.equals(webSocketSession)) continue;
            if (session.isOpen()) webSocketSession.sendMessage(message);
        }
    }

    private void broadCast(TextMessage message) throws IOException {
        for (WebSocketSession webSocketSession : webSocketSessions) {
            if (webSocketSession.isOpen()) webSocketSession.sendMessage(message);
        }
    }

    private void sendBanned(String username, TextMessage message)
            throws IOException {
        for (WebSocketSession session : webSocketSessions) {
            if (session.getAttributes().get("username").equals(username)) {
                session.getAttributes().put("banned", true);
                session.sendMessage(message);
                break;
            }
        }
    }

    private TextMessage banUser() {
        String payload = "{" +
                "\"type\": \"FORBIDDEN\"" +
                "}";
        return new TextMessage(payload);
    }

    private TextMessage leaveRoom(String username, String role, boolean active, String roomId) {
        String isActive = active ? "true" : "false";
        String payload = "{" +
                "\"type\": \"USER_LEAVE_ROOM\"," +
                "\"roomId\": \"" + roomId + "\"," +
                "\"username\":" + "\"" + username + "\"" + "," +
                "\"role\":" + "\"" +  role + "\"" + "," +
                "\"isActive\":" + isActive +
                "}";
        return new TextMessage(payload);
    }

    private TextMessage leaveRoom(String username, String role, boolean active) {
        String isActive = active ? "true" : "false";
        String payload = "{" +
                "\"type\": \"USER_LEAVE_ROOM\"," +
                "\"username\":" + "\"" + username + "\"" + "," +
                "\"role\":" + "\"" +  role + "\"" + "," +
                "\"isActive\":" + isActive +
                "}";
        return new TextMessage(payload);
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
