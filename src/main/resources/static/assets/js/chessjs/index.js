import { initGame } from "./data/data.js";
import { initGameRender, initGameFromFenRender } from "./render/main.js";
import { globalEvent } from "./event/global.js";
import { STEPS_CONTAINER } from "./helper/constants.js";

const playerInfo = document.querySelectorAll(".player-info");
const defeatedPieces = document.querySelectorAll(".defeated-pieces");
const gbContainer = document.querySelector(".game-board-container");

let ALLIANCE = "WHITE";
let ROLE = "PLAYER";
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

let apiBot = "/chess/api/matches/bot/" + matchID;
let apiHuman = "/chess/api/matches/human/" + matchID;

document.body.onload = async function () {
    if (MODE === "PLAY_WITH_BOT") {
        await fetch(apiBot, {
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
        }).then(data => data.result)
        .then(data => {
            console.log(data);
            loadPageFunction(ALLIANCE);
            const allianceWhite = document.querySelector(".player-info.alliance-white");
            const nameWhite = allianceWhite.querySelector(".name");
            const eloWhite = allianceWhite.querySelector(".elo");
            nameWhite.innerText = data.player.username;
            eloWhite.innerText = data.player.elo;
            let steps = data.steps;
            console.log(steps.length === 0);
            if (steps.length === 0) {
                initGameRender(globalState);
                globalEvent();
                return;
            }
            steps.sort((a, b) => {
                const numA = parseInt(a.fen.match(/\d+$/)[0]);
                const numB = parseInt(b.fen.match(/\d+$/)[0]);
                return numA - numB;
            });
            steps.forEach((step, index) => {
                console.log(step.name)
                if (index % 2 === 0) {
                    const div = document.createElement("div");
                    div.classList.add("step-item");
                    div.innerHTML = `
                        <div class="step-index">${Math.floor(index / 2) + 1}</div>
                        <div class="step-container">
                            <div class="step">${step.name}</div>
                        </div>
                        <div class="step-container">
                            <div class="step"></div>
                        </div>
                    `;
                    STEPS_CONTAINER.appendChild(div);
                } else {
                    const steps = document.querySelectorAll('.step');
                    const lastStep = steps[steps.length - 1];
                    lastStep.innerHTML = step.name;
                }
            });
            STEPS_CONTAINER.scrollLeft = STEPS_CONTAINER.scrollWidth;
            const fen = steps[steps.length - 1].fen;
            initGameFromFenRender(globalState, fen);
            globalEvent();
        });
    } else {
        // TODO: for human play render
    }
}
export { globalState, ALLIANCE, OPPONENT };