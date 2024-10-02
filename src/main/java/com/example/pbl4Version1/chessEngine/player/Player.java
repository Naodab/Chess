package com.example.pbl4Version1.chessEngine.player;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import com.example.pbl4Version1.chessEngine.Alliance;
import com.example.pbl4Version1.chessEngine.board.Board;
import com.example.pbl4Version1.chessEngine.board.Move;
import com.example.pbl4Version1.chessEngine.piece.King;
import com.example.pbl4Version1.chessEngine.piece.Piece;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.Iterables;

public abstract class Player {
	protected final Board board;
	protected final King playerKing;
	protected final Collection<Move> legalMoves;
	private final boolean isInCheck;

	Player(final Board board, final Collection<Move> legalMoves, final Collection<Move> opponentMoves) {
		this.board = board;
		this.playerKing = etablishKing();
		this.legalMoves = ImmutableList
				.copyOf(Iterables.concat(legalMoves, calculateKingCastles(legalMoves, opponentMoves)));
		this.isInCheck = !Player.calculateAttacksOnTile(this.playerKing.getPiecePosition(), opponentMoves).isEmpty();
	}

	public Collection<Move> getLegalMoves() {
		return this.legalMoves;
	}

	public King getPlayerKing() {
		return this.playerKing;
	}

	private King etablishKing() {
		for (final Piece piece : getActivePieces()) {
			if (piece.getPieceType().isKing()) {
				return (King) piece;
			}
		}
		throw new RuntimeException("Shouldn't reach here!!! This is an invalid board!!!");
	}

	public static Collection<Move> calculateAttacksOnTile(int coordinate, Collection<Move> opponentMoves) {
		final List<Move> attackMoves = new ArrayList<Move>();
		for (final Move move : opponentMoves) {
			if (coordinate == move.getDestinationCoordinate())
				attackMoves.add(move);
		}
		return ImmutableList.copyOf(attackMoves);
	}

	public boolean isMoveLegal(final Move move) {
		return this.legalMoves.contains(move);
	}

	public boolean isInCheck() {
		return this.isInCheck;
	}

	public boolean isInCheckMate() {
		return this.isInCheck && !hasEscapeMoves();
	}

	public boolean isInStaleMate() {
		return !this.isInCheck && !this.hasEscapeMoves();
	}

	private boolean hasEscapeMoves() {
		for (final Move move : this.legalMoves) {
			final MoveTransition moveTransition = makeMove(move);
			if (moveTransition.getMoveStatus().isDone()) {
				return true;
			}
		}
		return false;
	}

	public boolean isCastled() {
		return false;
	}

	public MoveTransition makeMove(final Move move) {
		if (!isMoveLegal(move)) {
			return new MoveTransition(this.board, move, MoveStatus.ILLEGAL_MOVE);
		}
		final Board transitionBoard = move.execute();
		final Collection<Move> kingAttacks = Player.calculateAttacksOnTile(
				transitionBoard.getCurrentPlayer().getOpponent().getPlayerKing().getPiecePosition(),
				transitionBoard.getCurrentPlayer().getLegalMoves());
		if (!kingAttacks.isEmpty()) {
			return new MoveTransition(this.board, move, MoveStatus.LEAVES_PLAYER_IN_CHECK);
		}
		return new MoveTransition(transitionBoard, move, MoveStatus.DONE);
	}

	public abstract Collection<Piece> getActivePieces();

	public abstract Alliance getAlliance();

	public abstract Player getOpponent();

	protected abstract Collection<Move> calculateKingCastles(Collection<Move> playerLegals,
			Collection<Move> opponentLegals);
}
