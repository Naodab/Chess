import { ROOT_DIV, SQUARE_SELECTOR } from "../helper/constants.js"
import { globalState } from "../index.js";
import {
    blackPieces,
    whitePieces,
    selfHighlight,
    clearPreviousSelfHighlight,
    moveElement,
    clearHighlight,
    globalStateRender
}
    from "../render/main.js";
import { checkPieceOfOpponentOnElement } from "../helper/commonHelper.js";

let highlight_state = false;
let previousHighlight = null;
let moveState = null;
let turnWhite = true;

//TODO: enpassthan pawn, nhap thanh, vua, chuot toi cuoi duong
function clearHighlightLocal() {
    clearHighlight();
    highlight_state = false;
}

function movePieceFromXtoY(from, to) {
    to.piece = from.piece;
    from.piece = null;
    globalStateRender();
}

function highlightLocal(legalMoves) {
    legalMoves.normal.forEach(element => {
        globalState.forEach(row => {
            row.forEach(ele => {
                if (ele.id == element) {
                    ele.highlight = true;
                }
            });
        });
    });

    legalMoves.attack.forEach(dest => {
        document.getElementById(dest).classList.add("capturedColor");
        globalState.forEach(row => {
            row.forEach(ele => {
                if (ele.id == dest) {
                    ele.highlightCaptured = true;
                    ele.highlight = true;
                }
            });
        });
    });
}

function calculatePawnLegalMove({ current_position }, color) {
    const m = (color == "white") ? 1 : -1;
    const firstRow = (color == "white") ? "2" : "7";
    const normal = [];
    const attack = [];

    const candidate = `${current_position[0]}${Number(current_position[1]) + m}`;
    if (!checkPieceOfOpponentOnElement(candidate)) {
        normal.push(candidate);
        if (current_position[1] == firstRow) {
            const doubleCandidate = `${current_position[0]}${Number(current_position[1]) + 2 * m}`;
            if (!checkPieceOfOpponentOnElement(doubleCandidate))
                normal.push(doubleCandidate);
        }
    }

    const captureIds = [
        `${String.fromCharCode(current_position.charCodeAt(0) - 1)}${Number(current_position[1]) + m}`,
        `${String.fromCharCode(current_position.charCodeAt(0) + 1)}${Number(current_position[1]) + m}`
    ];

    captureIds.forEach(col => {
        if (checkPieceOfOpponentOnElement(col, color))
            attack.push(col);
    });

    return { normal, attack };
}

function calculateRookLegalMove({ current_position }, color) {
    const normal = [];
    const attack = [];

    const col = current_position.charCodeAt(0);
    const row = Number(current_position[1]);

    for (let i = col + 1; i <= 104; i++) {
        let candidate = `${String.fromCharCode(i)}${row}`;
        if (checkPieceOfOpponentOnElement(candidate)) {
            if (checkPieceOfOpponentOnElement(candidate, color)) {
                attack.push(candidate);
            }
            break;
        }
        normal.push(candidate);
    }

    for (let i = col - 1; i >= 97; i--) {
        let candidate = `${String.fromCharCode(i)}${row}`;
        if (checkPieceOfOpponentOnElement(candidate)) {
            if (checkPieceOfOpponentOnElement(candidate, color)) {
                attack.push(candidate);
            }
            break;
        }
        normal.push(candidate);
    }

    for (let i = row + 1; i <= 8; i++) {
        let candidate = `${String.fromCharCode(col)}${i}`;
        if (checkPieceOfOpponentOnElement(candidate)) {
            if (checkPieceOfOpponentOnElement(candidate, color)) {
                attack.push(candidate);
            }
            break;
        }
        normal.push(candidate);
    }

    for (let i = row - 1; i > 0; i--) {
        let candidate = `${String.fromCharCode(col)}${i}`;
        if (checkPieceOfOpponentOnElement(candidate)) {
            if (checkPieceOfOpponentOnElement(candidate, color)) {
                attack.push(candidate);
            }
            break;
        }
        normal.push(candidate);
    }

    return { normal, attack };
}

function calculateKnightLegalMove({ current_position }, color) {
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
                if (checkPieceOfOpponentOnElement(candidate)) {
                    if (checkPieceOfOpponentOnElement(candidate, color)) {
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

function calculateBishopLegalMove({ current_position }, color) {
    const normal = [];
    const attack = [];

    const col = current_position.charCodeAt(0);
    const row = Number(current_position[1]);

    for (let i = col + 1, j = row + 1; i <= 104 && j <= 8; i++, j++) {
        let candidate = `${String.fromCharCode(i)}${j}`;
        if (checkPieceOfOpponentOnElement(candidate)) {
            if (checkPieceOfOpponentOnElement(candidate, color)) {
                attack.push(candidate);
            }
            break;
        }
        normal.push(candidate);
    }

    for (let i = col + 1, j = row - 1; i <= 104 && j > 0; i++, j--) {
        let candidate = `${String.fromCharCode(i)}${j}`;
        if (checkPieceOfOpponentOnElement(candidate)) {
            if (checkPieceOfOpponentOnElement(candidate, color)) {
                attack.push(candidate);
            }
            break;
        }
        normal.push(candidate);
    }

    for (let i = col - 1, j = row + 1; i >= 97 && j <= 8; i--, j++) {
        let candidate = `${String.fromCharCode(i)}${j}`;
        if (checkPieceOfOpponentOnElement(candidate)) {
            if (checkPieceOfOpponentOnElement(candidate, color)) {
                attack.push(candidate);
            }
            break;
        }
        normal.push(candidate);
    }

    for (let i = col - 1, j = row - 1; i >= 97 && j > 0; i--, j--) {
        let candidate = `${String.fromCharCode(i)}${j}`;
        if (checkPieceOfOpponentOnElement(candidate)) {
            if (checkPieceOfOpponentOnElement(candidate, color)) {
                attack.push(candidate);
            }
            break;
        }
        normal.push(candidate);
    }

    return { normal, attack };
}

function calculateQueenLegalMove({ current_position }, color) {
    const normal = [];
    const attack = [];

    const col = current_position.charCodeAt(0);
    const row = Number(current_position[1]);

    for (let i = col + 1, j = row + 1; i <= 104 && j <= 8; i++, j++) {
        let candidate = `${String.fromCharCode(i)}${j}`;
        if (checkPieceOfOpponentOnElement(candidate)) {
            if (checkPieceOfOpponentOnElement(candidate, color)) {
                attack.push(candidate);
            }
            break;
        }
        normal.push(candidate);
    }

    for (let i = col + 1, j = row - 1; i <= 104 && j > 0; i++, j--) {
        let candidate = `${String.fromCharCode(i)}${j}`;
        if (checkPieceOfOpponentOnElement(candidate)) {
            if (checkPieceOfOpponentOnElement(candidate, color)) {
                attack.push(candidate);
            }
            break;
        }
        normal.push(candidate);
    }

    for (let i = col - 1, j = row + 1; i >= 97 && j <= 8; i--, j++) {
        let candidate = `${String.fromCharCode(i)}${j}`;
        if (checkPieceOfOpponentOnElement(candidate)) {
            if (checkPieceOfOpponentOnElement(candidate, color)) {
                attack.push(candidate);
            }
            break;
        }
        normal.push(candidate);
    }

    for (let i = col - 1, j = row - 1; i >= 97 && j > 0; i--, j--) {
        let candidate = `${String.fromCharCode(i)}${j}`;
        if (checkPieceOfOpponentOnElement(candidate)) {
            if (checkPieceOfOpponentOnElement(candidate, color)) {
                attack.push(candidate);
            }
            break;
        }
        normal.push(candidate);
    }

    for (let i = col + 1; i <= 104; i++) {
        let candidate = `${String.fromCharCode(i)}${row}`;
        if (checkPieceOfOpponentOnElement(candidate)) {
            if (checkPieceOfOpponentOnElement(candidate, color)) {
                attack.push(candidate);
            }
            break;
        }
        normal.push(candidate);
    }

    for (let i = col - 1; i >= 97; i--) {
        let candidate = `${String.fromCharCode(i)}${row}`;
        if (checkPieceOfOpponentOnElement(candidate)) {
            if (checkPieceOfOpponentOnElement(candidate, color)) {
                attack.push(candidate);
            }
            break;
        }
        normal.push(candidate);
    }

    for (let i = row + 1; i <= 8; i++) {
        let candidate = `${String.fromCharCode(col)}${i}`;
        if (checkPieceOfOpponentOnElement(candidate)) {
            if (checkPieceOfOpponentOnElement(candidate, color)) {
                attack.push(candidate);
            }
            break;
        }
        normal.push(candidate);
    }

    for (let i = row - 1; i > 0; i--) {
        let candidate = `${String.fromCharCode(col)}${i}`;
        if (checkPieceOfOpponentOnElement(candidate)) {
            if (checkPieceOfOpponentOnElement(candidate, color)) {
                attack.push(candidate);
            }
            break;
        }
        normal.push(candidate);
    }

    return { normal, attack };
}

function calculateKingLegalMove({ current_position }, color) {
    const normal = [];
    const attack = [];

    const col = current_position.charCodeAt(0);
    const row = Number(current_position[1]);

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
        if (checkPieceOfOpponentOnElement(candidate)) {
            if (checkPieceOfOpponentOnElement(candidate, color)) {
                attack.push(candidate);
            }
        } else {
            normal.push(candidate);
        }
    });

    return { normal, attack };
}

function calculateLegalMoves(color) {
    let normal = [];
    let attack = [];
    if (color == "white") {
        whitePieces.forEach(piece => {
            let legalMoves;
            if (piece.piece_name.includes("PAWN")) {
                legalMoves = calculatePawnLegalMove(piece, color);
            } else if (piece.piece_name.includes("ROOK")) {
                legalMoves = calculateRookLegalMove(piece, color);
            } else if (piece.piece_name.includes("KNIGHT")) {
                legalMoves = calculateKnightLegalMove(piece, color);
            } else if (piece.piece_name.includes("BISHOP")) {
                legalMoves = calculateBishopLegalMove(piece, color);
            } else if (piece.piece_name.includes("QUEEN")) {
                legalMoves = calculateQueenLegalMove(piece, color);
            } else if (piece.piece_name.includes("KING")) {
                legalMoves = calculateKingLegalMove(piece, color);
            }
            normal = normal.concat(legalMoves.normal);
            attack = attack.concat(legalMoves.attack);
        });
    } else {
        blackPieces.forEach(piece => {
            let legalMoves;
            if (piece.piece_name.includes("PAWN")) {
                legalMoves = calculatePawnLegalMove(piece, color);
            } else if (piece.piece_name.includes("ROOK")) {
                legalMoves = calculateRookLegalMove(piece, color);
            } else if (piece.piece_name.includes("KNIGHT")) {
                legalMoves = calculateKnightLegalMove(piece, color);
            } else if (piece.piece_name.includes("BISHOP")) {
                legalMoves = calculateBishopLegalMove(piece, color);
            } else if (piece.piece_name.includes("QUEEN")) {
                legalMoves = calculateQueenLegalMove(piece, color);
            } else if (piece.piece_name.includes("KING")) {
                legalMoves = calculateKingLegalMove(piece, color);
            }
            normal = normal.concat(legalMoves.normal);
            attack = attack.concat(legalMoves.attack);
        });
    }
    return { normal, attack };
}

function whitePawnClick({ piece }) {
    if (highlight_state) {
        const square = document.getElementById(piece.current_position);
        if (piece.current_position == previousHighlight.current_position || !turnWhite) {
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

    highlightLocal(calculatePawnLegalMove(piece, "white"));
    globalStateRender();
}

function whiteRookClick({ piece }) {
    if (highlight_state) {
        const square = document.getElementById(piece.current_position);
        if (piece.current_position == previousHighlight.current_position || !turnWhite) {
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
        if (piece.current_position == previousHighlight.current_position || !turnWhite) {
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
        if (piece.current_position == previousHighlight.current_position || !turnWhite) {
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
        if (piece.current_position == previousHighlight.current_position || !turnWhite) {
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
        if (piece.current_position == previousHighlight.current_position || !turnWhite) {
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

    highlightLocal(calculateKingLegalMove(piece, "white"));
    globalStateRender();
}

function blackPawnClick({ piece }) {
    if (highlight_state) {
        const square = document.getElementById(piece.current_position);
        if (piece.current_position == previousHighlight.current_position || turnWhite) {
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

    highlightLocal(calculatePawnLegalMove(piece, "black"));
    globalStateRender();
}

function blackRookClick({ piece }) {
    if (highlight_state) {
        const square = document.getElementById(piece.current_position);
        if (piece.current_position == previousHighlight.current_position || turnWhite) {
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
        if (piece.current_position == previousHighlight.current_position || turnWhite) {
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
        if (piece.current_position == previousHighlight.current_position || turnWhite) {
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
        if (piece.current_position == previousHighlight.current_position || turnWhite) {
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
        if (piece.current_position == previousHighlight.current_position || turnWhite) {
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

    highlightLocal(calculateKingLegalMove(piece, "black"));
    globalStateRender();
}

function moveOrCancelMove(square) {
    const spanHighlight = square.querySelector('span');

    if (spanHighlight) {
        // const oppositeLegalMoves = calculateLegalMoves();
        moveElement(moveState, square.id);
		
        turnWhite = !turnWhite;
        moveState = null;
    } else {
        clearPreviousSelfHighlight(previousHighlight);
    }
    previousHighlight = null;
    clearHighlightLocal();
}

function getMoveFromServer() {
	
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
}

export { globalEvent, movePieceFromXtoY, calculateLegalMoves }