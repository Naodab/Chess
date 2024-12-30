package com.example.pbl4Version1.chessEngine.piece;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import com.example.pbl4Version1.chessEngine.Alliance;
import com.example.pbl4Version1.chessEngine.board.Board;
import com.example.pbl4Version1.chessEngine.board.BoardUtils;
import com.example.pbl4Version1.chessEngine.board.Move;
import com.example.pbl4Version1.chessEngine.board.Move.MajorAttackMove;
import com.example.pbl4Version1.chessEngine.board.Move.MajorMove;
import com.example.pbl4Version1.chessEngine.board.Tile;
import com.google.common.collect.ImmutableList;

public class Knight extends Piece {

    private static final int[] CANDIDATE_MOVE_COORDINATES = {-17, -15, -10, -6, 6, 10, 15, 17};

    public Knight(final int piecePosition, final Alliance pieceAlliance) {
        super(PieceType.KNIGHT, piecePosition, pieceAlliance, true);
    }

    public Knight(final int piecePosition, final Alliance pieceAlliance, final boolean isFirstMove) {
        super(PieceType.KNIGHT, piecePosition, pieceAlliance, isFirstMove);
    }

    @Override
    public Collection<Move> calculateLegalMoves(final Board board) {
        final List<Move> legalMoves = new ArrayList<Move>();

        for (final int currentCandidate : CANDIDATE_MOVE_COORDINATES) {
            final int candidateDestinationCoordinate = this.piecePosition + currentCandidate;
            if (BoardUtils.isValidCoordinate(candidateDestinationCoordinate)) {

                if (isFirstColumnExclusion(this.piecePosition, currentCandidate)
                        || isSecondColumnExclusion(this.piecePosition, currentCandidate)
                        || isSevenColumnExclusion(this.piecePosition, currentCandidate)
                        || isEightColumnExclusion(this.piecePosition, currentCandidate)) {
                    continue;
                }

                final Tile candidateDestinationTile = board.getTile(candidateDestinationCoordinate);
                if (!candidateDestinationTile.isTileOccupied()) {
                    legalMoves.add(new MajorMove(board, this, candidateDestinationCoordinate));
                } else {
                    final Piece pieceAtDestination = candidateDestinationTile.getPiece();
                    final Alliance pieceAlliance = pieceAtDestination.getPieceAlliance();
                    if (this.pieceAlliance != pieceAlliance) {
                        legalMoves.add(
                                new MajorAttackMove(board, this, candidateDestinationCoordinate, pieceAtDestination));
                    }
                }
            }
        }

        return ImmutableList.copyOf(legalMoves);
    }

    private static boolean isFirstColumnExclusion(final int currentPosition, final int candidateOffset) {
        return BoardUtils.FIRST_COLUMN.get(currentPosition)
                && (candidateOffset == -17 || candidateOffset == -10 || candidateOffset == 6 || candidateOffset == 15);
    }

    private static boolean isSecondColumnExclusion(final int currentPosition, final int candidateOffset) {
        return BoardUtils.SECOND_COLUMN.get(currentPosition) && (candidateOffset == 6 || candidateOffset == -10);
    }

    private static boolean isSevenColumnExclusion(final int currentPosition, final int candidateOffset) {
        return BoardUtils.SEVENTH_COLUMN.get(currentPosition) && (candidateOffset == -6 || candidateOffset == 10);
    }

    private static boolean isEightColumnExclusion(final int currentPosition, final int candidateOffset) {
        return BoardUtils.EIGHTH_COLUMN.get(currentPosition)
                && (candidateOffset == 17 || candidateOffset == 10 || candidateOffset == -6 || candidateOffset == -15);
    }

    @Override
    public int locationBonus() {
        return this.pieceAlliance.knightBonus(this.piecePosition);
    }

    @Override
    public Knight movePiece(Move move) {
        return new Knight(move.getDestinationCoordinate(), move.getMovedPiece().getPieceAlliance());
    }
}
