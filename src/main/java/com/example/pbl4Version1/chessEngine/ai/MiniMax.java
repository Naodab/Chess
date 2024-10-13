package com.example.pbl4Version1.chessEngine.ai;

import com.example.pbl4Version1.chessEngine.board.Board;
import com.example.pbl4Version1.chessEngine.board.Move;
import com.example.pbl4Version1.chessEngine.player.MoveTransition;

public class MiniMax implements MoveStrategy {
	private final BoardEvaluator boardEvaluator;
	private int searchDepth;

	public MiniMax(int searchDepth) {
		this.boardEvaluator = new StandardBoardEvaluator();
		this.searchDepth = searchDepth;
	}

	@Override
	public String toString() {
		return "MiniMax";
	}

	@Override
	public Move excute(Board board) {
		final long startTime = System.currentTimeMillis();
		Move bestMove = null;
		int highestSeenValue = Integer.MIN_VALUE;
		int lowestSeenValue = Integer.MAX_VALUE;
		int currentValue;
		for (final Move move : board.getCurrentPlayer()
				.getLegalMoves()) {
			final MoveTransition moveTransition = board
					.getCurrentPlayer().makeMove(move);
			if (moveTransition.getMoveStatus().isDone()) {
				currentValue = board
					.getCurrentPlayer().getAlliance().isWhite() ?
						min(moveTransition.getTransitionBoard(), this.searchDepth - 1) :
						max(moveTransition.getTransitionBoard(), this.searchDepth - 1);
				if (board.getCurrentPlayer().getAlliance().isWhite()
						&& currentValue >= highestSeenValue) {
					highestSeenValue = currentValue;
					bestMove = move;
				} else if (board.getCurrentPlayer().getAlliance().isBlack()
						&& currentValue <= lowestSeenValue) {
					lowestSeenValue = currentValue;
					bestMove = move;
				}
			}
		}
		final long executionTime = System.currentTimeMillis() - startTime;
		System.out.println("Execution time: " + executionTime);
		return bestMove;
	}
	
	public int min(final Board board, final int depth) {
		if (depth == 0 || isEndGameScenario(board)) {
			return this.boardEvaluator.evaluate(board, depth);
		}
		int lowestSeenValue = Integer.MAX_VALUE;
		for (final Move move : board.getCurrentPlayer()
				.getLegalMoves()) {
			final MoveTransition moveTransition = board
					.getCurrentPlayer()
					.makeMove(move);
			if (moveTransition.getMoveStatus().isDone()) {
				final int currentValues = max
						(moveTransition.getTransitionBoard(), 
						depth - 1);
				if (currentValues <= lowestSeenValue) {
					lowestSeenValue = currentValues;
				}
			}
		}
		return lowestSeenValue;
	}
	
	private static boolean isEndGameScenario(final Board board) {
		return board.getCurrentPlayer().isInCheckMate() ||
			   board.getCurrentPlayer().isInStaleMate();
	}
	
	public int max(final Board board, final int depth) {
		if (depth == 0 || isEndGameScenario(board)) {
			return this.boardEvaluator.evaluate(board, depth);
		}
		int highestSeenValue = Integer.MIN_VALUE;
		for (final Move move : board.getCurrentPlayer()
				.getLegalMoves()) {
			final MoveTransition moveTransition = board
					.getCurrentPlayer()
					.makeMove(move);
			if (moveTransition.getMoveStatus().isDone()) {
				final int currentValues = min
						(moveTransition.getTransitionBoard(), 
						depth - 1);
				if (currentValues >= highestSeenValue) {
					highestSeenValue = currentValues;
				}
			}
		}
		return highestSeenValue;
	}

}
