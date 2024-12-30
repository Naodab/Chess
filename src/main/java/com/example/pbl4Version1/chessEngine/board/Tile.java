package com.example.pbl4Version1.chessEngine.board;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import com.example.pbl4Version1.chessEngine.piece.Piece;
import com.google.common.collect.ImmutableMap;

public abstract class Tile {
    protected final int tileCoordinate;
    private static final Map<Integer, EmptyTile> EMPTY_TILES_CACHE = createAllPossibleEmptyTiles();

    private static Map<Integer, EmptyTile> createAllPossibleEmptyTiles() {
        final Map<Integer, EmptyTile> emptyTilesMap = new HashMap<Integer, Tile.EmptyTile>();
        for (int i = 0; i < BoardUtils.NUM_TILES; i++) {
            emptyTilesMap.put(i, new EmptyTile(i));
        }
        Collections.unmodifiableMap(emptyTilesMap);
        return ImmutableMap.copyOf(emptyTilesMap);
    }

    public static Tile createTile(final int coordinate, final Piece piece) {
        return piece != null ? new OccupiedTile(coordinate, piece) : EMPTY_TILES_CACHE.get(coordinate);
    }

    Tile(final int tileCordinate) {
        this.tileCoordinate = tileCordinate;
    }

    public int getTileCoordinate() {
        return this.tileCoordinate;
    }

    public abstract boolean isTileOccupied();

    public abstract Piece getPiece();

    public static final class EmptyTile extends Tile {
        EmptyTile(final int coordinate) {
            super(coordinate);
        }

        @Override
        public String toString() {
            return "-";
        }

        @Override
        public boolean isTileOccupied() {
            return false;
        }

        @Override
        public Piece getPiece() {
            return null;
        }
    }

    public static final class OccupiedTile extends Tile {
        private final Piece pieceOnTile;

        public OccupiedTile(final int coordinate, final Piece pieceOnTile) {
            super(coordinate);
            this.pieceOnTile = pieceOnTile;
        }

        @Override
        public boolean isTileOccupied() {
            return true;
        }

        @Override
        public Piece getPiece() {
            return this.pieceOnTile;
        }

        @Override
        public String toString() {
            return this.pieceOnTile.getPieceAlliance().isBlack()
                    ? this.pieceOnTile.toString().toLowerCase()
                    : this.pieceOnTile.toString();
        }
    }
}
