package com.example.pbl4Version1.chessEngine.player;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import com.example.pbl4Version1.chessEngine.Alliance;
import com.example.pbl4Version1.chessEngine.board.Board;
import com.example.pbl4Version1.chessEngine.board.Move;
import com.example.pbl4Version1.chessEngine.board.Tile;
import com.example.pbl4Version1.chessEngine.piece.Piece;
import com.example.pbl4Version1.chessEngine.piece.Rook;
import com.google.common.collect.ImmutableList;

public class BlackPlayer extends Player {
	public BlackPlayer(final Board board, final Collection<Move> whiteStandardLegalMoves,
			final Collection<Move> blackStandardLegalMoves) {
		super(board, blackStandardLegalMoves, whiteStandardLegalMoves);
	}

	@Override
	public Collection<Piece> getActivePieces() {
		return this.board.getBlackPieces();
	}

	@Override
	public Alliance getAlliance() {
		return Alliance.BLACK;
	}

	@Override
	public Player getOpponent() {
		return this.board.getWhitePlayer();
	}

	@Override
	protected Collection<Move> calculateKingCastles(final Collection<Move> playerLegals,
			final Collection<Move> opponentLegals) {
		List<Move> kingCastles = new ArrayList<Move>();
		if (this.playerKing.isFirstMove() && !this.isInCheck()) {
			if (!this.board.getTile(5).isTileOccupied() && !this.board.getTile(6).isTileOccupied()) {
				final Tile rookTile = this.board.getTile(7);
				if (rookTile.isTileOccupied() && rookTile.getPiece().isFirstMove()) {
					if (Player.calculateAttacksOnTile(5, opponentLegals).isEmpty()
							&& Player.calculateAttacksOnTile(6, opponentLegals).isEmpty()
							&& rookTile.getPiece().getPieceType().isRook())
						kingCastles.add(new Move.KingSideCastleMove(this.board, this.playerKing, 6,
								(Rook) rookTile.getPiece(), rookTile.getTileCoordinate(), 5));
				}
			}

			if (!this.board.getTile(1).isTileOccupied() && !this.board.getTile(2).isTileOccupied()
					&& !this.board.getTile(3).isTileOccupied()) {
				final Tile rookTile = this.board.getTile(0);
				if (rookTile.isTileOccupied() && rookTile.getPiece().isFirstMove()
						&& Player.calculateAttacksOnTile(2, opponentLegals).isEmpty()
						&& Player.calculateAttacksOnTile(3, opponentLegals).isEmpty()
						&& rookTile.getPiece().getPieceType().isRook()) {
					kingCastles.add(new Move.QueenSideCastleMove(this.board, this.playerKing, 2,
							(Rook) rookTile.getPiece(), rookTile.getTileCoordinate(), 3));
				}
			}
		}
		return ImmutableList.copyOf(kingCastles);
	}
}
