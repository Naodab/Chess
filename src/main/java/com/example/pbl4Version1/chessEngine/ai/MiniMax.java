package com.example.pbl4Version1.chessEngine.ai;

import com.example.pbl4Version1.chessEngine.board.Board;
import com.example.pbl4Version1.chessEngine.board.BoardUtils;
import com.example.pbl4Version1.chessEngine.board.Move;
import com.example.pbl4Version1.chessEngine.player.MoveTransition;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;

public class MiniMax implements MoveStrategy {
	private final BoardEvaluator boardEvaluator;
	private int searchDepth;

	public MiniMax(int searchDepth) {
		this.boardEvaluator = StandardBoardEvaluator.get();
		this.searchDepth = searchDepth;
	}

	@Override
	public Move execute(Board board) {
		final long startTime = System.currentTimeMillis();
		Move bestMove = null;
		int highestSeenValue = Integer.MIN_VALUE;
		int lowestSeenValue = Integer.MAX_VALUE;

		ExecutorService executorService = Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors());
		List<Future<MoveEvaluation>> futures = new ArrayList<>();

		for (final Move move : board.getCurrentPlayer().getLegalMoves()) {
			Callable<MoveEvaluation> task = () -> {
				final MoveTransition transition = board.getCurrentPlayer().makeMove(move);
				if (transition.getMoveStatus().isDone()) {
					int currentValue = board
							.getCurrentPlayer().getAlliance().isWhite() ?
							min(transition.getTransitionBoard(), this.searchDepth - 1) :
							max(transition.getTransitionBoard(), this.searchDepth - 1);
					return new MoveEvaluation(move, currentValue);
				}
				return null;
			};
			futures.add(executorService.submit(task));
		}

		for (Future<MoveEvaluation> future : futures) {
			try {
				MoveEvaluation result = future.get();
				if (result != null) {
					int currentValue = result.getValue();
					if (board.getCurrentPlayer().getAlliance().isWhite() && currentValue >= highestSeenValue) {
						highestSeenValue = currentValue;
						bestMove = result.getMove();
					} else if (board.getCurrentPlayer().getAlliance().isBlack() && currentValue <= lowestSeenValue) {
						lowestSeenValue = currentValue;
						bestMove = result.getMove();
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		executorService.shutdown();
		final long executionTime = System.currentTimeMillis() - startTime;
		System.out.println("Execution time: " + executionTime);
		return bestMove;
	}

	public int min(final Board board, final int depth) {
		if (depth == 0 || BoardUtils.isEndGame(board)) {
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

	public int max(final Board board, final int depth) {
		if (depth == 0 || BoardUtils.isEndGame(board)) {
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

	@Override
	public long getNumBoardsEvaluated() {
		return 0;
	}
}
