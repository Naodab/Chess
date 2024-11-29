package com.example.pbl4Version1.chessEngine.piece;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import com.example.pbl4Version1.chessEngine.Alliance;
import com.example.pbl4Version1.chessEngine.board.Board;
import com.example.pbl4Version1.chessEngine.board.BoardUtils;
import com.example.pbl4Version1.chessEngine.board.Move;
import com.example.pbl4Version1.chessEngine.board.Move.PawnAttackMove;
import com.example.pbl4Version1.chessEngine.board.Move.PawnEnPassantAttackMove;
import com.example.pbl4Version1.chessEngine.board.Move.PawnJump;
import com.example.pbl4Version1.chessEngine.board.Move.PawnMove;
import com.example.pbl4Version1.chessEngine.board.Move.PawnPromotion;
import com.google.common.collect.ImmutableList;

public class Pawn extends Piece {
	private final static int[] CANDIDATE_MOVE_COORDINATES = { 8, 16, 7, 9 };

	public Pawn(final int piecePosition, final Alliance pieceAlliance) {
		super(PieceType.PAWN ,piecePosition, pieceAlliance, true);
	}
	
	public Pawn(final int piecePosition, final Alliance pieceAlliance,
			final boolean isFirstMove) {
		super(PieceType.PAWN ,piecePosition, pieceAlliance, isFirstMove);
	}

	@Override
	public Collection<Move> calculateLegalMoves(final Board board) {
		final List<Move> legalMoves = new ArrayList<Move>();

		for (final int currentCandidate : CANDIDATE_MOVE_COORDINATES) {
			final int candidateDestinationCoordinate = this.piecePosition
					+ this.getPieceAlliance().getDirection() * currentCandidate;
			if (!BoardUtils.isValidCoordinate(candidateDestinationCoordinate)) {
				continue;
			}

			if (currentCandidate == 8 
					&& !board.getTile(candidateDestinationCoordinate)
						.isTileOccupied()) {
				if (this.pieceAlliance
						.isPawnPromotionSquare(candidateDestinationCoordinate)) {
					legalMoves.add(new PawnPromotion(new PawnMove(board, this, 
							candidateDestinationCoordinate)));
				} else {					
					legalMoves.add(new PawnMove(board, this, 
							candidateDestinationCoordinate));
				}
			} else if (currentCandidate == 16 
					&& this.isFirstMove()
					&& ((BoardUtils.SEVENTH_ROW.get(this.piecePosition)
							&& this.pieceAlliance.isBlack())
						|| BoardUtils.SECOND_ROW.get(this.piecePosition)
								&& this.getPieceAlliance().isWhite())) {
				final int behindCanDesCoor = this.piecePosition + 
						this.getPieceAlliance().getDirection() * 8;
				if (!board.getTile(behindCanDesCoor).isTileOccupied()
						&& !board.getTile(candidateDestinationCoordinate)
							.isTileOccupied()) {
					legalMoves.add(new PawnJump(board, this, 
							candidateDestinationCoordinate));
				}
			} else if (currentCandidate == 7
					&& !((BoardUtils.EIGHTH_COLUMN.get(this.piecePosition)
							&& this.pieceAlliance.isWhite())
						|| (BoardUtils.FIRST_COLUMN.get(this.piecePosition)
								&& this.pieceAlliance.isBlack()))) {
				if (board.getTile(candidateDestinationCoordinate).isTileOccupied()) {
					final Piece pieceOnCandidate = 
							board.getTile(candidateDestinationCoordinate).getPiece();
					if (this.pieceAlliance != pieceOnCandidate.getPieceAlliance()) {
						if (this.pieceAlliance
								.isPawnPromotionSquare(candidateDestinationCoordinate)) {
							legalMoves.add(new PawnPromotion(new PawnAttackMove(board, this, 
									candidateDestinationCoordinate, pieceOnCandidate)));
						} else {							
							legalMoves.add(new PawnAttackMove(board, this, 
									candidateDestinationCoordinate, pieceOnCandidate));
						}
					}
				} else if (board.getEnPassantPawn() != null) {
					if (board.getEnPassantPawn().getPiecePosition() == 
							(this.piecePosition + this.pieceAlliance.getOppositeDirection())) {
						final Piece pieceOnCandidate = board.getEnPassantPawn();
						if (this.pieceAlliance != pieceOnCandidate.getPieceAlliance()) {
							legalMoves.add(new PawnEnPassantAttackMove(board, this, 
									candidateDestinationCoordinate, pieceOnCandidate));
						}
					}
				}
			} else if (currentCandidate == 9
					&& !((BoardUtils.FIRST_COLUMN.get(this.piecePosition)
							&& this.pieceAlliance.isWhite())
						|| (BoardUtils.EIGHTH_COLUMN.get(this.piecePosition)
							&& this.pieceAlliance.isBlack()))) {
				if (board.getTile(candidateDestinationCoordinate).isTileOccupied()) {
					final Piece pieceOnCandidate = 
							board.getTile(candidateDestinationCoordinate).getPiece();
					if (this.pieceAlliance != pieceOnCandidate.getPieceAlliance()) {
						if (this.pieceAlliance
								.isPawnPromotionSquare(candidateDestinationCoordinate)) {
							legalMoves.add(new PawnPromotion(new PawnAttackMove(board, this, 
									candidateDestinationCoordinate, pieceOnCandidate)));
						} else {							
							legalMoves.add(new PawnAttackMove(board, this, 
									candidateDestinationCoordinate, pieceOnCandidate));
						}
					}
				}
			}
		}
		return ImmutableList.copyOf(legalMoves);
	}

	@Override
	public int locationBonus() {
		return this.pieceAlliance.pawnBonus(this.piecePosition);
	}

	@Override
	public Pawn movePiece(Move move) {
		return new Pawn(move.getDestinationCoordinate(), move.getMovedPiece().getPieceAlliance());
	}

	public Piece getPromotionPiece() {
		return new Queen(this.piecePosition, this.pieceAlliance, false);
	}
}
