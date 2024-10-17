import { globalState } from "../index.js";
import { calculateLegalMoves } from "../event/global.js";

let cloneGlobalState;

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

function checkPieceOfOpponentOnElement(id, color) {
    const flatData = globalState.flat();
    if (color) {
        const opponentColor = color === "white" ? "BLACK" : "WHITE";
        for (let element of flatData) {
            if (element.id == id && element.piece) {
                if (element.piece.piece_name.includes(opponentColor)) {
                    return true;
                }
            }
        }
    } else {
        for (let element of flatData) {
            if (element.id == id && element.piece) {
                return true;
            }
        }
    }
    return false;
}

function checkPieceOfOpponentOnElementOnClone(id, color) {
    const flatData = cloneGlobalState.flat();
    if (color) {
        const opponentColor = color === "white" ? "BLACK" : "WHITE";
        for (let element of flatData) {
            if (element.id == id && element.piece) {
                if (element.piece.piece_name.includes(opponentColor)) {
                    return true;
                }
            }
        }
    } else {
        for (let element of flatData) {
            if (element.id == id && element.piece) {
                return true;
            }
        }
    }
    return false;
}

function willBeInCheck(piece, id) {
    cloneGlobalState = JSON.parse(JSON.stringify(globalState));
    const flatData = cloneGlobalState.flat();

    const from = flatData.find(el => el.id == piece.current_position);
    const to = flatData.find(el => el.id == id);

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

    const result = opponentLegalMoves.attack.includes(posKing);
    if (result) {
        const squareKing = document.getElementById(posKing).querySelector('.piece');
        squareKing.classList.add('shake');

        setTimeout(() => {
            squareKing.classList.remove('shake');
        }, 500);
    }
    return result;
}

export { checkPieceOfOpponentOnElement, willBeInCheck, getPieceAtPosition };