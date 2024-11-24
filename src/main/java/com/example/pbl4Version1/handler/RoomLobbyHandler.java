package com.example.pbl4Version1.handler;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RoomLobbyHandler {
    Long id;
    @Builder.Default
    int time = 15;
    @Builder.Default
    boolean hasPassword = false;
    String host;
    String player;
    List<String> viewers = new ArrayList<>();

    public int getAmountPeople() {
        int result = 0;
        if (host != null) result++;
        if (player != null) result++;
        if (viewers != null) result += viewers.size();
        return result;
    }

    public String toString() {
        return "RoomLobbyHandler [" +
                    "id=" + id + ", time=" + time + ", " +
                    "hasPassword=" + hasPassword + ", host=" + host + ", " +
                    "player=" + player + ", numberOfViewers=" + viewers.size() + "]";
    }
}
