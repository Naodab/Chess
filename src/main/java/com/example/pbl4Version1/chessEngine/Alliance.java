package com.example.pbl4Version1.chessEngine;

import com.example.pbl4Version1.chessEngine.board.BoardUtils;
import com.example.pbl4Version1.chessEngine.player.BlackPlayer;
import com.example.pbl4Version1.chessEngine.player.Player;
import com.example.pbl4Version1.chessEngine.player.WhitePlayer;

public enum Alliance {
	WHITE {
		@Override
		public int getDirection() {
			return -1;
		}

		@Override
		public boolean isBlack() {
			return false;
		}

		@Override
		public boolean isWhite() {
			return true;
		}

		@Override
		public Player choosePlayer(final WhitePlayer whitePlayer,
				final BlackPlayer blackPlayer) {
			return whitePlayer;
		}

		@Override
		public boolean isPawnPromotionSquare(int position) {
			return BoardUtils.EIGHTH_ROW.get(position);
		}

		@Override
		public int pawnBonus(final int position) {
			return WHITE_PAWN_PREFERRED_COORDINATES[position];
		}

		@Override
		public int knightBonus(final int position) {
			return WHITE_KNIGHT_PREFERRED_COORDINATES[position];
		}

		@Override
		public int bishopBonus(final int position) {
			return WHITE_BISHOP_PREFERRED_COORDINATES[position];
		}

		@Override
		public int rookBonus(final int position) {
			return WHITE_ROOK_PREFERRED_COORDINATES[position];
		}

		@Override
		public int queenBonus(final int position) {
			return WHITE_QUEEN_PREFERRED_COORDINATES[position];
		}

		@Override
		public int kingBonus(final int position) {
			return WHITE_KING_PREFERRED_COORDINATES[position];
		}
	},
	BLACK {
		@Override
		public int getDirection() {
			return 1;
		}

		@Override
		public boolean isBlack() {
			return true;
		}

		@Override
		public boolean isWhite() {
			return false;
		}

		@Override
		public Player choosePlayer(final WhitePlayer whitePlayer, 
				final BlackPlayer blackPlayer) {
			return blackPlayer;
		}
		
		@Override
		public boolean isPawnPromotionSquare(int position) {
			return BoardUtils.FIRST_ROW.get(position);
		}

		@Override
		public int pawnBonus(final int position) {
			return BLACK_PAWN_PREFERRED_COORDINATES[position];
		}

		@Override
		public int knightBonus(final int position) {
			return BLACK_KNIGHT_PREFERRED_COORDINATES[position];
		}

		@Override
		public int bishopBonus(final int position) {
			return BLACK_BISHOP_PREFERRED_COORDINATES[position];
		}

		@Override
		public int rookBonus(final int position) {
			return BLACK_ROOK_PREFERRED_COORDINATES[position];
		}

		@Override
		public int queenBonus(final int position) {
			return BLACK_QUEEN_PREFERRED_COORDINATES[position];
		}

		@Override
		public int kingBonus(final int position) {
			return BLACK_KING_PREFERRED_COORDINATES[position];
		}
	};
	
	public int getOppositeDirection() {
		return -getDirection(); 
	}
	
	public abstract int getDirection();
	public abstract boolean isBlack();
	public abstract boolean isWhite();
	public abstract int pawnBonus(int position);
	public abstract int knightBonus(int position);
	public abstract int bishopBonus(int position);
	public abstract int rookBonus(int position);
	public abstract int queenBonus(int position);
	public abstract int kingBonus(int position);
	public abstract boolean isPawnPromotionSquare(int position);
	public abstract Player choosePlayer(final WhitePlayer whitePlayer, 
			final BlackPlayer blackPlayer);

	private final static int[] WHITE_PAWN_PREFERRED_COORDINATES = {
			0,  0,  0,  0,  0,  0,  0,  0,
			90, 90, 90, 90, 90, 90, 90, 90,
			30, 30, 40, 60, 60, 40, 30, 30,
			10, 10, 20, 40, 40, 20, 10, 10,
			5,  5, 10, 20, 20, 10,  5,  5,
			0,  0,  0,-10,-10,  0,  0,  0,
			5, -5,-10,  0,  0,-10, -5,  5,
			0,  0,  0,  0,  0,  0,  0,  0
	};

	private final static int[] BLACK_PAWN_PREFERRED_COORDINATES = {
			0,  0,  0,  0,  0,  0,  0,  0,
			5, -5,-10,  0,  0,-10, -5,  5,
			0,  0,  0,-10,-10,  0,  0,  0,
			5,  5, 10, 20, 20, 10,  5,  5,
			10, 10, 20, 40, 40, 20, 10, 10,
			30, 30, 40, 60, 60, 40, 30, 30,
			90, 90, 90, 90, 90, 90, 90, 90,
			0,  0,  0,  0,  0,  0,  0,  0
	};

	private final static int[] WHITE_KNIGHT_PREFERRED_COORDINATES = {
			-50,-40,-30,-30,-30,-30,-40,-50,
			-40,-20,  0,  5,  5,  0,-20,-40,
			-30,  5, 10, 15, 15, 10,  5,-30,
			-30,  5, 15, 20, 20, 15,  5,-30,
			-30,  5, 15, 20, 20, 15,  5,-30,
			-30,  5, 10, 15, 15, 10,  5,-30,
			-40,-20,  0,  0,  0,  0,-20,-40,
			-50,-40,-30,-30,-30,-30,-40,-50
	};

	private final static int[] BLACK_KNIGHT_PREFERRED_COORDINATES = {
			-50,-40,-30,-30,-30,-30,-40,-50,
			-40,-20,  0,  0,  0,  0,-20,-40,
			-30,  5, 10, 15, 15, 10,  5,-30,
			-30,  5, 15, 20, 20, 15,  5,-30,
			-30,  5, 15, 20, 20, 15,  5,-30,
			-30,  5, 10, 15, 15, 10,  5,-30,
			-40,-20,  0,  5,  5,  0,-20,-40,
			-50,-40,-30,-30,-30,-30,-40,-50,
	};

	private final static int[] WHITE_BISHOP_PREFERRED_COORDINATES = {
			-20,-10,-10,-10,-10,-10,-10,-20,
			-10,  0,  0,  0,  0,  0,  0,-10,
			-10,  0,  5, 10, 10,  5,  0,-10,
			-10,  5,  5, 10, 10,  5,  5,-10,
			-10,  0, 10, 15, 15, 10,  0,-10,
			-10, 10, 10, 10, 10, 10, 10,-10,
			-10,  5,  0,  0,  0,  0,  5,-10,
			-20,-10,-10,-10,-10,-10,-10,-20
	};

	private final static int[] BLACK_BISHOP_PREFERRED_COORDINATES = {
			-20,-10,-10,-10,-10,-10,-10,-20,
			-10,  5,  0,  0,  0,  0,  5,-10,
			-10, 10, 10, 10, 10, 10, 10,-10,
			-10,  0, 10, 15, 15, 10,  0,-10,
			-10,  5, 10, 15, 15, 10,  5,-10,
			-10,  0, 10, 10, 10, 10,  0,-10,
			-10,  0,  0,  0,  0,  0,  0,-10,
			-20,-10,-10,-10,-10,-10,-10,-20
	};

	private final static int[] WHITE_ROOK_PREFERRED_COORDINATES = {
			0,  0,  0,  0,  0,  0,  0,  0,
			5, 20, 20, 20, 20, 20, 20,  5,
			-5,  0,  0,  0,  0,  0,  0, -5,
			-5,  0,  0,  0,  0,  0,  0, -5,
			-5,  0,  0,  0,  0,  0,  0, -5,
			-5,  0,  0,  0,  0,  0,  0, -5,
			-5,  0,  0,  0,  0,  0,  0, -5,
			0,  0,  0,  5,  5,  0,  0,  0
	};

	private final static int[] BLACK_ROOK_PREFERRED_COORDINATES = {
			0,  0,  0,  5,  5,  0,  0,  0,
			-5,  0,  0,  0,  0,  0,  0, -5,
			-5,  0,  0,  0,  0,  0,  0, -5,
			-5,  0,  0,  0,  0,  0,  0, -5,
			-5,  0,  0,  0,  0,  0,  0, -5,
			-5,  0,  0,  0,  0,  0,  0, -5,
			5, 20, 20, 20, 20, 20, 20,  5,
			0,  0,  0,  0,  0,  0,  0,  0,
	};

	private final static int[] WHITE_QUEEN_PREFERRED_COORDINATES = {
			-20,-10,-10, -5, -5,-10,-10,-20,
			-10,  0,  0,  0,  0,  0,  0,-10,
			-10,  0,  5,  5,  5,  5,  0,-10,
			-5,  0,  5, 10, 10,  5,  0, -5,
			-5,  0,  5, 10, 10,  5,  0, -5,
			-10,  0,  5,  5,  5,  5,  0,-10,
			-10,  0,  0,  0,  0,  0,  0,-10,
			-20,-10,-10, -5, -5,-10,-10,-20
	};

	private final static int[] BLACK_QUEEN_PREFERRED_COORDINATES = {
			-20,-10,-10, -5, -5,-10,-10,-20,
			-10,  0,  5,  0,  0,  0,  0,-10,
			-10,  5,  5,  5,  5,  5,  0,-10,
			-5,  0,  5, 10, 10,  5,  0, -5,
			-5,  0,  5, 10, 10,  5,  0, -5,
			-10,  0,  5,  5,  5,  5,  0,-10,
			-10,  0,  0,  0,  0,  0,  0,-10,
			-20,-10,-10, -5, -5,-10,-10,-20
	};

	private final static int[] WHITE_KING_PREFERRED_COORDINATES = {
			-50,-30,-30,-30,-30,-30,-30,-50,
			-30,-30,  0,  0,  0,  0,-30,-30,
			-30,-10, 20, 30, 30, 20,-10,-30,
			-30,-10, 30, 40, 40, 30,-10,-30,
			-30,-10, 30, 40, 40, 30,-10,-30,
			-30,-10, 20, 30, 30, 20,-10,-30,
			-30,-20,-10,  0,  0,-10,-20,-30,
			-50,-40,-30,-20,-20,-30,-40,-50
	};

	private final static int[] BLACK_KING_PREFERRED_COORDINATES = {
			-50,-40,-30,-20,-20,-30,-40,-50,
			-30,-20,-10,  0,  0,-10,-20,-30,
			-30,-10, 20, 30, 30, 20,-10,-30,
			-30,-10, 30, 40, 40, 30,-10,-30,
			-30,-10, 30, 40, 40, 30,-10,-30,
			-30,-10, 20, 30, 30, 20,-10,-30,
			-30,-30,  0,  0,  0,  0,-30,-30,
			-50,-30,-30,-30,-30,-30,-30,-50
	};

	private static final int UP_DIRECTION = -1;

	private static final int DOWN_DIRECTION = 1;

}
