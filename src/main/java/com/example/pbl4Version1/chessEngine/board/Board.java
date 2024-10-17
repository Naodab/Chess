package com.example.pbl4Version1.chessEngine.board;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.pbl4Version1.chessEngine.Alliance;
import com.example.pbl4Version1.chessEngine.piece.Bishop;
import com.example.pbl4Version1.chessEngine.piece.King;
import com.example.pbl4Version1.chessEngine.piece.Knight;
import com.example.pbl4Version1.chessEngine.piece.Pawn;
import com.example.pbl4Version1.chessEngine.piece.Piece;
import com.example.pbl4Version1.chessEngine.piece.Queen;
import com.example.pbl4Version1.chessEngine.piece.Rook;
import com.example.pbl4Version1.chessEngine.player.BlackPlayer;
import com.example.pbl4Version1.chessEngine.player.Player;
import com.example.pbl4Version1.chessEngine.player.WhitePlayer;
import com.google.common.collect.ImmutableList;
import com.google.common.collect.Iterables;

public class Board {
	private final List<Tile> gameBoard;
	private final Collection<Piece> whitePieces;
	private final Collection<Piece> blackPieces;

	private final WhitePlayer whitePlayer;
	private final BlackPlayer blackPlayer;
	private final Player currentPlayer;

	private final Pawn enPassantPawn;

	private Board(final Builder builder) {
		this.gameBoard = createGameBoard(builder);
		this.whitePieces = calculateActivePieces(this.gameBoard, Alliance.WHITE);
		this.blackPieces = calculateActivePieces(this.gameBoard, Alliance.BLACK);
		this.enPassantPawn = builder.getEnPassantPawn();
		final Collection<Move> whiteStandardLegalMoves = calculateLegalMoves(this.whitePieces);
		final Collection<Move> blackStandardLegalMoves = calculateLegalMoves(this.blackPieces);

		this.whitePlayer = new WhitePlayer(this, whiteStandardLegalMoves, blackStandardLegalMoves);
		this.blackPlayer = new BlackPlayer(this, whiteStandardLegalMoves, blackStandardLegalMoves);
		this.currentPlayer = builder.getNextMoveMaker().choosePlayer(this.whitePlayer, this.blackPlayer);
	}

	public Tile getTile(final int tileCoordinate) {
		return gameBoard.get(tileCoordinate);
	}

	public Collection<Piece> getWhitePieces() {
		return this.whitePieces;
	}

	public Collection<Piece> getBlackPieces() {
		return this.blackPieces;
	}

	public WhitePlayer getWhitePlayer() {
		return whitePlayer;
	}

	public BlackPlayer getBlackPlayer() {
		return blackPlayer;
	}

	public Player getCurrentPlayer() {
		return this.currentPlayer;
	}

	public Pawn getEnPassantPawn() {
		return this.enPassantPawn;
	}

	public Iterable<Move> getAllLegalMoves() {
		return Iterables.unmodifiableIterable(
				Iterables.concat(this.whitePlayer.getLegalMoves(), this.blackPlayer.getLegalMoves()));
	}

	@Override
	public String toString() {
		final StringBuilder builder = new StringBuilder();
		for (int i = 0; i < BoardUtils.NUM_TILES; i++) {
			final String tileText = this.gameBoard.get(i).toString();
			builder.append(String.format("%3s", tileText));
			if ((i + 1) % BoardUtils.NUM_TILES_PER_ROW == 0)
				builder.append("\n");
		}
		return builder.toString();
	}

	private Collection<Move> calculateLegalMoves(final Collection<Piece> pieces) {
		List<Move> legalMoves = new ArrayList<Move>();
		for (final Piece piece : pieces) {
			legalMoves.addAll(piece.calculateLegalMoves(this));
		}
		return ImmutableList.copyOf(legalMoves);
	}

	private Collection<Piece> calculateActivePieces(List<Tile> gameBoard, Alliance alliance) {
		final List<Piece> activePieces = new ArrayList<Piece>();
		for (final Tile tile : gameBoard) {
			if (tile.isTileOccupied()) {
				Piece piece = tile.getPiece();
				if (piece.getPieceAlliance() == alliance) {
					activePieces.add(piece);
				}
			}
		}
		return ImmutableList.copyOf(activePieces);
	}

	private static List<Tile> createGameBoard(Builder builder) {
		final Tile[] tiles = new Tile[BoardUtils.NUM_TILES];
		for (int i = 0; i < BoardUtils.NUM_TILES; i++) {
			tiles[i] = Tile.createTile(i, builder.boardConfig.get(i));
		}
		return ImmutableList.copyOf(tiles);
	}

	public static Board createStandardBoard() {
		final Builder builder = new Builder();

		builder.setPiece(new Rook(0, Alliance.BLACK));
		builder.setPiece(new Knight(1, Alliance.BLACK));
		builder.setPiece(new Bishop(2, Alliance.BLACK));
		builder.setPiece(new Queen(3, Alliance.BLACK));
		builder.setPiece(new King(4, Alliance.BLACK));
		builder.setPiece(new Bishop(5, Alliance.BLACK));
		builder.setPiece(new Knight(6, Alliance.BLACK));
		builder.setPiece(new Rook(7, Alliance.BLACK));
		builder.setPiece(new Pawn(8, Alliance.BLACK));
		builder.setPiece(new Pawn(9, Alliance.BLACK));
		builder.setPiece(new Pawn(10, Alliance.BLACK));
		builder.setPiece(new Pawn(11, Alliance.BLACK));
		builder.setPiece(new Pawn(12, Alliance.BLACK));
		builder.setPiece(new Pawn(13, Alliance.BLACK));
		builder.setPiece(new Pawn(14, Alliance.BLACK));
		builder.setPiece(new Pawn(15, Alliance.BLACK));

		builder.setPiece(new Pawn(48, Alliance.WHITE));
		builder.setPiece(new Pawn(49, Alliance.WHITE));
		builder.setPiece(new Pawn(50, Alliance.WHITE));
		builder.setPiece(new Pawn(51, Alliance.WHITE));
		builder.setPiece(new Pawn(52, Alliance.WHITE));
		builder.setPiece(new Pawn(53, Alliance.WHITE));
		builder.setPiece(new Pawn(54, Alliance.WHITE));
		builder.setPiece(new Pawn(55, Alliance.WHITE));
		builder.setPiece(new Rook(56, Alliance.WHITE));
		builder.setPiece(new Knight(57, Alliance.WHITE));
		builder.setPiece(new Bishop(58, Alliance.WHITE));
		builder.setPiece(new Queen(59, Alliance.WHITE));
		builder.setPiece(new King(60, Alliance.WHITE));
		builder.setPiece(new Bishop(61, Alliance.WHITE));
		builder.setPiece(new Knight(62, Alliance.WHITE));
		builder.setPiece(new Rook(63, Alliance.WHITE));

		builder.setMoveMaker(Alliance.WHITE);

		return builder.build();
	}

	public static Board createBoardFromMap(List<List<String>> map) {
		final Builder builder = new Builder();
		for (int i = 0; i < BoardUtils.NUM_TILES_PER_ROW; i++) {
			for (int j = 0; j < BoardUtils.NUM_TILES_PER_ROW; j++) {
				String name = map.get(i).get(j);
				System.out.println(name);
				int position = i * BoardUtils.NUM_TILES_PER_ROW + j;
				if (name.equals("WHITE_PAWN")) {
					builder.setPiece(new Pawn(position, Alliance.WHITE));
				} else if (name.equals("WHITE_ROOK")) {
					builder.setPiece(new Rook(position, Alliance.WHITE));
				} else if (name.equals("WHITE_KNIGHT")) {
					builder.setPiece(new Knight(position, Alliance.WHITE));
				} else if (name.equals("WHITE_BISHOP")) {
					builder.setPiece(new Bishop(position, Alliance.WHITE));
				} else if (name.equals("WHITE_QUEEN")) {
					builder.setPiece(new Queen(position, Alliance.WHITE));
				} else if (name.equals("WHITE_KING")) {
					builder.setPiece(new King(position, Alliance.WHITE));
				} else if (name.equals("BLACK_PAWN")) {
					builder.setPiece(new Pawn(position, Alliance.BLACK));
				} else if (name.equals("BLACK_ROOK")) {
					builder.setPiece(new Rook(position, Alliance.BLACK));
				} else if (name.equals("BLACK_KNIGHT")) {
					builder.setPiece(new Knight(position, Alliance.BLACK));
				} else if (name.equals("BLACK_BISHOP")) {
					builder.setPiece(new Bishop(position, Alliance.BLACK));
				} else if (name.equals("BLACK_QUEEN")) {
					builder.setPiece(new Queen(position, Alliance.BLACK));
				} else if (name.equals("BLACK_KING")) {
					builder.setPiece(new King(position, Alliance.BLACK));
				}
			}
		}
		builder.setMoveMaker(Alliance.BLACK);
		return builder.build();
	}

	// FEN format: rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1;
	public static Board createByFEN(String fen) {
		Builder builder = new Builder();
		String[] info = fen.split(" ");
		String[] rows = info[0].split("/");
		int posEnpassantPawn = info[3].equals("-") ? -1 : BoardUtils.getCoordinateAtPosition(info[3]);
		System.out.println(BoardUtils.getCoordinateAtPosition(info[3]));
		int position = 0;

		for (String row : rows) {
			for (char c : row.toCharArray()) {
				if (Character.isDigit(c)) {
					int emptySpaces = Character.getNumericValue(c);
					position += emptySpaces;
				} else {
					if (c == 'p') {
						System.out.println(BoardUtils.getPositionAtCoordinate(position));
						Pawn pawn = new Pawn(position, Alliance.BLACK);
						builder.setPiece(pawn);
						if (posEnpassantPawn == position) {
							builder.setEnPassantPawn(pawn);
						}
					} else if (c == 'r') {
						if ((position == 0 && info[2].contains("q")) || (position == 7 && info[2].contains("k"))) {
							builder.setPiece(new Rook(position, Alliance.BLACK));
						} else {
							builder.setPiece(new Rook(position, Alliance.BLACK, false));
						}
					} else if (c == 'n') {
						builder.setPiece(new Knight(position, Alliance.BLACK));
					} else if (c == 'b') {
						builder.setPiece(new Bishop(position, Alliance.BLACK));
					} else if (c == 'q') {
						builder.setPiece(new Queen(position, Alliance.BLACK));
					} else if (c == 'k') {
						builder.setPiece(new King(position, Alliance.BLACK));
					} else if (c == 'P') {
						System.out.println(BoardUtils.getPositionAtCoordinate(position));
						Pawn pawn = new Pawn(position, Alliance.WHITE);
						builder.setPiece(pawn);
						if (posEnpassantPawn == position) {
							builder.setEnPassantPawn(pawn);
						}
					} else if (c == 'R') {
						if ((position == 56 && info[2].contains("Q")) || (position == 63 && info[2].contains("K"))) {
							builder.setPiece(new Rook(position, Alliance.WHITE));
						} else {
							builder.setPiece(new Rook(position, Alliance.WHITE, false));
						}
					} else if (c == 'N') {
						builder.setPiece(new Knight(position, Alliance.WHITE));
					} else if (c == 'B') {
						builder.setPiece(new Bishop(position, Alliance.WHITE));
					} else if (c == 'Q') {
						builder.setPiece(new Queen(position, Alliance.WHITE));
					} else if (c == 'K') {
						builder.setPiece(new King(position, Alliance.WHITE));
					}
					position++;
				}
			}
		}

		builder.setMoveMaker(Alliance.WHITE);
		if (info[1].equals("b"))
			builder.setMoveMaker(Alliance.BLACK);

		return builder.build();
	}

	public String calculateCanCastle(final Collection<Piece> pieces, final Alliance alliance) {
		StringBuilder builder = new StringBuilder();
		boolean kingCanCastle = false;
		boolean rookKingSideCanCastle = false;
		boolean rookQueenSideCanCastle = false;

		for (Piece piece : whitePieces) {
			if (piece.getPieceType().isKing() && piece.isFirstMove()) {
				kingCanCastle = true;
			}
			if (piece.getPieceType().isRook() && piece.isFirstMove()) {
				if (piece.getPiecePosition() == 0 || piece.getPiecePosition() == 56)
					rookQueenSideCanCastle = true;
				else
					rookKingSideCanCastle = true;
			}
		}

		if (kingCanCastle && rookKingSideCanCastle) {
			builder.append("k");
		}
		if (kingCanCastle && rookQueenSideCanCastle) {
			builder.append("q");
		}

		return alliance.isWhite() ? builder.toString().toUpperCase() : builder.toString();
	}

	public String genrateFen() {
		final StringBuilder builder = new StringBuilder();
		int countEmpty = 0;
		for (int i = 0; i < BoardUtils.NUM_TILES; i++) {
			Tile tile = this.gameBoard.get(i);
			if (tile.isTileOccupied()) {
				if (countEmpty != 0) {
					builder.append(countEmpty);
					countEmpty = 0;
				}
				builder.append(tile.toString());
			} else {
				countEmpty++;
			}
			if ((i + 1) % BoardUtils.NUM_TILES_PER_ROW == 0) {
				if (countEmpty != 0) {
					builder.append(countEmpty);
					countEmpty = 0;
				}
				builder.append("/");
			}
		}

		if (this.getCurrentPlayer().getAlliance().isWhite()) {
			builder.append(" w ");
		} else {
			builder.append(" b ");
		}

		String castleWhite = calculateCanCastle(whitePieces, Alliance.WHITE);
		String castleBlack = calculateCanCastle(blackPieces, Alliance.BLACK);
		builder.append(castleWhite + castleBlack + " ");

		if (this.getEnPassantPawn() != null) {
			builder.append(this.getEnPassantPawn().getPiecePosition() + " ");
		} else {
			builder.append("- ");
		}

		return builder.toString();
	}

	public static class Builder {
		private Map<Integer, Piece> boardConfig;
		private Alliance nextMoveMaker;
		private Pawn enPassantPawn;

		public Builder() {
			this.boardConfig = new HashMap<Integer, Piece>();
		}

		public Builder setPiece(final Piece piece) {
			this.boardConfig.put(piece.getPiecePosition(), piece);
			return this;
		}

		public Builder setMoveMaker(final Alliance nextMoveMaker) {
			this.nextMoveMaker = nextMoveMaker;
			return this;
		}

		public Board build() {
			return new Board(this);
		}

		public Alliance getNextMoveMaker() {
			return this.nextMoveMaker;
		}

		public void setEnPassantPawn(Pawn enPassantPawn) {
			this.enPassantPawn = enPassantPawn;
		}

		public Pawn getEnPassantPawn() {
			return this.enPassantPawn;
		}
	}

	public static void main(String[] args) {
		String fen = "rnbqkbnr/ppp1pppp/8/3pP3/8/8/PPP2PPP/RNBQKBNR w KQkq e5 0 3";
		Board board = Board.createByFEN(fen);
		System.out.println(board);
		System.out.println(board.genrateFen());
		for (int i = 0; i < 64; i++) {
			System.out.println(BoardUtils.getPositionAtCoordinate(i));
		}
	}
}
