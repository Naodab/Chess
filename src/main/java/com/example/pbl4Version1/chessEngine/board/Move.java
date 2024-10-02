package com.example.pbl4Version1.chessEngine.board;

import java.util.Objects;

import com.example.pbl4Version1.chessEngine.board.Board.Builder;
import com.example.pbl4Version1.chessEngine.piece.Pawn;
import com.example.pbl4Version1.chessEngine.piece.Piece;
import com.example.pbl4Version1.chessEngine.piece.Rook;

public abstract class Move {
	protected final Board board;
	protected final Piece movedPiece;
	protected final int destinationCoordinate;
	protected final boolean isFirstMove;

	public static final Move NULL_MOVE = new NullMove();

	public Move(final Board board, final Piece movedPiece, 
			final int destinationCoordinate) {
		this.board = board;
		this.movedPiece = movedPiece;
		this.destinationCoordinate = destinationCoordinate;
		this.isFirstMove = movedPiece.isFirstMove();
	}
	
	private Move(final Board board, final int destinationCoordinate) {
		this.board = board;
		this.destinationCoordinate = destinationCoordinate;
		this.movedPiece = null;
		this.isFirstMove = false;
	}

	public int getDestinationCoordinate() {
		return this.destinationCoordinate;
	}

	public int getCurrentCoordinate() {
		return this.movedPiece.getPiecePosition();
	}

	public Piece getMovedPiece() {
		return this.movedPiece;
	}

	public boolean isAttack() {
		return false;
	}

	public boolean isCastlingMove() {
		return false;
	}

	public Piece getAttackedPiece() {
		return null;
	}
	
	public Board getBoard() {
		return this.board;
	}

	@Override
	public int hashCode() {
		return Objects.hash(board, destinationCoordinate, movedPiece, isFirstMove);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Move other = (Move) obj;
		return Objects.equals(board, other.board) && destinationCoordinate == other.destinationCoordinate
				&& Objects.equals(movedPiece, other.movedPiece) && isFirstMove == other.isFirstMove;
	}

	public Board execute() {
		final Builder builder = new Builder();
		for (Piece piece : this.board.getCurrentPlayer().getActivePieces()) {
			if (!this.movedPiece.equals(piece)) {
				builder.setPiece(piece);
			}
		}	
		for (Piece piece : this.board.getCurrentPlayer().getOpponent().getActivePieces()) {
			builder.setPiece(piece);
		}
		builder.setPiece(this.movedPiece.movePiece(this));
		builder.setMoveMaker(this.board.getCurrentPlayer().getOpponent().getAlliance());
		return builder.build();
	}
	
	public static final class MajorAttackMove extends AttackMove {
		public MajorAttackMove (final Board board, final Piece movedPiece, 
				final int destinationCoordinate, final Piece pieceAttacked) {
			super(board, movedPiece, destinationCoordinate, pieceAttacked);
		}
		
		@Override
		public boolean equals(Object obj) {
			return this == obj || obj instanceof MajorAttackMove && super.equals(obj);
		}
		
		@Override
		public String toString() {
			return movedPiece.getPieceType() + BoardUtils.getPositionAtCoordinate(this.destinationCoordinate);
		}
	}

	public static final class MajorMove extends Move {

		public MajorMove(final Board board, final Piece movedPiece, 
				final int destinationCoordinate) {
			super(board, movedPiece, destinationCoordinate);
		}
		
		@Override
		public boolean equals(final Object obj) {
			return this == obj || obj instanceof MajorMove
					&& super.equals(obj);
		}
		
		@Override
		public String toString() {
			return movedPiece.getPieceType().toString() + 
					BoardUtils.getPositionAtCoordinate(this.destinationCoordinate);
		}
	}

	public static class AttackMove extends Move {
		final Piece attackedPiece;

		public AttackMove(final Board board, final Piece movedPiece, final int destinationCoordinate,
				final Piece attackedPiece) {
			super(board, movedPiece, destinationCoordinate);
			this.attackedPiece = attackedPiece;
		}

		@Override
		public int hashCode() {
			final int prime = 31;
			int result = super.hashCode();
			result = prime * result + Objects.hash(attackedPiece);
			return result;
		}

		@Override
		public boolean equals(Object obj) {
			if (this == obj)
				return true;
			if (!super.equals(obj))
				return false;
			if (getClass() != obj.getClass())
				return false;
			AttackMove other = (AttackMove) obj;
			return Objects.equals(attackedPiece, other.attackedPiece);
		}

		@Override
		public boolean isAttack() {
			return true;
		}

		@Override
		public Piece getAttackedPiece() {
			return attackedPiece;
		}
	}

	public static final class PawnMove extends Move {

		public PawnMove(final Board board, final Piece movedPiece, 
				final int destinationCoordinate) {
			super(board, movedPiece, destinationCoordinate);
		}
		
		@Override
		public boolean equals(Object obj) {
			return this == obj || obj instanceof PawnMove && super.equals(obj);
		}
		
		@Override
		public String toString() {
			return BoardUtils.getPositionAtCoordinate(this.destinationCoordinate);
		}
	}

	public static class PawnAttackMove extends AttackMove {

		public PawnAttackMove(final Board board, final Piece movedPiece, final int destinationCoordinate,
				final Piece attackedPiece) {
			super(board, movedPiece, destinationCoordinate, attackedPiece);
		}
		
		@Override
		public boolean equals(Object obj) {
			return this == obj || obj instanceof PawnAttackMove && super.equals(obj);
		}
		
		@Override
		public String toString() {
			return BoardUtils.getPositionAtCoordinate(this.movedPiece.getPiecePosition())
						.substring(0, 1)
					+ "x" 
					+ BoardUtils.getPositionAtCoordinate(this.destinationCoordinate);
		}
	}

	public static class PawnEnPassantAttackMove extends PawnAttackMove {

		public PawnEnPassantAttackMove(final Board board, final Piece movedPiece, final int destinationCoordinate,
				final Piece attackedPiece) {
			super(board, movedPiece, destinationCoordinate, attackedPiece);
		}
		
		@Override
		public boolean equals(Object obj) {
			return this == obj || obj instanceof PawnEnPassantAttackMove && super.equals(obj);
		}
		
		@Override
		public Board execute() {
			final Builder builder = new Builder();
			for (final Piece piece : this.board.getCurrentPlayer().getActivePieces()) {
				if (!this.movedPiece.equals(piece)) {
					builder.setPiece(piece);
				}
			}
			for (final Piece piece : this.board.getCurrentPlayer().getOpponent().getActivePieces()) {
				if (!this.attackedPiece.equals(piece)) {
					builder.setPiece(piece);
				}
			}
			builder.setPiece(this.movedPiece.movePiece(this));
			builder.setMoveMaker(this.board.getCurrentPlayer().getOpponent().getAlliance());
			return builder.build();
		}
	}
	
	public static final class PawnPromotion extends Move {
		final Move decoratedMove;
		final Pawn promotedPawn;
		
		public PawnPromotion(final Move decoratedMove) {
			super(decoratedMove.getBoard(), decoratedMove.getMovedPiece(), 
					decoratedMove.getDestinationCoordinate());
			this.decoratedMove = decoratedMove;
			this.promotedPawn = (Pawn) decoratedMove.getMovedPiece();
		}
		
		@Override
		public int hashCode() {
			final int prime = 31;
			int result = super.hashCode();
			result = prime * result + Objects.hash(decoratedMove, promotedPawn);
			return result;
		}

		@Override
		public boolean equals(Object obj) {
			if (this == obj)
				return true;
			if (!super.equals(obj))
				return false;
			if (getClass() != obj.getClass())
				return false;
			PawnPromotion other = (PawnPromotion) obj;
			return Objects.equals(decoratedMove, other.decoratedMove)
					&& Objects.equals(promotedPawn, other.promotedPawn);
		}

		@Override
		public Board execute() {
			final Board pawnMovedBoard = this.decoratedMove.execute();
			final Board.Builder builder = new Builder();
			for (final Piece piece : pawnMovedBoard.getCurrentPlayer().getActivePieces()) {
				if (!this.promotedPawn.equals(piece)) {
					builder.setPiece(piece);
				}
			}
			
			for (final Piece piece : pawnMovedBoard.getCurrentPlayer()
					.getOpponent().getActivePieces()) {
				builder.setPiece(piece);
			}
			builder.setPiece(this.promotedPawn.getPromotionPiece().movePiece(this));
			builder.setMoveMaker(pawnMovedBoard.getCurrentPlayer().getAlliance());
			return builder.build();
		}
		
		@Override
		public boolean isAttack() {
			return this.decoratedMove.isAttack();
		}	
		
		@Override
		public Piece getAttackedPiece() {
			return this.decoratedMove.getAttackedPiece();
		}
		
		@Override
		public String toString() {
			return "";
		}
	}

	public static final class PawnJump extends Move {

		public PawnJump(final Board board, final Piece movedPiece, final int destinationCoordinate) {
			super(board, movedPiece, destinationCoordinate);
		}

		@Override
		public Board execute() {
			final Builder builder = new Builder();
			for (Piece piece : this.board.getCurrentPlayer().getActivePieces()) {
				if (!this.movedPiece.equals(piece)) {
					builder.setPiece(piece);
				}
			}
			for (Piece piece : this.board.getCurrentPlayer().getOpponent().getActivePieces()) {
				builder.setPiece(piece);
			}
			final Pawn movedPawn = (Pawn) this.movedPiece.movePiece(this);
			builder.setPiece(movedPawn);
			builder.setEnPassantPawn(movedPawn);
			builder.setMoveMaker(this.board.getCurrentPlayer().getOpponent().getAlliance());
			return builder.build();
		}
		
		@Override
		public String toString() {
			return BoardUtils.getPositionAtCoordinate
					(this.destinationCoordinate);
		}
	}

	static class CastleMove extends Move {
		protected final Rook castleRook;
		protected final int castleRookStart;
		protected final int castleRookDestination;

		public CastleMove(final Board board, final Piece movedPiece, final int destinationCoordinate,
				final Rook castleRook, final int castleRookStart, final int castleRookDestination) {
			super(board, movedPiece, destinationCoordinate);
			this.castleRook = castleRook;
			this.castleRookStart = castleRookStart;
			this.castleRookDestination = castleRookDestination;
		}

		public Rook getCastleRook() {
			return this.castleRook;
		}

		@Override
		public boolean isCastlingMove() {
			return true;
		}

		@Override
		public Board execute() {
			final Builder builder = new Builder();
			for (final Piece piece : this.board.getCurrentPlayer().getActivePieces()) {
				if (!this.movedPiece.equals(piece) && !this.castleRook.equals(piece))
					builder.setPiece(piece);
			}
			for (final Piece piece : this.board.getCurrentPlayer().getOpponent().getActivePieces()) {
				builder.setPiece(piece);
			}
			builder.setPiece(this.movedPiece.movePiece(this));
			builder.setPiece(new Rook(this.castleRookDestination, this.castleRook.getPieceAlliance()));
			builder.setMoveMaker(this.board.getCurrentPlayer().getOpponent().getAlliance());
			return builder.build();
		}
		
		@Override
		public int hashCode() {
			final int prime = 31;
			int result = super.hashCode();
			result = prime * result + 
					Objects.hash(castleRook, castleRookDestination, castleRookStart);
			return result;
		}

		@Override
		public boolean equals(Object obj) {
			if (this == obj)
				return true;
			if (!super.equals(obj))
				return false;
			if (getClass() != obj.getClass())
				return false;
			CastleMove other = (CastleMove) obj;
			return Objects.equals(castleRook, other.castleRook) 
					&& castleRookDestination == other.castleRookDestination
					&& castleRookStart == other.castleRookStart;
		}
	}

	public static class KingSideCastleMove extends CastleMove {

		public KingSideCastleMove(final Board board, final Piece movedPiece, final int destinationCoordinate,
				final Rook castleRook, final int castleRookStart, final int castleRookDestination) {
			super(board, movedPiece, destinationCoordinate, castleRook, castleRookStart, castleRookDestination);
		}
		
		@Override
		public String toString() {
			return "0-0";
		}
		
		@Override
		public boolean equals(Object obj) {
			return this == obj || obj instanceof KingSideCastleMove && super.equals(obj);
		}
	}

	public static class QueenSideCastleMove extends CastleMove {

		public QueenSideCastleMove(final Board board, final Piece movedPiece, final int destinationCoordinate,
				final Rook castleRook, final int castleRookStart, final int castleRookDestination) {
			super(board, movedPiece, destinationCoordinate, castleRook, castleRookStart, castleRookDestination);
		}
		
		@Override
		public String toString() {
			return "0-0-0";
		}
		
		@Override
		public boolean equals(Object obj) {
			return this == obj || obj instanceof QueenSideCastleMove && super.equals(obj);
		}
	}

	public static final class NullMove extends Move {
		public NullMove() {
			super(null, 65);
		}

		@Override
		public Board execute() {
			throw new RuntimeException("Cannot execute the null move.");
		}
		
		@Override
		public int getCurrentCoordinate() {
			return -1;
		}
	}

	public static class MoveFactory {
		private MoveFactory() {
			throw new RuntimeException("Not instantiable");
		}

		public static Move createMove(final Board board, final int currentCoordinate, final int destinationCoordinate) {
			for (final Move move : board.getAllLegalMoves()) {
				if (move.getCurrentCoordinate() == currentCoordinate
						&& move.getDestinationCoordinate() == destinationCoordinate) {
					return move;
				}
			}
			return NULL_MOVE;
		}
	}
}