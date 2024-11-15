//package com.example.pbl4Version1.handler;
//
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.event.EventListener;
//import org.springframework.messaging.simp.SimpMessageSendingOperations;
//import org.springframework.stereotype.Component;
//import org.springframework.web.socket.messaging.SessionConnectedEvent;
//import org.springframework.web.socket.messaging.SessionDisconnectEvent;
//
//@Component
//@Slf4j
//public class WebSocketEventListener {
//    @Autowired
//    private SimpMessageSendingOperations messagingTemplate;
//
//    @EventListener
//    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
//        log.info("Connected to websocket");
//    }
//
//    @EventListener
//    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
//        log.info("Disconnected from websocket");
//    }
//}