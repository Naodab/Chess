function Square(color, id, piece) {
    return { color, id, piece };
}

function SquareRow(rowId) {
    const squareRow = [];
    const abcd = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    if (rowId % 2 == 0) {
        abcd.forEach((element, index) => {
            if (index % 2 == 0) {
                squareRow.push(Square("white", element + rowId, null));
            } else {
                squareRow.push(Square("black", element + rowId, null));
            }
        });
    } else {
        abcd.forEach((element, index) => {
            if (index % 2 == 0) {
                squareRow.push(Square("black", element + rowId, null));
            } else {
                squareRow.push(Square("white", element + rowId, null));
            }
        });
    }
    return squareRow;
}

function initGame() {
    const game = [];
    for (let i = 8; i >= 1; i--) {
        game.push(SquareRow(i))
    }
    return game;
}

export { initGame };