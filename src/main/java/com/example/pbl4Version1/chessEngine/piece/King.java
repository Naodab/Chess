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

public class King extends Piece {
	private final static int[] CANDIDATE_MOVE_COORDINATES = { -9, -8, -7, -1, 1, 7, 8, 9 };

	public King(final int piecePosition, final Alliance pieceAlliance) {
		super(PieceType.KING, piecePosition, pieceAlliance, true);
	}
	
	public King(final int piecePosition, final Alliance pieceAlliance, 
			final boolean isFirstMove) {
		super(PieceType.KING, piecePosition, pieceAlliance, isFirstMove);
	}

	@Override
	public Collection<Move> calculateLegalMoves(final Board board) {
		List<Move> legalMoves = new ArrayList<Move>();

		for (int currentCandidate : CANDIDATE_MOVE_COORDINATES) {
			final int candidateDestinationCoordinate = this.piecePosition + currentCandidate;

			if (BoardUtils.isValidCoordinate(candidateDestinationCoordinate)) {

				if (isFirstColumnExclusion(this.piecePosition, currentCandidate)
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
						legalMoves.add(new MajorAttackMove(board, this, 
								candidateDestinationCoordinate, pieceAtDestination));
					}
				}
			}
		}

		return ImmutableList.copyOf(legalMoves);
	}

	private static boolean isFirstColumnExclusion(final int currentPosition, final int candidateOffset) {
		return BoardUtils.FIRST_COLUMN[currentPosition]
				&& (candidateOffset == -9 || candidateOffset == -1 || candidateOffset == 7);
	}

	private static boolean isEightColumnExclusion(final int currentPosition, final int candidateOffset) {
		return BoardUtils.EIGHTH_COLUMN[currentPosition]
				&& (candidateOffset == -7 || candidateOffset == 1 || candidateOffset == 9);
	}

	@Override
	public King movePiece(Move move) {
		return new King(move.getDestinationCoordinate(), move.getMovedPiece().getPieceAlliance());
	}
}
