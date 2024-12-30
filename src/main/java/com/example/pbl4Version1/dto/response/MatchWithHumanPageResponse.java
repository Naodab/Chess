package com.example.pbl4Version1.dto.response;

import java.util.Date;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MatchWithHumanPageResponse {
    Long id;
    int time;
    String whiteUsername;
    String blackUsername;
    String winner;
    Date createdAt;
}
