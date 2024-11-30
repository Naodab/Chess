package com.example.pbl4Version1.handler;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MoveHandler {
    String from;
    String to;

    public boolean equals(MoveHandler obj) {
        return from.equals(obj.from) && to.equals(obj.to);
    }
}
