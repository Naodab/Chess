function blackPawn(current_position) {
    return {
        current_position,
        img: "../assets/img/pieces/black/pawn.png",
        piece_name: "BLACK_PAWN",
		piece_signal: 'p',
        piece_icon: ""
    };
}

function blackRook(current_position) {
    return {
        current_position,
        img: "../assets/img/pieces/black/rook.png",
        piece_name: "BLACK_ROOK",
		piece_signal: 'r',
        piece_icon: '♜'
    };
}

function blackKnight(current_position) {
    return {
        current_position,
        img: "../assets/img/pieces/black/knight.png",
        piece_name: "BLACK_KNIGHT",
		piece_signal: 'n',
        piece_icon: '♞'
    };
}

function blackBishop(current_position) {
    return {
        current_position,
        img: "../assets/img/pieces/black/bishop.png",
        piece_name: "BLACK_BISHOP",
		piece_signal: 'b',
        piece_icon: '♝'
    };
}

function blackQueen(current_position) {
    return {
        current_position,
        img: "../assets/img/pieces/black/queen.png",
        piece_name: "BLACK_QUEEN",
		piece_signal: 'q',
        piece_icon: '♛'
    };
}

function blackKing(current_position) {
    return {
        current_position,
        img: "../assets/img/pieces/black/king.png",
        piece_name: "BLACK_KING",
		piece_signal: 'k',
        piece_icon: '♚'
    };
}


function whitePawn(current_position) {
    return {
        current_position,
        img: "../assets/img/pieces/white/pawn.png",
        piece_name: "WHITE_PAWN",
		piece_signal: 'P',
        piece_icon: ""
    };
}

function whiteRook(current_position) {
    return {
        current_position,
        img: "../assets/img/pieces/white/rook.png",
        piece_name: "WHITE_ROOK",
		piece_signal: 'R',
        piece_icon: '♖'
    };
}

function whiteKnight(current_position) {
    return {
        current_position,
        img: "../assets/img/pieces/white/knight.png",
        piece_name: "WHITE_KNIGHT",
		piece_signal: 'N',
        piece_icon: '♘'
    };
}

function whiteBishop(current_position) {
    return {
        current_position,
        img: "../assets/img/pieces/white/bishop.png",
        piece_name: "WHITE_BISHOP",
		piece_signal: 'B',
        piece_icon: '♗'
    };
}

function whiteQueen(current_position) {
    return {
        current_position,
        img: "../assets/img/pieces/white/queen.png",
        piece_name: "WHITE_QUEEN",
		piece_signal: 'Q',
        piece_icon: '♕'
    };
}

function whiteKing(current_position) {
    return {
        current_position,
        img: "../assets/img/pieces/white/king.png",
        piece_name: "WHITE_KING",
		piece_signal: 'K',
        piece_icon: '♔'
    };
}

export {
    blackPawn, blackRook, blackBishop, blackKing, blackKnight, blackQueen,
    whitePawn, whiteRook, whiteBishop, whiteKing, whiteKnight, whiteQueen
};