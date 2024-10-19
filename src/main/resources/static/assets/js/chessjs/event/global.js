import {
    ROOT_DIV,
    SQUARE_SELECTOR,
    PROMPT_PIECE,
    MOVE_SOUND
} from "../helper/constants.js"
import { globalState } from "../index.js";
import {
    selfHighlight,
    clearPreviousSelfHighlight,
    moveElement,
    clearHighlight,
    globalStateRender,
    deletePiece,
    generateFen,
    beginPromotionPawn,
    finishPromotionPawn
} from "../render/main.js";
import {
    checkPieceOfOpponentOnElement,
    willBeInCheck,
    getPieceAtPosition
} from "../helper/commonHelper.js";

let highlight_state = false;
let previousHighlight = null;
let moveState = null;
let turnWhite = true;
let enPassantPawn;
let enPassantMove;
let turn = 0;

function clearHighlightLocal() {
    clearHighlight();
    highlight_state = false;
}

function changeTurn(turn) {
    turnWhite = turn;
}

function setTurnNumber(num) {
    turn = num;
}

function setEnPassantMove(position) {
    enPassantMove = position;
    if (position.includes("3") || position.includes("6")) {
        console.log(getPieceAtPosition(position));
        enPassantPawn = getPieceAtPosition(position);
    }
}

function highlightLocal(legalMoves) {
    legalMoves.normal.forEach(element => {
        globalState.forEach(row => {
            row.forEach(ele => {
                if (ele.id === element) {
                    ele.highlight = true;
                }
            });
        });
    });

    legalMoves.attack.forEach(dest => {
        document.getElementById(dest).classList.add("capturedColor");
        globalState.forEach(row => {
            row.forEach(ele => {
                if (ele.id === dest) {
                    ele.highlightCaptured = true;
                    ele.highlight = true;
                }
            });
        });
    });
}

function calculatePawnLegalMove({ current_position }, color, check = checkPieceOfOpponentOnElement) {
    const m = (color === "white") ? 1 : -1;
    const firstRow = (color === "white") ? "2" : "7";
    const normal = [];
    const attack = [];

    const candidate = `${current_position[0]}${Number(current_position[1]) + m}`;
    if (!check(candidate)) {
        normal.push(candidate);
        if (current_position[1] === firstRow) {
            const doubleCandidate = `${current_position[0]}${Number(current_position[1]) + 2 * m}`;
            if (!check(doubleCandidate))
                normal.push(doubleCandidate);
        }
    }

    const captureIds = [
        `${String.fromCharCode(current_position.charCodeAt(0) - 1)}${Number(current_position[1]) + m}`,
        `${String.fromCharCode(current_position.charCodeAt(0) + 1)}${Number(current_position[1]) + m}`
    ];

    captureIds.forEach(col => {
        if (check(col, color))
            attack.push(col);
    });

    return { normal, attack };
}

function calculateRookLegalMove({ current_position }, color, check = checkPieceOfOpponentOnElement) {
    const normal = [];
    const attack = [];

    const col = current_position.charCodeAt(0);
    const row = Number(current_position[1]);

    for (let i = col + 1; i <= 104; i++) {
        let candidate = `${String.fromCharCode(i)}${row}`;
        if (check(candidate)) {
            if (check(candidate, color)) {
                attack.push(candidate);
            }
            break;
        }
        normal.push(candidate);
    }

    for (let i = col - 1; i >= 97; i--) {
        let candidate = `${String.fromCharCode(i)}${row}`;
        if (check(candidate)) {
            if (check(candidate, color)) {
                attack.push(candidate);
            }
            break;
        }
        normal.push(candidate);
    }

    for (let i = row + 1; i <= 8; i++) {
        let candidate = `${String.fromCharCode(col)}${i}`;
        if (check(candidate)) {
            if (check(candidate, color)) {
                attack.push(candidate);
            }
            break;
        }
        normal.push(candidate);
    }

    for (let i = row - 1; i > 0; i--) {
        let candidate = `${String.fromCharCode(col)}${i}`;
        if (check(candidate)) {
            if (check(candidate, color)) {
                attack.push(candidate);
            }
            break;
        }
        normal.push(candidate);
    }

    return { normal, attack };
}

function calculateKnightLegalMove({ current_position }, color, check = checkPieceOfOpponentOnElement) {
    const normal = [];
    const attack = [];

    const col = current_position.charCodeAt(0);
    const row = Number(current_position[1]);

    const dx = [2, -2];
    const dy = [1, -1];
    dx.forEach(x => {
        dy.forEach(y => {
            let candidates = [
                `${String.fromCharCode(col + y)}${row + x}`,
                `${String.fromCharCode(col + x)}${row + y}`
            ];

            candidates.forEach(candidate => {
                if (check(candidate)) {
                    if (check(candidate, color)) {
                        attack.push(candidate);
                    }
                } else {
                    normal.push(candidate);
                }
            });
        });
    });

    return { normal, attack };
}

function calculateBishopLegalMove({ current_position }, color, check = checkPieceOfOpponentOnElement) {
    const normal = [];
    const attack = [];

    const col = current_position.charCodeAt(0);
    const row = Number(current_position[1]);

    for (let i = col + 1, j = row + 1; i <= 104 && j <= 8; i++, j++) {
        let candidate = `${String.fromCharCode(i)}${j}`;
        if (check(candidate)) {
            if (check(candidate, color)) {
                attack.push(candidate);
            }
            break;
        }
        normal.push(candidate);
    }

    for (let i = col + 1, j = row - 1; i <= 104 && j > 0; i++, j--) {
        let candidate = `${String.fromCharCode(i)}${j}`;
        if (check(candidate)) {
            if (check(candidate, color)) {
                attack.push(candidate);
            }
            break;
        }
        normal.push(candidate);
    }

    for (let i = col - 1, j = row + 1; i >= 97 && j <= 8; i--, j++) {
        let candidate = `${String.fromCharCode(i)}${j}`;
        if (check(candidate)) {
            if (check(candidate, color)) {
                attack.push(candidate);
            }
            break;
        }
        normal.push(candidate);
    }

    for (let i = col - 1, j = row - 1; i >= 97 && j > 0; i--, j--) {
        let candidate = `${String.fromCharCode(i)}${j}`;
        if (check(candidate)) {
            if (check(candidate, color)) {
                attack.push(candidate);
            }
            break;
        }
        normal.push(candidate);
    }

    return { normal, attack };
}

function calculateQueenLegalMove({ current_position }, color, check = checkPieceOfOpponentOnElement) {
    const normal = [];
    const attack = [];

    const col = current_position.charCodeAt(0);
    const row = Number(current_position[1]);

    for (let i = col + 1, j = row + 1; i <= 104 && j <= 8; i++, j++) {
        let candidate = `${String.fromCharCode(i)}${j}`;
        if (check(candidate)) {
            if (check(candidate, color)) {
                attack.push(candidate);
            }
            break;
        }
        normal.push(candidate);
    }

    for (let i = col + 1, j = row - 1; i <= 104 && j > 0; i++, j--) {
        let candidate = `${String.fromCharCode(i)}${j}`;
        if (check(candidate)) {
            if (check(candidate, color)) {
                attack.push(candidate);
            }
            break;
        }
        normal.push(candidate);
    }

    for (let i = col - 1, j = row + 1; i >= 97 && j <= 8; i--, j++) {
        let candidate = `${String.fromCharCode(i)}${j}`;
        if (check(candidate)) {
            if (check(candidate, color)) {
                attack.push(candidate);
            }
            break;
        }
        normal.push(candidate);
    }

    for (let i = col - 1, j = row - 1; i >= 97 && j > 0; i--, j--) {
        let candidate = `${String.fromCharCode(i)}${j}`;
        if (check(candidate)) {
            if (check(candidate, color)) {
                attack.push(candidate);
            }
            break;
        }
        normal.push(candidate);
    }

    for (let i = col + 1; i <= 104; i++) {
        let candidate = `${String.fromCharCode(i)}${row}`;
        if (check(candidate)) {
            if (check(candidate, color)) {
                attack.push(candidate);
            }
            break;
        }
        normal.push(candidate);
    }

    for (let i = col - 1; i >= 97; i--) {
        let candidate = `${String.fromCharCode(i)}${row}`;
        if (check(candidate)) {
            if (check(candidate, color)) {
                attack.push(candidate);
            }
            break;
        }
        normal.push(candidate);
    }

    for (let i = row + 1; i <= 8; i++) {
        let candidate = `${String.fromCharCode(col)}${i}`;
        if (check(candidate)) {
            if (check(candidate, color)) {
                attack.push(candidate);
            }
            break;
        }
        normal.push(candidate);
    }

    for (let i = row - 1; i > 0; i--) {
        let candidate = `${String.fromCharCode(col)}${i}`;
        if (check(candidate)) {
            if (check(candidate, color)) {
                attack.push(candidate);
            }
            break;
        }
        normal.push(candidate);
    }

    return { normal, attack };
}

function calculateKingLegalMove(piece, color, check = checkPieceOfOpponentOnElement) {
    const normal = [];
    const attack = [];

    const col = piece.current_position.charCodeAt(0);
    const row = Number(piece.current_position[1]);

    const candidates = [
        `${String.fromCharCode(col)}${row + 1}`,
        `${String.fromCharCode(col + 1)}${row + 1}`,
        `${String.fromCharCode(col + 1)}${row}`,
        `${String.fromCharCode(col + 1)}${row - 1}`,
        `${String.fromCharCode(col)}${row - 1}`,
        `${String.fromCharCode(col - 1)}${row - 1}`,
        `${String.fromCharCode(col - 1)}${row}`,
        `${String.fromCharCode(col - 1)}${row + 1}`,
    ];

    candidates.forEach(candidate => {
        if (check(candidate)) {
            if (check(candidate, color)) {
                attack.push(candidate);
            }
        } else {
            normal.push(candidate);
        }
    });

    return { normal, attack };
}

function calculateLegalMoves(color, board = globalState, check = checkPieceOfOpponentOnElement) {
    let normal = [];
    let attack = [];
    const colorUpper = color.toUpperCase();
    board.forEach(row => {
        row.forEach(square => {
            if (square.piece && square.piece.piece_name.includes(colorUpper)) {
                const piece = square.piece;
                let legalMoves;
                if (piece.piece_name.includes(colorUpper + "_PAWN")) {
                    legalMoves = calculatePawnLegalMove(piece, color, check);
                } else if (piece.piece_name.includes(colorUpper + "_ROOK")) {
                    legalMoves = calculateRookLegalMove(piece, color, check);
                } else if (piece.piece_name.includes(colorUpper + "_KNIGHT")) {
                    legalMoves = calculateKnightLegalMove(piece, color, check);
                } else if (piece.piece_name.includes(colorUpper + "_BISHOP")) {
                    legalMoves = calculateBishopLegalMove(piece, color, check);
                } else if (piece.piece_name.includes(colorUpper + "_QUEEN")) {
                    legalMoves = calculateQueenLegalMove(piece, color, check);
                } else if (piece.piece_name.includes(colorUpper + "_KING")) {
                    legalMoves = calculateKingLegalMove(piece, color, check);
                }
                normal = normal.concat(legalMoves.normal);
                attack = attack.concat(legalMoves.attack);
            }
        });
    });
    return { normal, attack };
}

function whitePawnClick({ piece }) {
    if (highlight_state) {
        const square = document.getElementById(piece.current_position);
        if (piece.current_position === previousHighlight.current_position || !turnWhite) {
            moveOrCancelMove(square);
            return;
        }
    }
    if (!turnWhite) {
        return;
    }

    clearHighlight();
    clearPreviousSelfHighlight(previousHighlight);

    //highlighting logic
    selfHighlight(piece);
    highlight_state = true;
    moveState = piece;
    previousHighlight = piece;
    const legalMoves = calculatePawnLegalMove(piece, "white");

    if (enPassantPawn && enPassantPawn.piece_name.includes("BLACK")
        && Math.abs(enPassantPawn.current_position.charCodeAt(0) - piece.current_position.charCodeAt(0)) === 1
        && enPassantPawn.current_position.includes(piece.current_position[1])) {
        legalMoves.attack.push(enPassantMove);
    }

    highlightLocal(legalMoves);
    globalStateRender();
}

function whiteRookClick({ piece }) {
    if (highlight_state) {
        const square = document.getElementById(piece.current_position);
        if (piece.current_position === previousHighlight.current_position || !turnWhite) {
            moveOrCancelMove(square);
            return;
        }
    }
    if (!turnWhite) {
        return;
    }

    clearHighlight();
    clearPreviousSelfHighlight(previousHighlight);

    //highlighting logic
    selfHighlight(piece);
    highlight_state = true;
    moveState = piece;
    previousHighlight = piece;

    highlightLocal(calculateRookLegalMove(piece, "white"));
    globalStateRender();
}

function whiteKnightClick({ piece }) {
    if (highlight_state) {
        const square = document.getElementById(piece.current_position);
        if (piece.current_position === previousHighlight.current_position || !turnWhite) {
            moveOrCancelMove(square);
            return;
        }
    }
    if (!turnWhite) {
        return;
    }

    clearHighlight();
    clearPreviousSelfHighlight(previousHighlight);

    //highlighting logic
    selfHighlight(piece);
    highlight_state = true;
    moveState = piece;
    previousHighlight = piece;

    highlightLocal(calculateKnightLegalMove(piece, "white"));
    globalStateRender();
}

function whiteBishopClick({ piece }) {
    if (highlight_state) {
        const square = document.getElementById(piece.current_position);
        if (piece.current_position === previousHighlight.current_position || !turnWhite) {
            moveOrCancelMove(square);
            return;
        }
    }
    if (!turnWhite) {
        return;
    }

    clearHighlight();
    clearPreviousSelfHighlight(previousHighlight);

    //highlighting logic
    selfHighlight(piece);
    highlight_state = true;
    moveState = piece;
    previousHighlight = piece;

    highlightLocal(calculateBishopLegalMove(piece, "white"));
    globalStateRender();
}

function whiteQueenClick({ piece }) {
    if (highlight_state) {
        const square = document.getElementById(piece.current_position);
        if (piece.current_position === previousHighlight.current_position || !turnWhite) {
            moveOrCancelMove(square);
            return;
        }
    }
    if (!turnWhite) {
        return;
    }

    clearHighlight();
    clearPreviousSelfHighlight(previousHighlight);

    //highlighting logic
    selfHighlight(piece);
    highlight_state = true;
    moveState = piece;
    previousHighlight = piece;

    highlightLocal(calculateQueenLegalMove(piece, "white"));
    globalStateRender();
}

function whiteKingClick({ piece }) {
    if (highlight_state) {
        const square = document.getElementById(piece.current_position);
        if (piece.current_position === previousHighlight.current_position || !turnWhite) {
            moveOrCancelMove(square);
            return;
        }
    }
    if (!turnWhite) {
        return;
    }

    clearHighlight();
    clearPreviousSelfHighlight(previousHighlight);

    //highlighting logic
    selfHighlight(piece);
    highlight_state = true;
    moveState = piece;
    previousHighlight = piece;

    const legalMoves = calculateKingLegalMove(piece, "white");
    const opponentLegalMoves = calculateLegalMoves("black");
    if (!opponentLegalMoves.attack.includes(piece.current_position) && !piece.moved) {
        const rookValid = [];
        globalState.forEach(row => {
            row.forEach(element => {
                if (element.piece && element.piece.piece_name.includes("WHITE_ROOK") && !element.piece.moved) {
                    rookValid.push(element.piece);
                }
            });
        });

        rookValid.forEach(rook => {
            let queenSide = true;
            let start = rook.current_position.charCodeAt(0);
            let end = "e".charCodeAt(0);
            if (start > end) {
                let tmp = start;
                start = end;
                end = tmp;
                queenSide = false;
            }
            let accepted = false;
            for (let i = start + 1; i < end; i++) {
                const squareId = `${String.fromCharCode(i)}1`;
                if (checkPieceOfOpponentOnElement(squareId) || opponentLegalMoves.normal.includes(squareId)) {
                    break;
                }
                accepted = true;
            }
            if (accepted) {
                if (queenSide) {
                    legalMoves.normal.push('c1');
                } else {
                    legalMoves.normal.push('g1');
                }
            }
        });
    }

    highlightLocal(legalMoves);
    globalStateRender();
}

function blackPawnClick({ piece }) {
    if (highlight_state) {
        const square = document.getElementById(piece.current_position);
        if (piece.current_position === previousHighlight.current_position || turnWhite) {
            moveOrCancelMove(square);
            return;
        }
    }
    if (turnWhite) {
        return;
    }

    clearHighlight();
    clearPreviousSelfHighlight(previousHighlight);

    //highlighting logic
    selfHighlight(piece);
    highlight_state = true;
    moveState = piece;
    previousHighlight = piece;
    const legalMoves = calculatePawnLegalMove(piece, "black");

    if (enPassantPawn && enPassantPawn.piece_name.includes("WHITE")
        && Math.abs(enPassantPawn.current_position.charCodeAt(0) - piece.current_position.charCodeAt(0)) === 1
        && enPassantPawn.current_position.includes(piece.current_position[1])) {
        legalMoves.attack.push(enPassantMove);
    }

    highlightLocal(legalMoves);
    globalStateRender();
}

function blackRookClick({ piece }) {
    if (highlight_state) {
        const square = document.getElementById(piece.current_position);
        if (piece.current_position === previousHighlight.current_position || turnWhite) {
            moveOrCancelMove(square);
            return;
        }
    }
    if (turnWhite) {
        return;
    }

    clearHighlight();
    clearPreviousSelfHighlight(previousHighlight);

    //highlighting logic
    selfHighlight(piece);
    highlight_state = true;
    moveState = piece;
    previousHighlight = piece;

    highlightLocal(calculateRookLegalMove(piece, "black"));
    globalStateRender();
}

function blackKnightClick({ piece }) {
    if (highlight_state) {
        const square = document.getElementById(piece.current_position);
        if (piece.current_position === previousHighlight.current_position || turnWhite) {
            moveOrCancelMove(square);
            return;
        }
    }
    if (turnWhite) {
        return;
    }

    clearHighlight();
    clearPreviousSelfHighlight(previousHighlight);

    //highlighting logic
    selfHighlight(piece);
    highlight_state = true;
    moveState = piece;
    previousHighlight = piece;

    highlightLocal(calculateKnightLegalMove(piece, "black"));
    globalStateRender();
}

function blackBishopClick({ piece }) {
    if (highlight_state) {
        const square = document.getElementById(piece.current_position);
        if (piece.current_position === previousHighlight.current_position || turnWhite) {
            moveOrCancelMove(square);
            return;
        }
    }
    if (turnWhite) {
        return;
    }

    clearHighlight();
    clearPreviousSelfHighlight(previousHighlight);

    //highlighting logic
    selfHighlight(piece);
    highlight_state = true;
    moveState = piece;
    previousHighlight = piece;

    highlightLocal(calculateBishopLegalMove(piece, "black"));
    globalStateRender();
}

function blackQueenClick({ piece }) {
    if (highlight_state) {
        const square = document.getElementById(piece.current_position);
        if (piece.current_position === previousHighlight.current_position || turnWhite) {
            moveOrCancelMove(square);
            return;
        }
    }
    if (turnWhite) {
        return;
    }

    clearHighlight();
    clearPreviousSelfHighlight(previousHighlight);

    //highlighting logic
    selfHighlight(piece);
    highlight_state = true;
    moveState = piece;
    previousHighlight = piece;

    highlightLocal(calculateQueenLegalMove(piece, "black"));
    globalStateRender();
}

function blackKingClick({ piece }) {
    if (highlight_state) {
        const square = document.getElementById(piece.current_position);
        if (piece.current_position === previousHighlight.current_position || turnWhite) {
            moveOrCancelMove(square);
            return;
        }
    }
    if (turnWhite) {
        return;
    }

    clearHighlight();
    clearPreviousSelfHighlight(previousHighlight);

    //highlighting logic
    selfHighlight(piece);
    highlight_state = true;
    moveState = piece;
    previousHighlight = piece;

    const legalMoves = calculateKingLegalMove(piece, "black");
    const opponentLegalMoves = calculateLegalMoves("white");
    if (!opponentLegalMoves.attack.includes(piece.current_position) && !piece.moved) {
        const rookValid = [];
        globalState.forEach(row => {
            row.forEach(element => {
                if (element.piece && element.piece.piece_name.includes("BLACK_ROOK") && !element.piece.moved) {
                    rookValid.push(element.piece);
                }
            });
        });

        rookValid.forEach(rook => {
            let queenSide = true;
            let start = rook.current_position.charCodeAt(0);
            let end = "e".charCodeAt(0);
            if (start > end) {
                let tmp = start;
                start = end;
                end = tmp;
                queenSide = false;
            }
            let accepted = false;
            for (let i = start + 1; i < end; i++) {
                const squareId = `${String.fromCharCode(i)}8`;
                if (checkPieceOfOpponentOnElement(squareId) || opponentLegalMoves.normal.includes(squareId)) {
                    break;
                }
                accepted = true;
            }
            if (accepted) {
                if (queenSide) {
                    legalMoves.normal.push('c8');
                } else {
                    legalMoves.normal.push('g8');
                }
            }
        });
    }

    highlightLocal(legalMoves);
    globalStateRender();
}

function prepareForMoving(piece, id) {
    if (piece.piece_name.includes("KING")) {            // CASTLING
        const fromCol = piece.current_position.charCodeAt(0);
        const toCol = id.charCodeAt(0);
        if (fromCol - toCol === -2) {
            const rook = getPieceAtPosition(`h${id[1]}`);
            const desRook = `f${id[1]}`;
            moveElement(rook, desRook);
        } else if (fromCol - toCol === 2) {
            const rook = getPieceAtPosition(`a${id[1]}`);
            const desRook = `d${id[1]}`;
            moveElement(rook, desRook);
        }
    } else if (piece.piece_name.includes("PAWN")) {     // EN PASSANT
        const rowFrom = Number(piece.current_position[1]);
        const rowTo = Number(id[1]);
        if (Math.abs(rowFrom - rowTo) === 2) {
            enPassantPawn = piece;
            const direction = piece.piece_name.includes("WHITE") ? 1 : -1;
            enPassantMove = `${piece.current_position[0]}${Number(piece.current_position[1]) + direction}`;
        } else if (enPassantMove && id.includes(enPassantMove)) {
            deletePiece(enPassantPawn);
            enPassantMove = null;
            enPassantPawn = null;
        } else {
            enPassantMove = null;
            enPassantPawn = null;
        }
    } else {
        enPassantPawn = null;
        enPassantMove = null;
    }
}

function moveOrCancelMove(square) {
    const spanHighlight = square.querySelector('span');

    if (spanHighlight) {
        if (!willBeInCheck(moveState, square.id)) {
            turnWhite = !turnWhite;
            turn++;
            prepareForMoving(moveState, square.id);
            const oldMove = moveState.current_position;
            moveElement(moveState, square.id);
            if (moveState.piece_name.includes("PAWN") &&
                (square.id.includes("8") || square.id.includes("1"))) {
                beginPromotionPawn(moveState);
            }
            // TODO: send Step API to Server
            sendStepToServer(oldMove, square.id);
        } else {
            clearPreviousSelfHighlight(previousHighlight);
        }
        moveState = null;
    } else {
        clearPreviousSelfHighlight(previousHighlight);
    }
    previousHighlight = null;
    clearHighlightLocal();
}

function globalEvent() {
    ROOT_DIV.addEventListener("click", (event) => {
        if (event.target.localName === "img") {
            const clickedId = event.target.parentNode.id;
            const flatArray = globalState.flat();
            const square = flatArray.find(el => el.id === clickedId);
            switch (square.piece.piece_name) {
                case "WHITE_PAWN":
                    whitePawnClick(square);
                    break;
                case "WHITE_ROOK":
                    whiteRookClick(square);
                    break;
                case "WHITE_KNIGHT":
                    whiteKnightClick(square);
                    break;
                case "WHITE_BISHOP":
                    whiteBishopClick(square);
                    break;
                case "WHITE_QUEEN":
                    whiteQueenClick(square);
                    break;
                case "WHITE_KING":
                    whiteKingClick(square);
                    break;
                case "BLACK_PAWN":
                    blackPawnClick(square);
                    break;
                case "BLACK_ROOK":
                    blackRookClick(square);
                    break;
                case "BLACK_KNIGHT":
                    blackKnightClick(square);
                    break;
                case "BLACK_BISHOP":
                    blackBishopClick(square);
                    break;
                case "BLACK_QUEEN":
                    blackQueenClick(square);
                    break;
                case "BLACK_KING":
                    blackKingClick(square);
                    break;
            }
        } else {
            const square = event.target.closest(SQUARE_SELECTOR);
            moveOrCancelMove(square);
        }
    });
    PROMPT_PIECE.forEach(piece => {
        piece.addEventListener('click', () => {
            const name = piece.getAttribute("name");
            finishPromotionPawn(name);
        });
    });
}

const  matchID = localStorage.getItem('MATCH_ID');

async function sendStepToServer(from, to) {
    const fen = generateFen();
    try {
        const response = await fetch("/chess/api/steps/bot", {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`
            },
            body: JSON.stringify({ matchId: matchID, fen: fen, from: from, to: to }),
            redirect: "follow"
        });
        if (response.ok) {
            const data = await response.json();
            if (data.result.winner === "HUMAN") {
                alert(data.result.winner + " " + data.result.gameStatus);
                return;
            }
            const piece = getPieceAtPosition(data.result.from);
            prepareForMoving(piece, data.result.to);
            moveElement(piece, data.result.to);
            // TODO: CHECK CHECKMATE AND STALEMATE
            turnWhite = !turnWhite;
            turn++;
        }
    } catch (error) {
    }
}

export {
    globalEvent,
    calculateLegalMoves,
    changeTurn,
    setEnPassantMove,
    setTurnNumber,
    turnWhite,
    enPassantMove,
    turn
}