package com.example.pbl4Version1.chessEngine.ai;

import com.example.pbl4Version1.chessEngine.board.Board;
import com.example.pbl4Version1.chessEngine.piece.Piece;
import com.example.pbl4Version1.chessEngine.player.Player;

public class StandardBoardEvaluator implements BoardEvaluator {
	private static final int CHECK_BONUS = 50;
	private static final int CHECK_MATE_BONUS = 10000;
	private static final int DEPTH_BONUS = 100;
	private static final int CASTLE_BONUS = 60;
	
	@Override
	public int evaluate(Board board, int depth) {
		return scorePlayer(board, board.getWhitePlayer(), depth) 
				- scorePlayer(board, board.getBlackPlayer(), depth);
	}

	private int scorePlayer(final Board board,
			final Player player, final int depth) {
		return pieceValue(player) 
			+ mobility(player) 
			+ check(player) 
			+ checkmate(player, depth) 
			+ castled(player);
	}
	
	private static int pieceValue(final Player player) {
		int pieceValueScore = 0;
		for (final Piece piece : player.getActivePieces()) {
			pieceValueScore += piece.getPieceValue();
		}
		return pieceValueScore;
	}
	
	private static int mobility(final Player player) {
		return player.getLegalMoves().size();
	}
	
	private static int check(final Player player) {
		return player.getOpponent().isInCheck() ? CHECK_BONUS : 0;
	}
	
	private static int checkmate(final Player player,
			final int depth) {
		return player.getOpponent().isInCheckMate() ? 
				CHECK_MATE_BONUS * depthBonus(depth) : 0;
	}
	
	private static int depthBonus(final int depth) {
		return depth == 0 ? 1 : DEPTH_BONUS * depth;
	}
	
	private static int castled(final Player player) {
		return player.isCastled() ? CASTLE_BONUS : 0;
	}
}
