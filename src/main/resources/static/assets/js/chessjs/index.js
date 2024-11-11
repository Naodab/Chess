import { initGame } from "./data/data.js";
import { initGameRender, initGameFromFenRender } from "./render/main.js";
import { globalEvent } from "./event/global.js";

const playerInfo = document.querySelectorAll(".player-info");
const defeatedPieces = document.querySelectorAll(".defeated-pieces");
const gbContainer = document.querySelector(".game-board-container");

let ALLIANCE = "WHITE";
let OPPONENT = "BLACK";

function loadPageFunction(alliance) {
    if (alliance === "BLACK") {
        playerInfo[0].classList.add("alliance-black");
        playerInfo[1].classList.add("alliance-white");
        defeatedPieces[0].classList.add("alliance-black");
        defeatedPieces[1].classList.add("alliance-white");

        for (let i = 1; i <= 8; i++) {
            const digit = document.createElement('div');
            digit.innerText = i;
            digit.classList.add('game-board-container-digit');
            gbContainer.appendChild(digit);
        }
        const characters = document.createElement('div');
        characters.classList.add('game-board-container-character');
        for (let i = "h".charCodeAt(0); i >= "a".charCodeAt(0); i--) {
            const character = document.createElement('div');
            character.innerText = String.fromCharCode(i);
            character.classList.add('character');
            characters.appendChild(character);
        }
        gbContainer.appendChild(characters);
    } else if (alliance === "WHITE") {
        playerInfo[1].classList.add("alliance-black");
        playerInfo[0].classList.add("alliance-white");
        defeatedPieces[1].classList.add("alliance-black");
        defeatedPieces[0].classList.add("alliance-white");

        for (let i = 8; i >= 1; i--) {
            const digit = document.createElement('div');
            digit.innerText = i;
            digit.classList.add('game-board-container-digit');
            gbContainer.appendChild(digit);
        }
        const characters = document.createElement('div');
        characters.classList.add('game-board-container-character');
        for (let i = "a".charCodeAt(0); i <= "h".charCodeAt(0); i++) {
            const character = document.createElement('div');
            character.innerText = String.fromCharCode(i);
            character.classList.add('character');
            characters.appendChild(character);
        }
        gbContainer.appendChild(characters);
    }
    resize();
}

function resize() {
    const gbContainer = document.querySelector(".game-board-container");
    const playerInfoContainer = document.querySelector(".player-info-container");
    const defeatedPiecesContainer = document.querySelector(".defeated-pieces-container");
    playerInfoContainer.style.width = gbContainer.offsetHeight + "px";
    defeatedPiecesContainer.style.width = gbContainer.offsetHeight + "px";
    gbContainer.style.width = gbContainer.offsetHeight + 'px';
}

window.onresize = resize;

// will be useful when game ends
const globalState = initGame();

const matchID = localStorage.getItem("MATCH_ID");

let fen = "";
let apiBot = "/chess/api/steps/bot/" + matchID;
let apiHuman = "/chess/api/steps/human/" + matchID;

document.body.onload = async function () {
    await fetch("/chess/api/steps/bot/" + matchID, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`
        }
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        throw new Error("Match has been deleted or already finished");
    }).then(data => {
        loadPageFunction(ALLIANCE);
        fen = data.result.fen;
        const allianceWhite = document.querySelector(".player-info.alliance-white");
        const nameWhite = allianceWhite.querySelector(".name");
        const eloWhite = allianceWhite.querySelector(".elo");
        nameWhite.innerText = data.result.match.player.username;
        eloWhite.innerText = data.result.match.player.elo;
        initGameFromFenRender(globalState, fen);
        globalEvent();
    }).catch(error => {
        alert(error.message);
    })
}

export { globalState, ALLIANCE, OPPONENT };