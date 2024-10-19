import * as pieces from "../data/piece.js";
import { ROOT_DIV } from "../helper/constants.js";
import { globalState } from "../index.js";
import {
	turnWhite,
	enPassantMove,
	turn,
	changeTurn,
	setEnPassantMove,
	setTurnNumber
} from "../event/global.js";
import {
	BLACK_DEFEATED_PIECES,
	WHITE_DEFEATED_PIECES,
	GB_CONTAINER,
	OVERLAY,
	PROMPT_PIECES,
} from "../helper/constants.js";

const blackPieces = [];
const whitePieces = [];
const whiteDefeatedPiece = {
	pawns: 0,
	rooks: 0,
	knights: 0,
	bishops: 0,
	queens: 0
};
const blackDefeatedPiece = {
	pawns: 0,
	rooks: 0,
	knights: 0,
	bishops: 0,
	queens: 0
};
const whiteMoves = [];
const blackMoves = [];
let promotionPiece;
let turnDraw = 0;

function globalStateRender() {
	globalState.forEach(row => {
		row.forEach(element => {
			if (element.highlight) {
				const highlightSpan = document.createElement("span");
				highlightSpan.classList.add("highlight");
				document.getElementById(element.id).appendChild(highlightSpan);
			} else if (element.highlight === null) {
				const square = document.getElementById(element.id);
				const highlight = square.querySelector('.highlight');
				if (highlight)
					square.removeChild(highlight);
			}
			if (element.piece) {

			} else {
				const square = document.getElementById(element.id);
				const piece = square.querySelector('.piece');
				if (piece)
					square.removeChild(piece);
			}
		});
	});
}

//use when you want to render pieces on board
function pieceRender(data) {
	data.forEach(row => {
		row.forEach(square => {
			if (square.piece) {
				const squareEl = document.getElementById(square.id);
				const piece = document.createElement("img");
				piece.src = square.piece.img;
				piece.classList.add("piece");
				squareEl.appendChild(piece);
			}
		});
	});
}

//use when you want to render board for first time when game start
function initGameRender(data) {
	data.forEach(row => {
		const rowEl = document.createElement("div");
		row.forEach((square) => {
			const squareDiv = document.createElement('div');
			squareDiv.classList.add(square.color, "square");
			squareDiv.id = square.id;

			if (square.id[1] === "7") {
				const piece = pieces.blackPawn(square.id);
				blackPieces.push(piece);
				square.piece = piece;
			} else if (square.id === "h8" || square.id === "a8") {
				const piece = pieces.blackRook(square.id);
				blackPieces.push(piece);
				square.piece = piece;
			} else if (square.id === "g8" || square.id === "b8") {
				const piece = pieces.blackKnight(square.id);
				blackPieces.push(piece);
				square.piece = piece;
			} else if (square.id === "f8" || square.id === "c8") {
				const piece = pieces.blackBishop(square.id);
				blackPieces.push(piece);
				square.piece = piece;
			} else if (square.id === "d8") {
				const piece = pieces.blackQueen(square.id);
				blackPieces.push(piece);
				square.piece = piece;
			} else if (square.id === "e8") {
				const piece = pieces.blackKing(square.id);
				blackPieces.push(piece);
				square.piece = piece;
			} else if (square.id[1] === "2") {
				const piece = pieces.whitePawn(square.id);
				whitePieces.push(piece);
				square.piece = piece;
			} else if (square.id === "h1" || square.id === "a1") {
				const piece = pieces.whiteRook(square.id);
				whitePieces.push(piece);
				square.piece = piece;
			} else if (square.id === "g1" || square.id === "b1") {
				const piece = pieces.whiteKnight(square.id);
				whitePieces.push(piece);
				square.piece = piece;
			} else if (square.id === "f1" || square.id === "c1") {
				const piece = pieces.whiteBishop(square.id);
				whitePieces.push(piece);
				square.piece = piece;
			} else if (square.id === "d1") {
				const piece = pieces.whiteQueen(square.id);
				whitePieces.push(piece);
				square.piece = piece;
			} else if (square.id === "e1") {
				const piece = pieces.whiteKing(square.id);
				whitePieces.push(piece);
				square.piece = piece;
			}
			rowEl.appendChild(squareDiv);
		});
		rowEl.classList.add("squareRow");
		ROOT_DIV.appendChild(rowEl);
	});
	pieceRender(data);
}

function clearPreviousSelfHighlight(piece) {
	if (piece) {
		document.getElementById(piece.current_position)
			.classList.remove("highlightYellow");
	}
}

function selfHighlight(piece) {
	document.getElementById(piece.current_position).classList.add("highlightYellow");
}

function clearHighlight() {
	const flat = globalState.flat();
	flat.forEach(el => {
		if (el.highlight) {
			el.highlight = null;

		}
		if (el.highlightCaptured) {
			document.getElementById(el.id).classList.remove("capturedColor");
			el.capturedHighlight = false;
		}
	});
	globalStateRender();
}

function renderDefeatedPiece(area, name, count) {
	const pieceContainer = document.createElement('div');
	pieceContainer.classList.add(name + "s");
	for (let i = 0; i < count; i++) {
		const pawn = document.createElement('div');
		pawn.classList.add(name, "defeated-piece");
		pieceContainer.appendChild(pawn);
	}
	area.appendChild(pieceContainer);
}

function addDefeatedPieces(piece) {
	let selector = WHITE_DEFEATED_PIECES;
	let defeatedPieces = whiteDefeatedPiece;
	if (piece.piece_name.includes("BLACK")) {
		selector = BLACK_DEFEATED_PIECES;
		defeatedPieces = blackDefeatedPiece;
	}
	if (piece.piece_name.includes("PAWN")) {
		defeatedPieces.pawns++;
	} else if (piece.piece_name.includes("ROOK")) {
		defeatedPieces.rooks++;
	} else if (piece.piece_name.includes("BISHOP")) {
		defeatedPieces.bishops++;
	} else if (piece.piece_name.includes("KNIGHT")) {
		defeatedPieces.knights++;
	} else if (piece.piece_name.includes("QUEEN")) {
		defeatedPieces.queens++;
	}
	const area = document.querySelector(selector);
	area.innerHTML = "";

	for(let att in defeatedPieces) {
		if (defeatedPieces[att] > 0) {
			renderDefeatedPiece(area, att.slice(0, -1), defeatedPieces[att]);
		}
	}
}

function beginPromotionPawn(piece) {
	OVERLAY.style.zIndex = "2";
	GB_CONTAINER.classList.add("prompt");
	if (piece.piece_name.includes("WHITE")) {
		PROMPT_PIECES.className = "alliance-white";
	} else {
		PROMPT_PIECES.className = "alliance-black";
	}
	promotionPiece = piece;
}

function finishPromotionPawn(name) {
	OVERLAY.style.zIndex = "-1";
	GB_CONTAINER.classList.remove("prompt");
	PROMPT_PIECES.className = "";
	const color = promotionPiece.piece_name.includes("WHITE") ? "WHITE_" : "BLACK_";
	name = color + name;
	let pieceCreate;
	switch (name) {
		case "WHITE_ROOK":
			pieceCreate = pieces.whiteRook;
			break;
		case "WHITE_KNIGHT":
			pieceCreate = pieces.whiteKnight;
			break;
		case "WHITE_BISHOP":
			pieceCreate = pieces.whiteBishop;
			break;
		case "WHITE_QUEEN":
			pieceCreate = pieces.whiteQueen;
			break;
		case "BLACK_ROOK":
			pieceCreate = pieces.blackRook;
			break;
		case "BLACK_KNIGHT":
			pieceCreate = pieces.blackKnight;
			break;
		case "BLACK_BISHOP":
			pieceCreate = pieces.blackBishop;
			break;
		case "BLACK_QUEEN":
			pieceCreate = pieces.blackQueen;
			break;
	}
	const newPiece = pieceCreate(promotionPiece.current_position);
	globalState.forEach(row => {
		row.forEach(element => {
			if (element.piece && element.piece.current_position === newPiece.current_position) {
				element.piece = newPiece;
			}
		});
	});
	const square = document.getElementById(newPiece.current_position).querySelector(".piece");
	square.src = newPiece.img;
	if (color === "WHITE") {
		let index = whitePieces.findIndex(ele => ele.current_position === promotionPiece.current_position);
		whitePieces.splice(index, 1);
		whitePieces.push(newPiece);
	} else {
		let index = blackPieces.findIndex(ele => ele.current_position === promotionPiece.current_position);
		blackPieces.splice(index, 1);
		blackPieces.push(newPiece);
	}
}

function moveElement(piece, id) {
	if (piece.piece_name.includes("PAWN"))
		turnDraw = 0;

	const flatData = globalState.flat();
	const from = flatData.find(el => el.id === piece.current_position);
	const to = flatData.find(el => el.id === id);

	const fromSquare = document.getElementById(from.id);
	const toSquare = document.getElementById(to.id);
	if (to.piece) {
		turnDraw = 0;
		addDefeatedPieces(to.piece);
		if (to.piece.piece_name.includes("WHITE")) {
			let index = whitePieces.findIndex(ele => ele.current_position === id);
			whitePieces.splice(index, 1);
		} else {
			let index = blackPieces.findIndex(ele => ele.current_position === id);
			blackPieces.splice(index, 1);
		}
	}

	from.piece.current_position = id;
	from.piece.moved = true;
	to.piece = from.piece;
	from.piece = null;

	toSquare.innerHTML = fromSquare.innerHTML;
	fromSquare.innerHTML = "";
	fromSquare.classList.remove('highlightYellow');

	clearHighlight();
}

function convertCoordinateToPosition(coordinate) {
	const col = String.fromCharCode(coordinate % 8 + 97);
	const row = 8 - Math.floor(coordinate / 8);
	return `${col}${row}`;
}

function initGameFromFenRender(data, fen) {
	const info = fen.split(" ");
	console.log(info);
	const board = info[0].split("/");
	let coordinate = 0;
	whiteDefeatedPiece.pawns = -8;
	whiteDefeatedPiece.rooks = -2;
	whiteDefeatedPiece.knights = -2;
	whiteDefeatedPiece.bishops = -2;
	whiteDefeatedPiece.queens = -1;

	blackDefeatedPiece.pawns = -8;
	blackDefeatedPiece.rooks = -2;
	blackDefeatedPiece.knights = -2;
	blackDefeatedPiece.bishops = -2;
	blackDefeatedPiece.queens = -1;

	board.forEach((row) => {
		const rowEl = document.createElement("div");
		for (let square of row) {
			const code = square.charCodeAt(0);
			if (code > 48 && code < 57) {
				for (let i = 0; i < code - 48; i++) {
					const squareDiv = document.createElement('div');
					squareDiv.classList.add(data[Math.floor(coordinate / 8)][coordinate % 8].color, "square");
					squareDiv.id = convertCoordinateToPosition(coordinate);
					rowEl.appendChild(squareDiv);
					coordinate++;
				}
			} else {
				const squareDiv = document.createElement('div');
				squareDiv.classList.add(data[Math.floor(coordinate / 8)][coordinate % 8].color, "square");
				const id = convertCoordinateToPosition(coordinate);
				squareDiv.id = id;
				let piece;
				const position = id;
				if (square === "p") {
					piece = pieces.blackPawn(position);
					blackPieces.push(piece);
					blackDefeatedPiece.pawns++;
				} else if (square === "r") {
					piece = pieces.blackRook(position);
					if ((position === "a8" && info[2].includes("q")) ||
						(position === "h8" && info[2].includes("k")))
						piece.moved = true;
					blackPieces.push(piece);
					blackDefeatedPiece.rooks++;
				} else if (square === "n") {
					piece = pieces.blackKnight(position);
					blackPieces.push(piece);
					blackDefeatedPiece.knights++;
				} else if (square === "b") {
					piece = pieces.blackBishop(position);
					blackPieces.push(piece);
					blackDefeatedPiece.bishops++;
				} else if (square === "q") {
					piece = pieces.blackQueen(position);
					blackPieces.push(piece);
					blackDefeatedPiece.queens++;
				} else if (square === "k") {
					piece = pieces.blackKing(position);
					blackPieces.push(piece);
				} else if (square === "P") {
					piece = pieces.whitePawn(position);
					whitePieces.push(piece);
					whiteDefeatedPiece.pawns++;
				} else if (square === "R") {
					piece = pieces.whiteRook(position);
					if ((position === "a1" && info[2].includes("Q")) ||
						(position === "h1" && info[2].includes("K")))
						piece.moved = true;
					whitePieces.push(piece);
					whiteDefeatedPiece.rooks++;
				} else if (square === "N") {
					piece = pieces.whiteKnight(position);
					whitePieces.push(piece);
					whiteDefeatedPiece.knights++;
				} else if (square === "B") {
					piece = pieces.whiteBishop(position);
					whitePieces.push(piece);
					whiteDefeatedPiece.bishops++;
				} else if (square === "Q") {
					piece = pieces.whiteQueen(position);
					whitePieces.push(piece);
					whiteDefeatedPiece.queens++;
				} else if (square === "K") {
					piece = pieces.whiteKing(position);
					whitePieces.push(piece);
				}
				data[Math.floor(coordinate / 8)][coordinate % 8].piece = piece;
				rowEl.appendChild(squareDiv);
				coordinate++;
			}
		}
		rowEl.classList.add("squareRow");
		ROOT_DIV.appendChild(rowEl);
	});
	pieceRender(data);
	if (info[1] === "w") changeTurn(true);
	else changeTurn(false);

	if (info[3].length > 1)
		setEnPassantMove(info[3]);

	turnDraw = Number(info[4]);
	setTurnNumber(Number(info[5]));

	let area = document.querySelector(BLACK_DEFEATED_PIECES);
	for(let att in blackDefeatedPiece) {
		blackDefeatedPiece[att] = -blackDefeatedPiece[att];
		if (blackDefeatedPiece[att] > 0) {
			renderDefeatedPiece(area, att.slice(0, -1), blackDefeatedPiece[att]);
		}
	}
	area = document.querySelector(WHITE_DEFEATED_PIECES);
	for(let att in whiteDefeatedPiece) {
		whiteDefeatedPiece[att] = -whiteDefeatedPiece[att];
		if (whiteDefeatedPiece[att] > 0) {
			renderDefeatedPiece(area, att.slice(0, -1), whiteDefeatedPiece[att]);
		}
	}

}

function deletePiece(piece) {
	turnDraw = 0;
	addDefeatedPieces(piece);
	const flatData = globalState.flat();
	const pieceOnGlobalState = flatData.find(el => el.id === piece.current_position);

	if (piece.piece_name.includes("WHITE")) {
		let index = whitePieces.findIndex(ele => ele.current_position === piece.current_position);
		whitePieces.splice(index, 1);
	} else {
		let index = blackPieces.findIndex(ele => ele.current_position === piece.current_position);
		blackPieces.splice(index, 1);
	}

	const square = document.getElementById(piece.current_position);
	square.innerHTML = "";
	pieceOnGlobalState.piece = null;
}

function calculateCastling(pieces, color) {
	let result = "";
	let canKingCastle = false;
	let canRookKingSide = false;
	let canRookQueenSide = false;

	pieces.forEach(piece => {
		if (piece.piece_name.includes(color.toUpperCase() + "_KING") && !piece.moved) {
			canKingCastle = true;
		} else if (piece.piece_name.includes(color.toUpperCase() + "_ROOK") && !piece.moved) {
			if (piece.current_position[0] === 'a') {
				canRookQueenSide = true;
			} else if (piece.current_position[0] === 'h') {
				canRookKingSide = true;
			}
		}
	})

	if (canKingCastle && canRookKingSide) result += "k";
	if (canKingCastle && canRookQueenSide) result += "q";
	return (color === "white") ? result.toUpperCase() : result;
}

function generateFen() {
	let fen = "";
	globalState.forEach((row, index) => {
		let count = 0;
		row.forEach(element => {
			if (element.piece) {
				if (count !== 0) {
					fen += `${count}`;
					count = 0;
				}
				fen += element.piece.piece_signal;
			} else {
				count++;
			}
		});
		if (count !== 0) {
			fen += `${count}`;
			count = 0;
		}
		if (index !== 7) fen += "/";
	});
	if (turnWhite)
		fen += ' w ';
	else fen += ' b ';
	fen = fen + calculateCastling(whitePieces, "white");
	fen = fen + calculateCastling(blackPieces, "black") + " ";
	if (enPassantMove) fen += enPassantMove + " ";
	else fen += "- ";
	fen += `${turnDraw} ${turn}`
	return fen;
}

export {
	whiteMoves,
	blackMoves,
	initGameRender,
	initGameFromFenRender,
	clearHighlight,
	selfHighlight,
	clearPreviousSelfHighlight,
	moveElement,
	globalStateRender,
	generateFen,
	deletePiece,
	beginPromotionPawn,
	finishPromotionPawn
};