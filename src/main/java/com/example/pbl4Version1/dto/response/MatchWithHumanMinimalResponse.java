package com.example.pbl4Version1.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MatchWithHumanMinimalResponse {
    Long id;
    UserForMatchResponse me;
    UserForMatchResponse opponent;
    String state;
}
