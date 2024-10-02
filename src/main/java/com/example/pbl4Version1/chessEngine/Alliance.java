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
			return BoardUtils.EIGHTH_RANK[position];
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
			return BoardUtils.FIRST_RANK[position];
		}
	};
	
	public int getOppositeDirection() {
		return -getDirection(); 
	}
	
	public abstract int getDirection();
	public abstract boolean isBlack();
	public abstract boolean isWhite();
	public abstract boolean isPawnPromotionSquare(int position);
	public abstract Player choosePlayer(final WhitePlayer whitePlayer, 
			final BlackPlayer blackPlayer);
}
