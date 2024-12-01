package com.example.pbl4Version1.chessEngine.ai;

import com.example.pbl4Version1.chessEngine.board.BoardUtils;
import com.example.pbl4Version1.chessEngine.board.Move;
import com.example.pbl4Version1.chessEngine.piece.Piece;
import com.example.pbl4Version1.chessEngine.player.Player;
import com.google.common.collect.ImmutableList;
import lombok.Getter;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class KingSafetyAnalyzer {
    private static final KingSafetyAnalyzer INSTANCE = new KingSafetyAnalyzer();
    private static final List<List<Boolean>> COLUMNS = initColumns();

    private KingSafetyAnalyzer() {
    }

    public static KingSafetyAnalyzer get() {
        return INSTANCE;
    }

    private static List<List<Boolean>> initColumns() {
        final List<List<Boolean>> columns = new ArrayList<>();
        columns.add(BoardUtils.FIRST_COLUMN);
        columns.add(BoardUtils.SECOND_COLUMN);
        columns.add(BoardUtils.THIRD_COLUMN);
        columns.add(BoardUtils.FOURTH_COLUMN);
        columns.add(BoardUtils.FIFTH_COLUMN);
        columns.add(BoardUtils.SIXTH_COLUMN);
        columns.add(BoardUtils.SEVENTH_COLUMN);
        columns.add(BoardUtils.EIGHTH_COLUMN);
        return ImmutableList.copyOf(columns);
    }

    public KingDistance calculateKingTropism(final Player player) {
        final int playerKingSquare = player.getPlayerKing().getPiecePosition();
        final Collection<Move> enemyMoves = player.getOpponent().getLegalMoves();
        Piece closestPiece = null;
        int closestDistance = Integer.MAX_VALUE;
        for(final Move move : enemyMoves) {
            final int currentDistance = calculateChebyshevDistance(playerKingSquare, move.getDestinationCoordinate());
            if(currentDistance < closestDistance) {
                closestDistance = currentDistance;
                closestPiece = move.getMovedPiece();
            }
        }
        return new KingDistance(closestPiece, closestDistance);
    }

    private static int calculateChebyshevDistance(final int kingTileId,
                                                  final int enemyAttackTileId) {
        final int rankDistance = Math.abs(getRank(enemyAttackTileId) - getRank(kingTileId));
        final int fileDistance = Math.abs(getFile(enemyAttackTileId) - getFile(kingTileId));
        return Math.max(rankDistance, fileDistance);
    }

    private static int getFile(final int coordinate) {
        if(BoardUtils.FIRST_COLUMN.get(coordinate)) {
            return 1;
        } else if(BoardUtils.SECOND_COLUMN.get(coordinate)) {
            return 2;
        } else if(BoardUtils.THIRD_COLUMN.get(coordinate)) {
            return 3;
        } else if(BoardUtils.FOURTH_COLUMN.get(coordinate)) {
            return 4;
        } else if(BoardUtils.FIFTH_COLUMN.get(coordinate)) {
            return 5;
        } else if(BoardUtils.SIXTH_COLUMN.get(coordinate)) {
            return 6;
        } else if(BoardUtils.SEVENTH_COLUMN.get(coordinate)) {
            return 7;
        } else if(BoardUtils.EIGHTH_COLUMN.get(coordinate)) {
            return 8;
        }
        throw new RuntimeException("should not reach here!");
    }

    private static int getRank(final int coordinate) {
        if(BoardUtils.FIRST_ROW.get(coordinate)) {
            return 1;
        } else if(BoardUtils.SECOND_ROW.get(coordinate)) {
            return 2;
        } else if(BoardUtils.THIRD_ROW.get(coordinate)) {
            return 3;
        } else if(BoardUtils.FOURTH_ROW.get(coordinate)) {
            return 4;
        } else if(BoardUtils.FIFTH_ROW.get(coordinate)) {
            return 5;
        } else if(BoardUtils.SIXTH_ROW.get(coordinate)) {
            return 6;
        } else if(BoardUtils.SEVENTH_ROW.get(coordinate)) {
            return 7;
        } else if(BoardUtils.EIGHTH_ROW.get(coordinate)) {
            return 8;
        }
        throw new RuntimeException("should not reach here!");
    }

    @Getter
    static class KingDistance {

        final Piece enemyPiece;
        final int distance;

        KingDistance(final Piece enemyDistance,
                     final int distance) {
            this.enemyPiece = enemyDistance;
            this.distance = distance;
        }

        public int tropismScore() {
            return (enemyPiece.getPieceValue()/10) * distance;
        }

    }
}
