import * as pieces from "../data/piece.js";
import { ROOT_DIV } from "../helper/constants.js";
import { globalState } from "../index.js";
import { turnWhite, enpassantMove, turn } from "../event/global.js";

const blackPieces = [];
const whitePieces = [];
let turnDraw = 0;

function globalStateRender() {
	console.log(generateFen());
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
		row.forEach((square, index) => {
			const squareDiv = document.createElement('div');
			squareDiv.classList.add(square.color, "square");
			squareDiv.id = square.id;

			if (square.id[1] == 7) {
				const piece = pieces.blackPawn(square.id);
				blackPieces.push(piece);
				square.piece = piece;
			} else if (square.id == "h8" || square.id == "a8") {
				const piece = pieces.blackRook(square.id);
				blackPieces.push(piece);
				square.piece = piece;
			} else if (square.id == "g8" || square.id == "b8") {
				const piece = pieces.blackKnight(square.id);
				blackPieces.push(piece);
				square.piece = piece;
			} else if (square.id == "f8" || square.id == "c8") {
				const piece = pieces.blackBishop(square.id);
				blackPieces.push(piece);
				square.piece = piece;
			} else if (square.id == "d8") {
				const piece = pieces.blackQueen(square.id);
				blackPieces.push(piece);
				square.piece = piece;
			} else if (square.id == "e8") {
				const piece = pieces.blackKing(square.id);
				blackPieces.push(piece);
				square.piece = piece;
			} else if (square.id[1] == 2) {
				const piece = pieces.whitePawn(square.id);
				whitePieces.push(piece);
				square.piece = piece;
			} else if (square.id == "h1" || square.id == "a1") {
				const piece = pieces.whiteRook(square.id);
				whitePieces.push(piece);
				square.piece = piece;
			} else if (square.id == "g1" || square.id == "b1") {
				const piece = pieces.whiteKnight(square.id);
				whitePieces.push(piece);
				square.piece = piece;
			} else if (square.id == "f1" || square.id == "c1") {
				const piece = pieces.whiteBishop(square.id);
				whitePieces.push(piece);
				square.piece = piece;
			} else if (square.id == "d1") {
				const piece = pieces.whiteQueen(square.id);
				whitePieces.push(piece);
				square.piece = piece;
			} else if (square.id == "e1") {
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

function renderHighLight(squareId) {
	const highlightSpan = document.createElement("span");
	highlightSpan.classList.add("highlight");
	document.getElementById(squareId).appendChild(highlightSpan);
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

function moveElement(piece, id) {
	if (piece.piece_name.includes("PAWN"))
		turnDraw = 0;

	const flatData = globalState.flat();
	const from = flatData.find(el => el.id == piece.current_position);
	const to = flatData.find(el => el.id == id);

	const fromSquare = document.getElementById(from.id);
	const toSquare = document.getElementById(to.id);
	if (to.piece) {
		turnDraw = 0;
		if (to.piece.piece_name.includes("WHITE")) {
			let index = whitePieces.findIndex(ele => ele.current_position == id);
			whitePieces.splice(index, 1);
		} else {
			let index = blackPieces.findIndex(ele => ele.current_position == id);
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

function deletePiece(piece) {
	turnDraw = 0;
	const flatData = globalState.flat();
	const pieceOnGlobalState = flatData.find(el => el.id == piece.current_position);

	if (piece.piece_name.includes("WHITE")) {
		let index = whitePieces.findIndex(ele => ele.current_position == piece.current_position);
		whitePieces.splice(index, 1);
	} else {
		let index = blackPieces.findIndex(ele => ele.current_position == piece.current_position);
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
			if (piece.current_position[0] == 'a') {
				canRookQueenSide = true;
			} else if (piece.current_position[0] == 'h') {
				canRookKingSide = true;
			}
		}
	})

	if (canKingCastle && canRookKingSide) result += "k";
	if (canKingCastle && canRookQueenSide) result += "q";
	return (color == "white") ? result.toUpperCase() : result;
}

function generateFen() {
	let fen = "";
	globalState.forEach((row, index) => {
		let count = 0;
		row.forEach(element => {
			if (element.piece) {
				if (count != 0) {
					fen += `${count}`;
					count = 0;
				}
				fen += element.piece.piece_signal;
			} else {
				count++;
			}
		});
		if (count != 0) {
			fen += `${count}`;
			count = 0;
		}
		if (index != 7) fen += "/";
	});
	if (turnWhite)
		fen += ' w ';
	else fen += ' b ';
	fen = fen + calculateCastling(whitePieces, "white");
	fen = fen + calculateCastling(blackPieces, "black") + " ";

	if (enpassantMove) fen += enpassantMove + " ";
	else fen += "- ";

	fen += `${turnDraw} ${turn}`

	return fen;
}

export {
	blackPieces,
	whitePieces,
	initGameRender,
	renderHighLight,
	clearHighlight,
	selfHighlight,
	clearPreviousSelfHighlight,
	moveElement,
	globalStateRender,
	deletePiece
};