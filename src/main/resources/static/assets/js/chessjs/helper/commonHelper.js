import { globalState } from "../index.js";
import { calculateLegalMoves } from "../event/global.js";

let cloneGlobalState;
let transitionGlobalState;

function getPieceAtPosition(position) {
    console.log(position);
    for (let row of globalState) {
        for (let element of row) {
            if (element.piece && element.piece.current_position.includes(position)) {
                return element.piece;
            }
        }
    }
}

function checkPieceOfOpponentOnElement(id, color, data = globalState) {
    const flatData = data.flat();
    if (color) {
        const opponentColor = color === "white" ? "BLACK" : "WHITE";
        for (let element of flatData) {
            if (element.id === id && element.piece) {
                if (element.piece.piece_name.includes(opponentColor)) {
                    return true;
                }
            }
        }
    } else {
        for (let element of flatData) {
            if (element.id === id && element.piece) {
                return true;
            }
        }
    }
    return false;
}

function checkPieceOfOpponentOnElementOnClone(id, color) {
    return checkPieceOfOpponentOnElement(id, color, cloneGlobalState);
}

function checkPieceOfOpponentOnElementOnTransition(id, color) {
    return checkPieceOfOpponentOnElement(id, color, transitionGlobalState);
}

function isValidPosition(position) {
    const colIndex = position.charCodeAt(0);
    const rowIndex = Number(position.slice(1));

    return colIndex >= 97 && colIndex <= 104 && rowIndex > 0 && rowIndex < 9;
}

function willBeInCheck(piece, id, board = globalState) {
    cloneGlobalState = JSON.parse(JSON.stringify(board));
    const flatData = cloneGlobalState.flat();

    const from = flatData.find(el => el.id === piece.current_position);
    const to = flatData.find(el => el.id === id);

    from.piece.current_position = id;
    from.piece.moved = true;
    to.piece = from.piece;
    from.piece = null;

    const opponentColor = piece.piece_name.includes('WHITE') ? "black" : "white";
    const nameKing = piece.piece_name.includes('WHITE') ? "WHITE_KING" : "BLACK_KING";
    let posKing;
    for (let element of flatData) {
        if (element.piece && element.piece.piece_name === nameKing) {
            posKing = element.piece.current_position;
            break;
        }
    }

    const opponentLegalMoves = calculateLegalMoves(opponentColor, cloneGlobalState,
        checkPieceOfOpponentOnElementOnClone);

    const result = opponentLegalMoves.attack.find(move => move.destination === posKing);
    if (result && !piece.piece_name.includes("KING")) {
        const squareKing = document.getElementById(posKing).querySelector('.piece');
        squareKing.classList.add('shake');

        setTimeout(() => {
            squareKing.classList.remove('shake');
        }, 500);
    }
    return result;
}

function getKing(color, board = globalState) {
    const nameKing = color.toUpperCase() + "_KING";
    for (let row of board) {
        for (let square of row) {
            if (square.piece && square.piece.piece_name.includes(nameKing)) {
                return square.piece;
            }
        }
    }
}

function moveStatus(color) {
    transitionGlobalState = JSON.parse(JSON.stringify(globalState));
    const opponentColor = color.includes("white") ? "black" : "white";

    const king = getKing(color, transitionGlobalState);
    const opponentLegalMoves = calculateLegalMoves(opponentColor,
        transitionGlobalState, checkPieceOfOpponentOnElementOnTransition);

    let inCheck = false;
    if (opponentLegalMoves.attack.find(move =>
        move.destination === king.current_position)) {
        inCheck = true;
    }

    const legalMoves = calculateLegalMoves(color, transitionGlobalState,
        checkPieceOfOpponentOnElementOnTransition);

    let isStaleMate = true;
    for (let move of legalMoves.normal.concat(legalMoves.attack)) {
        if (isValidPosition(move.destination) &&
            !willBeInCheck(move.piece, move.destination,
                transitionGlobalState)) {
            isStaleMate = false;
            break;
        }
    }

    if (isStaleMate && inCheck)
        return "CHECK_MATE";
    if (isStaleMate)
        return "STALE_MATE";
    if (inCheck)
        return "IN_CHECK";
    return "";
}

export {
    checkPieceOfOpponentOnElement,
    willBeInCheck,
    getPieceAtPosition,
    getKing,
    moveStatus
};