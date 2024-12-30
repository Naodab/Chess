package com.example.pbl4Version1.chessEngine.ai;

import com.example.pbl4Version1.chessEngine.board.Move;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Builder
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MoveEvaluation {
    final Move move;
    final int value;
}
