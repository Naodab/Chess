function blackPawn(current_position) {
    return {
        current_position,
        img: "../assets/img/pieces/black/pawn.png",
        piece_name: "BLACK_PAWN",
		piece_signal: 'p'
    };
}

function blackRook(current_position) {
    return {
        current_position,
        img: "../assets/img/pieces/black/rook.png",
        piece_name: "BLACK_ROOK",
		piece_signal: 'r'
    };
}

function blackKnight(current_position) {
    return {
        current_position,
        img: "../assets/img/pieces/black/knight.png",
        piece_name: "BLACK_KNIGHT",
		piece_signal: 'n'
    };
}

function blackBishop(current_position) {
    return {
        current_position,
        img: "../assets/img/pieces/black/bishop.png",
        piece_name: "BLACK_BISHOP",
		piece_signal: 'b'
    };
}

function blackQueen(current_position) {
    return {
        current_position,
        img: "../assets/img/pieces/black/queen.png",
        piece_name: "BLACK_QUEEN",
		piece_signal: 'q'
    };
}

function blackKing(current_position) {
    return {
        current_position,
        img: "../assets/img/pieces/black/king.png",
        piece_name: "BLACK_KING",
		piece_signal: 'k'
    };
}


function whitePawn(current_position) {
    return {
        current_position,
        img: "../assets/img/pieces/white/pawn.png",
        piece_name: "WHITE_PAWN",
		piece_signal: 'P'
    };
}

function whiteRook(current_position) {
    return {
        current_position,
        img: "../assets/img/pieces/white/rook.png",
        piece_name: "WHITE_ROOK",
		piece_signal: 'R'
    };
}

function whiteKnight(current_position) {
    return {
        current_position,
        img: "../assets/img/pieces/white/knight.png",
        piece_name: "WHITE_KNIGHT",
		piece_signal: 'N'
    };
}

function whiteBishop(current_position) {
    return {
        current_position,
        img: "../assets/img/pieces/white/bishop.png",
        piece_name: "WHITE_BISHOP",
		piece_signal: 'B'
    };
}

function whiteQueen(current_position) {
    return {
        current_position,
        img: "../assets/img/pieces/white/queen.png",
        piece_name: "WHITE_QUEEN",
		piece_signal: 'Q'
    };
}

function whiteKing(current_position) {
    return {
        current_position,
        img: "../assets/img/pieces/white/king.png",
        piece_name: "WHITE_KING",
		piece_signal: 'K'
    };
}

export {
    blackPawn, blackRook, blackBishop, blackKing, blackKnight, blackQueen,
    whitePawn, whiteRook, whiteBishop, whiteKing, whiteKnight, whiteQueen
};