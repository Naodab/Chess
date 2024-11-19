package com.example.pbl4Version1.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MatchWithHumanUpdateRequest {
    Integer timeWhitePlayer;
    Integer timeBlackPlayer;
    String gameStatus;
    String winnerId;
}
