package com.example.pbl4Version1.handler;

import java.io.IOException;
import java.util.*;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.example.pbl4Version1.dto.request.JoinRoomRequest;
import com.example.pbl4Version1.dto.request.RoomAutoCreateRequest;
import com.example.pbl4Version1.dto.response.RoomResponse;
import com.example.pbl4Version1.service.RoomService;
import com.example.pbl4Version1.service.UserService;
import com.example.pbl4Version1.utils.DelayAction;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class LobbySocketHandler extends TextWebSocketHandler {
    private static LobbySocketHandler instance;
    private final ObjectMapper mapper = new ObjectMapper();
    private final List<RoomLobbyHandler> roomLobbyHandlerList = new ArrayList<>();
    private final RoomService roomService;
    private final UserService userService;
    private final DelayAction delayAction = new DelayAction();
    private final List<String> waitingPeople = new ArrayList<>();

    private LobbySocketHandler(RoomService roomService, UserService userService) {
        this.roomService = roomService;
        this.userService = userService;
    }

    public static LobbySocketHandler getInstance(RoomService roomService, UserService userService) {
        if (instance == null) {
            instance = new LobbySocketHandler(roomService, userService);
        }
        return instance;
    }

    List<WebSocketSession> webSocketSessions = Collections.synchronizedList(new ArrayList<>());

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        super.afterConnectionEstablished(session);
        webSocketSessions.add(session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        super.afterConnectionClosed(session, status);
        String username = (String) session.getAttributes().get("username");
        webSocketSessions.remove(session);
        if (username == null) return;
        if (!waitingPeople.isEmpty()) {
            waitingPeople.remove(username);
        }
        if (checkExistUserLobby(username) && checkExistUserPlaying(username)) {
            userService.logout(username);
        }
    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        super.handleMessage(session, message);
        String payload = ((TextMessage) message).getPayload();
        JsonNode jsonNode = mapper.readTree(payload);
        String type = jsonNode.get("type").asText();
        switch (type) {
            case "RELOAD" -> {}
            case "ENTER_LOBBY" -> {
                String newUsername = jsonNode.get("username").asText();
                session.sendMessage(getRoomsActive());
                delayAction.executeWithDelay(
                        () -> {
                            try {
                                if (!checkExistUserPlaying(newUsername) || !checkExistUserLobby(newUsername)) {
                                    session.sendMessage(new TextMessage(responseExistUser()));
                                } else {
                                    session.getAttributes().put("username", newUsername);
                                }
                            } catch (Exception ignored) {
                            }
                        },
                        2);
                return;
            }
            case "CREATE_ROOM" -> {
                String id = jsonNode.get("id").asText();
                int time = jsonNode.get("time").asInt();
                boolean hasPassword = jsonNode.get("hasPassword").asBoolean();
                String host = jsonNode.get("host").asText();
                RoomLobbyHandler newRoom =
                        new RoomLobbyHandler(Long.valueOf(id), time, hasPassword, host, null, new ArrayList<>());
                roomLobbyHandlerList.add(newRoom);
            }
            case "JOIN_ROOM_AS_PLAYER" -> {
                String roomId = jsonNode.get("roomId").asText();
                String player = jsonNode.get("username").asText();
                for (RoomLobbyHandler roomLobbyHandler : roomLobbyHandlerList) {
                    if (roomId.equals(roomLobbyHandler.getId() + "")) {
                        roomLobbyHandler.setPlayer(player);
                        break;
                    }
                }
            }
            case "JOIN_ROOM_AS_VIEWER" -> {
                String roomId = jsonNode.get("roomId").asText();
                String newViewer = jsonNode.get("username").asText();
                for (RoomLobbyHandler roomLobbyHandler : roomLobbyHandlerList) {
                    if (roomId.equals(roomLobbyHandler.getId() + "")) {
                        List<String> viewers = roomLobbyHandler.getViewers();
                        viewers.add(newViewer);
                        roomLobbyHandler.setViewers(viewers);
                        break;
                    }
                }
            }
            case "USER_LEAVE_ROOM" -> {
                String roomId = jsonNode.get("roomId").asText();
                String role = jsonNode.get("role").asText();
                String username = jsonNode.get("username").asText();
                boolean isActive = jsonNode.get("isActive").asBoolean();
                for (RoomLobbyHandler roomLobbyHandler : roomLobbyHandlerList) {
                    if (!roomId.equals(roomLobbyHandler.getId() + "")) continue;
                    if (!isActive) {

                        roomLobbyHandlerList.remove(roomLobbyHandler);
                        broadcastMessage(deleteRoomMessage(Long.parseLong(roomId)));
                        break;
                    }
                    switch (role) {
                        case "HOST" -> {
                            roomLobbyHandler.setHost(roomLobbyHandler.getPlayer());
                            roomLobbyHandler.setPlayer(null);
                            handlerLeaveRoomAndAddRandom(roomLobbyHandler);
                        }
                        case "PLAYER" -> {
                            roomLobbyHandler.setPlayer(null);
                            handlerLeaveRoomAndAddRandom(roomLobbyHandler);
                        }
                        case "VIEWER" -> {
                            List<String> newViewers = roomLobbyHandler.getViewers();
                            for (String newViewer : newViewers) {
                                if (newViewer.equals(username)) {
                                    newViewers.remove(username);
                                    break;
                                }
                            }
                            roomLobbyHandler.setViewers(newViewers);
                        }
                    }
                    break;
                }
            }
            case "REQUEST_PLAY_RANDOM" -> {
                boolean isValidRoom = false;
                String validRoomId = "";
                String username = jsonNode.get("username").asText();
                for (RoomLobbyHandler roomLobbyHandler : roomLobbyHandlerList) {
                    if (roomLobbyHandler.getHost() != null
                            && roomLobbyHandler.getPlayer() == null
                            && !roomLobbyHandler.isHasPassword()) {
                        isValidRoom = true;
                        roomLobbyHandler.setPlayer(username);
                        validRoomId = roomLobbyHandler.getId() + "";
                        break;
                    }
                }
                if (isValidRoom) {
                    RoomResponse response = roomService.joinRoom(
                            Long.parseLong(validRoomId),
                            JoinRoomRequest.builder().role("PLAYER").build(),
                            username);
                    session.sendMessage(responseValidRoom(response.getId() + "", username));
                } else {
                    if (!waitingPeople.isEmpty()) {
                        String hostUsername = waitingPeople.get(0);
                        String password = "";
                        int time = 15;
                        RoomAutoCreateRequest roomAutoCreateRequest =
                                new RoomAutoCreateRequest(hostUsername, password, time);
                        RoomResponse response = roomService.autoCreate(roomAutoCreateRequest);

                        RoomLobbyHandler roomLobbyHandler = new RoomLobbyHandler();
                        roomLobbyHandler.setId(response.getId());
                        roomLobbyHandler.setTime(time);
                        roomLobbyHandler.setHasPassword(false);
                        roomLobbyHandler.setHost(hostUsername);
                        roomLobbyHandler.setPlayer(username);
                        roomLobbyHandlerList.add(roomLobbyHandler);

                        waitingPeople.remove(hostUsername);
                        sendMessageToUser(
                                hostUsername,
                                responseAutoCreateRoomToHost(response.getId(), time, password, hostUsername),
                                responseCreateRoom(response.getId(), time, password, hostUsername));
                        sendMessageToUser(
                                username,
                                responseAutoCreateRoomToPlayer(response.getId(), username),
                                responseJoinRoom(response.getId(), username));
                    } else {
                        waitingPeople.add(username);
                    }
                }
                return;
            }
            case "CANCEL_RANDOM" -> {
                String username = jsonNode.get("username").asText();
                waitingPeople.remove(username);
                return;
            }
        }
        for (WebSocketSession webSocketSession : webSocketSessions) {
            if (session == webSocketSession) continue;
            webSocketSession.sendMessage(message);
        }
    }

    public void broadcastMessage(TextMessage message) {
        for (WebSocketSession session : webSocketSessions) {
            try {
                session.sendMessage(message);
            } catch (Exception ignored) {
            }
        }
    }

    public void sendMessageToUser(String username, String message, TextMessage messageToOther) throws IOException {
        for (WebSocketSession session : webSocketSessions) {
            String sessionUsername = (String) session.getAttributes().get("username");
            if (username.equals(sessionUsername) && session.isOpen()) {
                session.sendMessage(new TextMessage(message));
            } else if (messageToOther != null) {
                session.sendMessage(messageToOther);
            }
        }
    }

    private void sendToSession(WebSocketSession session, String message) throws IOException {
        session.sendMessage(new TextMessage(message));
    }

    private void sendMessage(String username, TextMessage messageToOther) throws IOException {
        for (WebSocketSession session : webSocketSessions) {
            String sessionUsername = (String) session.getAttributes().get("username");
            if (username.equals(sessionUsername) && session.isOpen()) {
                session.sendMessage(messageToOther);
            }
        }
    }

    private void handlerLeaveRoomAndAddRandom(RoomLobbyHandler roomLobby) {
        try {
            if (waitingPeople.isEmpty() || roomLobby.isHasPassword()) return;
            String username = waitingPeople.get(0);
            roomLobby.setPlayer(username);
            roomService.joinRoom(
                    roomLobby.getId(), JoinRoomRequest.builder().role("PLAYER").build(), username);
            sendMessage(username, responseValidRoom(roomLobby.getId() + "", username));
        } catch (Exception ignored) {
        }
    }

    private String responseExistUser() {
        String payload = "";
        payload = "{" + "\"type\": \"EXIST_USER\"" + "}";
        return payload;
    }

    private TextMessage responseCreateRoom(Long roomId, int time, String password, String hostname) {
        String payload = "";
        payload = "{" + "\"type\": \"CREATE_ROOM\","
                + "\"id\":"
                + roomId + ", " + "\"time\":"
                + time + ", " + "\"username\":"
                + "\"" + hostname + "\"" + "," + "\"people\":"
                + 1 + "," + "\"hasPassword\":"
                + !password.isEmpty() + "}";
        return new TextMessage(payload);
    }

    private TextMessage responseJoinRoom(Long roomId, String username) {
        String payload = "";
        payload = "{" + "\"type\": \"JOIN_ROOM_AS_PLAYER\","
                + "\"roomId\":"
                + roomId + ", " + "\"username\":"
                + "\"" + username + "\"" + "}";
        return new TextMessage(payload);
    }

    private String responseAutoCreateRoomToHost(Long roomId, int time, String password, String hostname) {
        return "{" + "\"type\": \"RESPONSE_CREATE_ROOM\","
                + "\"id\":"
                + roomId + ", " + "\"time\":"
                + time + ", " + "\"username\":"
                + "\"" + hostname + "\"" + "," + "\"people\":"
                + 1 + "," + "\"hasPassword\":"
                + !password.isEmpty() + "}";
    }

    private String responseAutoCreateRoomToPlayer(Long roomId, String username) {
        return "{" + "\"type\": \"RESPONSE_JOIN_ROOM_AS_PLAYER\","
                + "\"id\":"
                + roomId + ", " + "\"username\":"
                + "\"" + username + "\"" + "}";
    }

    private TextMessage deleteRoomMessage(Long roomId) {
        String payload = "{" + "\"type\": \"DELETE_ROOM\"," + "\"roomId\":" + roomId + "}";
        return new TextMessage(payload);
    }

    private TextMessage responseValidRoom(String validRoomId, String username) {
        String payload = "{" + "\"type\": \"RESPONSE_VALID_ROOM\","
                + "\"username\":"
                + "\"" + username + "\"" + "," + "\"role\":"
                + "\"" + "PLAYER" + "\"" + "," + "\"id\":"
                + validRoomId + "}";
        return new TextMessage(payload);
    }

    private TextMessage getRoomsActive() {
        String payload = "{" + "\"type\": \"RESPONSE_ENTER_LOBBY\",";
        if (!roomLobbyHandlerList.isEmpty()) {
            payload += "\"rooms\":" + "[";
            for (RoomLobbyHandler roomLobbyHandler : roomLobbyHandlerList) {
                payload += (getJsonRooms(roomLobbyHandler) + ",");
            }
            payload = payload.substring(0, payload.length() - 1);
            payload += "]}";
        } else {
            payload = payload.substring(0, payload.length() - 1);
            payload += "}";
        }
        return new TextMessage(payload);
    }

    private String getJsonRooms(RoomLobbyHandler roomLobbyHandler) {
        return "{" + "\"id\":"
                + roomLobbyHandler.getId() + "," + "\"people\":"
                + roomLobbyHandler.getAmountPeople() + "," + "\"time\":"
                + roomLobbyHandler.getTime() + "}";
    }

    private boolean checkExistUserPlaying(String username) {
        if (!roomLobbyHandlerList.isEmpty()) {
            for (RoomLobbyHandler roomLobbyHandler : roomLobbyHandlerList) {
                if (roomLobbyHandler.getHost().equals(username)) {
                    return false;
                }
                if (roomLobbyHandler.getPlayer() != null
                        && roomLobbyHandler.getPlayer().equals(username)) {
                    return false;
                }
                if (!roomLobbyHandler.getViewers().isEmpty()
                        && roomLobbyHandler.getViewers().contains(username)) {
                    return false;
                }
            }
        }
        return true;
    }

    private boolean checkExistUserLobby(String username) {
        for (WebSocketSession session : webSocketSessions) {
            String sessionUsername = (String) session.getAttributes().get("username");
            if (username.equals(sessionUsername) && session.isOpen()) {
                return false;
            }
        }
        return true;
    }
}
