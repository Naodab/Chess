package com.example.pbl4Version1.chessEngine.ai;

import java.util.Collection;
import java.util.Comparator;

import com.example.pbl4Version1.chessEngine.Alliance;
import com.example.pbl4Version1.chessEngine.board.Board;
import com.example.pbl4Version1.chessEngine.board.BoardUtils;
import com.example.pbl4Version1.chessEngine.board.Move;
import com.example.pbl4Version1.chessEngine.player.MoveTransition;
import com.example.pbl4Version1.chessEngine.player.Player;
import com.google.common.collect.ComparisonChain;
import com.google.common.collect.Ordering;

public class AlphaBetaWithMoveOrdering implements MoveStrategy {

    private final BoardEvaluator evaluator;
    private final int searchDepth;
    private final MoveSorter moveSorter;
    private long boardsEvaluated;

    private enum MoveSorter {
        SORT {
            @Override
            Collection<Move> sort(final Collection<Move> moves) {
                return Ordering.from(SMART_SORT).immutableSortedCopy(moves);
            }
        };

        public static final Comparator<Move> SMART_SORT = (move1, move2) -> ComparisonChain.start()
                .compareTrueFirst(
                        BoardUtils.isThreatenedBoardImmediate(move1.getBoard()),
                        BoardUtils.isThreatenedBoardImmediate(move2.getBoard()))
                .compareTrueFirst(move1.isAttack(), move2.isAttack())
                .compareTrueFirst(move1.isCastlingMove(), move2.isCastlingMove())
                .compare(
                        move2.getMovedPiece().getPieceValue(),
                        move1.getMovedPiece().getPieceValue())
                .result();

        abstract Collection<Move> sort(Collection<Move> moves);
    }

    public AlphaBetaWithMoveOrdering(final int searchDepth) {
        this.evaluator = StandardBoardEvaluator.get();
        this.searchDepth = searchDepth;
        this.moveSorter = MoveSorter.SORT;
        this.boardsEvaluated = 0;
    }

    @Override
    public String toString() {
        return "AB+MO";
    }

    @Override
    public long getNumBoardsEvaluated() {
        return this.boardsEvaluated;
    }

    @Override
    public Move execute(final Board board) {
        final long startTime = System.currentTimeMillis();
        final Player currentPlayer = board.getCurrentPlayer();
        final Alliance alliance = currentPlayer.getAlliance();
        Move bestMove = Move.MoveFactory.getNullMove();
        int highestSeenValue = Integer.MIN_VALUE;
        int lowestSeenValue = Integer.MAX_VALUE;
        int currentValue;
        for (final Move move : this.moveSorter.sort(board.getCurrentPlayer().getLegalMoves())) {
            final MoveTransition moveTransition = board.getCurrentPlayer().makeMove(move);
            if (moveTransition.getMoveStatus().isDone()) {
                currentValue = alliance.isWhite()
                        ? min(
                                moveTransition.getTransitionBoard(),
                                this.searchDepth - 1,
                                highestSeenValue,
                                lowestSeenValue)
                        : max(
                                moveTransition.getTransitionBoard(),
                                this.searchDepth - 1,
                                highestSeenValue,
                                lowestSeenValue);
                if (alliance.isWhite() && currentValue > highestSeenValue) {
                    highestSeenValue = currentValue;
                    bestMove = move;
                } else if (alliance.isBlack() && currentValue < lowestSeenValue) {
                    lowestSeenValue = currentValue;
                    bestMove = move;
                }
            }
        }
        final long executionTime = System.currentTimeMillis() - startTime;
        System.out.println("Execution time: " + executionTime);
        return bestMove;
    }

    public int max(final Board board, final int depth, final int highest, final int lowest) {
        if (depth == 0 || BoardUtils.isEndGame(board)) {
            this.boardsEvaluated++;
            return this.evaluator.evaluate(board, depth);
        }
        int currentHighest = highest;
        for (final Move move : this.moveSorter.sort((board.getCurrentPlayer().getLegalMoves()))) {
            final MoveTransition moveTransition = board.getCurrentPlayer().makeMove(move);
            if (moveTransition.getMoveStatus().isDone()) {
                currentHighest = Math.max(
                        currentHighest,
                        min(
                                moveTransition.getTransitionBoard(),
                                calculateQuiescenceDepth(board, move, depth),
                                currentHighest,
                                lowest));
                if (lowest <= currentHighest) {
                    break;
                }
            }
        }
        return currentHighest;
    }

    public int min(final Board board, final int depth, final int highest, final int lowest) {
        if (depth == 0 || BoardUtils.isEndGame(board)) {
            this.boardsEvaluated++;
            return this.evaluator.evaluate(board, depth);
        }
        int currentLowest = lowest;
        for (final Move move : this.moveSorter.sort((board.getCurrentPlayer().getLegalMoves()))) {
            final MoveTransition moveTransition = board.getCurrentPlayer().makeMove(move);
            if (moveTransition.getMoveStatus().isDone()) {
                currentLowest = Math.min(
                        currentLowest,
                        max(
                                moveTransition.getTransitionBoard(),
                                calculateQuiescenceDepth(board, move, depth),
                                highest,
                                currentLowest));
                if (currentLowest <= highest) {
                    break;
                }
            }
        }
        return currentLowest;
    }

    private int calculateQuiescenceDepth(final Board board, final Move move, final int depth) {
        return depth - 1;
    }

    private static String calculateTimeTaken(final long start, final long end) {
        final long timeTaken = (end - start) / 1000000;
        return timeTaken + " ms";
    }
}
