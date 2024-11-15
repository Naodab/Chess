package com.example.pbl4Version1.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MatchWithHumanUpdateRequest {
    Long matchId;
    Float timeWhitePlayer;
    Float timeBlackPlayer;
    String winnerId;
}