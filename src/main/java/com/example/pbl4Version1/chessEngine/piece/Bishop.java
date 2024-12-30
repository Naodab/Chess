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

public class Bishop extends Piece {
    private static final int[] CANDIDATE_MOVE_VECTOR_COORDINATES = {-9, -7, 7, 9};

    public Bishop(final int piecePosition, final Alliance pieceAlliance) {
        super(PieceType.BISHOP, piecePosition, pieceAlliance, true);
    }

    public Bishop(final int piecePosition, final Alliance pieceAlliance, final boolean isFirstMove) {
        super(PieceType.BISHOP, piecePosition, pieceAlliance, isFirstMove);
    }

    @Override
    public Collection<Move> calculateLegalMoves(final Board board) {
        List<Move> legalMoves = new ArrayList<Move>();
        for (final int currentCandidate : CANDIDATE_MOVE_VECTOR_COORDINATES) {
            int candidateDestinationCoordinate = this.piecePosition;

            while (BoardUtils.isValidCoordinate(candidateDestinationCoordinate)) {
                if (isFirstColumnExclusion(candidateDestinationCoordinate, currentCandidate)
                        || isEightColumnExclusion(candidateDestinationCoordinate, currentCandidate)) {
                    break;
                }
                candidateDestinationCoordinate += currentCandidate;
                if (BoardUtils.isValidCoordinate(candidateDestinationCoordinate)) {
                    final Tile candidateDestinationTile = board.getTile(candidateDestinationCoordinate);
                    if (!candidateDestinationTile.isTileOccupied()) {
                        legalMoves.add(new MajorMove(board, this, candidateDestinationCoordinate));
                    } else {
                        final Piece pieceAtDestination = candidateDestinationTile.getPiece();
                        final Alliance pieceAlliance = pieceAtDestination.getPieceAlliance();
                        if (this.pieceAlliance != pieceAlliance) {
                            legalMoves.add(new MajorAttackMove(
                                    board, this, candidateDestinationCoordinate, pieceAtDestination));
                        }
                        break;
                    }
                }
            }
        }
        return ImmutableList.copyOf(legalMoves);
    }

    @Override
    public int locationBonus() {
        return this.pieceAlliance.bishopBonus(this.piecePosition);
    }

    private static boolean isFirstColumnExclusion(final int currentPosition, final int candidateOffset) {
        return BoardUtils.FIRST_COLUMN.get(currentPosition) && (candidateOffset == -9 || candidateOffset == 7);
    }

    private static boolean isEightColumnExclusion(final int currentPosition, final int candidateOffset) {
        return BoardUtils.EIGHTH_COLUMN.get(currentPosition) && (candidateOffset == 9 || candidateOffset == -7);
    }

    @Override
    public Bishop movePiece(final Move move) {
        return new Bishop(move.getDestinationCoordinate(), move.getMovedPiece().getPieceAlliance());
    }
}
