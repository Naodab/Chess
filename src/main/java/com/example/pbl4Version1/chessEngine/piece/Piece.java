package com.example.pbl4Version1.chessEngine.piece;

import java.util.Collection;
import java.util.Objects;

import com.example.pbl4Version1.chessEngine.Alliance;
import com.example.pbl4Version1.chessEngine.board.Board;
import com.example.pbl4Version1.chessEngine.board.Move;

public abstract class Piece {
	protected final PieceType pieceType;
	protected final int piecePosition;
	protected final Alliance pieceAlliance;
	protected boolean isFirstMove;

	public Piece(final PieceType pieceType, final int piecePosition, 
			final Alliance pieceAlliance, final boolean isFirstMove) {
		this.pieceType = pieceType;
		this.piecePosition = piecePosition;
		this.pieceAlliance = pieceAlliance;
		this.isFirstMove = isFirstMove;
	}

	public int getPiecePosition() {
		return this.piecePosition;
	}

	public Alliance getPieceAlliance() {
		return this.pieceAlliance;
	}

	public boolean isFirstMove() {
		return this.isFirstMove;
	}

	public PieceType getPieceType() {
		return this.pieceType;
	}
	
	public int getPieceValue() {
		return this.pieceType.getPieceValue();
	}

	public abstract Piece movePiece(Move move);

	@Override
	public int hashCode() {
		return Objects.hash(isFirstMove, pieceAlliance, piecePosition, pieceType);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Piece other = (Piece) obj;
		return isFirstMove == other.isFirstMove && pieceAlliance == other.pieceAlliance
				&& piecePosition == other.piecePosition && pieceType == other.pieceType;
	}

	@Override
	public String toString() {
		return this.pieceType.toString();
	}

	public abstract Collection<Move> calculateLegalMoves(final Board board);

	public enum PieceType {
		PAWN("P", 100) {
			@Override
			public boolean isKing() {
				return false;
			}
		},
		KNIGHT("N", 300) {
			@Override
			public boolean isKing() {
				return false;
			}
		},
		ROOK("R", 500) {
			@Override
			public boolean isKing() {
				return false;
			}
		},
		BISHOP("B", 300) {
			@Override
			public boolean isKing() {
				return false;
			}
		},
		KING("K", 10000) {
			@Override
			public boolean isKing() {
				return true;
			}
		},
		QUEEN("Q", 900) {
			@Override
			public boolean isKing() {
				return false;
			}
		};

		private final String pieceName;
		private final int pieceValue;

		PieceType(final String pieceName, final int pieceValue) {
			this.pieceName = pieceName;
			this.pieceValue = pieceValue;
		}

		@Override
		public String toString() {
			return this.pieceName;
		}

		public abstract boolean isKing();
		
		public int getPieceValue() {
			return this.pieceValue;
		}
		
		public boolean isRook() {
			return this.pieceName.equals("R");
		}
	}
}
