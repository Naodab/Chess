package com.example.pbl4Version1.handler;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Objects;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MoveHandler {
    String from;
    String to;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MoveHandler that = (MoveHandler) o;
        return Objects.equals(from, that.from) && Objects.equals(to, that.to);
    }

    @Override
    public int hashCode() {
        return Objects.hash(from, to);
    }
}
