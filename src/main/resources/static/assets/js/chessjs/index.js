import { initGame } from "./data/data.js";
import { initGameRender, initGameFromFenRender } from "./render/main.js";
import { globalEvent } from "./event/global.js";
import { STEPS_CONTAINER } from "./helper/constants.js";
import { renderMessage } from "./opponents/message.js";

const playerInfo = document.querySelectorAll(".player-info");
const defeatedPieces = document.querySelectorAll(".defeated-pieces");
const gbContainer = document.querySelector(".game-board-container");

let globalState = initGame();

const matchID = localStorage.getItem("MATCH_ID");

let apiBot = "/chess/api/matches/bot/" + matchID;
let apiHuman = "/chess/api/matches/human/" + matchID;

let ALLIANCE = "WHITE";
let OPPONENT = "BLACK";
let ROOM;
let ROLE = "PLAYER";
let matchNumber = localStorage.getItem("MATCH_NUMBER") ? localStorage.getItem("MATCH_NUMBER") : 0;
let blackPlayer;
let whitePlayer;

function reCreateGame() {
    globalState = initGame();
}

function loadPageFunction(alliance) {
    playerInfo.forEach(info => {
        if (info.classList.contains("alliance-black")) {
            info.classList.remove("alliance-black");
        }
        if (info.classList.contains("alliance-white")) {
            info.classList.remove("alliance-white");
        }
    });

    defeatedPieces.forEach(info => {
        if (info.classList.contains("alliance-black")) {
            info.classList.remove("alliance-black");
        }
        if (info.classList.contains("alliance-white")) {
            info.classList.remove("alliance-white");
        }
    });

    const digitContainers =
        gbContainer.querySelectorAll(".game-board-container-digit");
    digitContainers.forEach(div => gbContainer.removeChild(div));
    const characterContainers =
        gbContainer.querySelectorAll(".game-board-container-character");
    characterContainers.forEach(div => gbContainer.removeChild(div));

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

function addSteps(steps) {
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
}

// function add message.
// nếu nhận message từ user khác thì truyền isOther = true, nếu là của mình thì không cần truyền vì đã có mặc định
function addMessage(user, message, isOther = false) {
    const div = document.createElement("div");
    div.classList.add("message");
    if (isOther) {
        div.classList.add("other");
    }
    div.innerHTML = renderMessage(user, message);
    document.querySelector(".chat-list").appendChild(div);
}

function getRole(username) {
    if (ROOM.host.username === username) {
        return "HOST";
    } else if (ROOM.player.username === username) {
        return "PLAYER";
    }
    return "VIEWER";
}

function initComponent(player, color) {
    const alliance = document.querySelector(".player-info.alliance-" + color);
    const name = alliance.querySelector(".name");
    const elo = alliance.querySelector(".elo");
    const avatar = alliance.querySelector(".avatar");
    name.innerText = player.username;
    elo.innerText = player.elo;
    avatar.style.background = `url('${player.avatar}') no-repeat center center / cover`;
}

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
            initComponent(data.player, "white");
            let steps = data.steps;
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
            addSteps(steps);
            STEPS_CONTAINER.scrollLeft = STEPS_CONTAINER.scrollWidth;
            const fen = steps[steps.length - 1].fen;
            initGameFromFenRender(globalState, fen);
            globalEvent();
        });
    } else {
        await fetch(`/chess/api/rooms/${sessionStorage.getItem("ROOM_ID")}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
        }).then(data => data.result)
        .then(data => {
            ROOM = data;
            ROLE = getRole(sessionStorage.getItem("USERNAME"));
            if (matchNumber % 2 === 0) {
                whitePlayer = ROOM.host;
                blackPlayer = ROOM.player;
                if (ROLE === "PLAYER") {
                    ALLIANCE = "BLACK";
                    OPPONENT = "WHITE";
                }
            } else {
                whitePlayer = ROOM.player;
                blackPlayer = ROOM.host;
                if (ROLE === "HOST" || ROLE === "VIEWER") {
                    ALLIANCE = "BLACK";
                    OPPONENT = "WHITE"
                }
            }
            console.log(ALLIANCE)
            loadPageFunction(ALLIANCE);
            if (whitePlayer)
                initComponent(whitePlayer, "white");
            if (blackPlayer)
                initComponent(blackPlayer, "black");
        });
    }
}

export { globalState, ALLIANCE, OPPONENT, ROLE, reCreateGame, ROOM };