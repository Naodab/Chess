package com.example.pbl4Version1.chessEngine.ai;

import com.example.pbl4Version1.chessEngine.board.Board;

public interface BoardEvaluator {
    int evaluate(Board board, int depth);
}
