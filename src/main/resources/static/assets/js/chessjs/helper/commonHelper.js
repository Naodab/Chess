import { globalState } from "../index.js";

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

export { checkPieceOfOpponentOnElement };