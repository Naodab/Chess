import { initGame } from "./data/data.js";
import {
    initGameRender,
    initGameFromFenRender,
    deletePieceForReview,
    createPieceForReview
} from "./render/main.js";
import { globalEvent } from "./event/global.js";
import {BLACK_DEFEATED_PIECES, ROOT_DIV, STEPS_CONTAINER, WHITE_DEFEATED_PIECES} from "./helper/constants.js";
import {innerStepAvatar} from "./components/message.js";
import {getMatch} from "../user/api/match.js";
import {getPieceAtPosition} from "./helper/commonHelper.js";

const gbContainer = document.querySelector(".game-board-container");

let globalState = initGame();

const matchID = localStorage.getItem("MATCH_ID");

let apiBot = "/chess/api/matches/bot/" + matchID;

let ALLIANCE = "WHITE";
let OPPONENT = "BLACK";
let ROOM;
let ROLE = "PLAYER";
let matchActiveId;
let matchNumber = 0;
let blackPlayer;
let whitePlayer;
let isMatchExecute = false;

function setIsMatchExecute(execute) {
    isMatchExecute = execute;
}

function reCreateGame() {
    globalState = initGame();
    ROOT_DIV.innerHTML = "";
    document.querySelector(WHITE_DEFEATED_PIECES).innerHTML = "";
    document.querySelector(BLACK_DEFEATED_PIECES).innerHTML = "";
    initGameRender(globalState);
    globalEvent();
}

function setMatchNumber(number) {
    ROOM.matchNumber = number;
}

function setMatchActiveId(id) {
    matchActiveId = id;
}

function setRoomData(data) {
    ROOM = data;
    ROLE = getRole(sessionStorage.getItem("USERNAME"));
}

function setRoom(data) {
    setRoomData(data);
    if (ROOM.matchNumber % 2 === 0) {
        whitePlayer = ROOM.host;
        blackPlayer = ROOM.player;
        if (ROLE === "PLAYER") {
            ALLIANCE = "BLACK";
            OPPONENT = "WHITE";
        } else {
            ALLIANCE = "WHITE";
            OPPONENT = "BLACK";
        }
    } else {
        whitePlayer = ROOM.player;
        blackPlayer = ROOM.host;
        if (ROLE === "HOST" || ROLE === "VIEWER") {
            ALLIANCE = "BLACK";
            OPPONENT = "WHITE"
        } else {
            ALLIANCE = "WHITE";
            OPPONENT = "BLACK";
        }
    }
    matchActiveId = ROOM.matchActiveId;
}

function setRoomAndComponents(data) {
    setRoom(data);
    loadPageFunction(ALLIANCE);
    if (whitePlayer)
        initComponent(whitePlayer, "white");
    if (blackPlayer)
        initComponent(blackPlayer, "black");
}

function loadPageFunction(alliance) {
    const playerInfo = document.querySelectorAll(".player-info");
    const defeatedPieces = document.querySelectorAll(".defeated-pieces");

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

function addSteps(steps, isReview = false) {
    steps.forEach((step, index) => {
        if (index % 2 === 0) {
            const div = document.createElement("div");
            div.classList.add("step-item");
            div.innerHTML = `
                <div class="step-index">${Math.floor(index / 2) + 1}</div>
                <div class="step-container alliance-white">
                    <div class="step">${step.name}</div>
                </div>
                <div class="step-container alliance-black">
                    <div class="step"></div>
                </div>
            `;
            STEPS_CONTAINER.appendChild(div);
            div.scrollIntoView({ behavior: "smooth" });
        } else {
            const steps = document.querySelectorAll('.step');
            const lastStep = steps[steps.length - 1];
            lastStep.innerHTML = step.name;
        }
    });
}

function getRole(username) {
    if (ROOM.host.username === username) {
        return "HOST";
    } else if (ROOM.player && ROOM.player.username === username) {
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

function initStepsContainer(white = whitePlayer, black = blackPlayer) {
    const div = document.createElement("div");
    div.classList.add("step-item");
    div.innerHTML = innerStepAvatar(white.avatar, black.avatar);
    STEPS_CONTAINER.innerHTML = "";
    STEPS_CONTAINER.appendChild(div);
}

document.body.onload = async function () {
    if (MODE === "PLAY_WITH_BOT") {
        await fetch(apiBot, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("TOKEN")}`
            }
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error("Match has been deleted or already finished");
        }).then(data => data.result)
        .then(data => {
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
    } else if (MODE === "REVIEW") {
        getMatch("human", sessionStorage.getItem("MATCH_ID")).then(match => {
            let me, opponent;
            if (match.white.username === sessionStorage.getItem("USERNAME")) {
                me = match.white;
                ALLIANCE = "WHITE";
                opponent = match.black;
                OPPONENT = "BLACK";
            } else {
                me = match.black;
                ALLIANCE = "BLACK";
                opponent = match.white;
                OPPONENT = "WHITE";
            }
            loadPageFunction(ALLIANCE);
            initComponent(me, ALLIANCE.toLowerCase());
            initComponent(opponent, OPPONENT.toLowerCase());
            let steps = match.steps;
            if (steps.length === 0) {
                initGameRender(globalState);
                return;
            }
            steps.sort((a, b) => {
                const numA = parseInt(a.fen.match(/\d+$/)[0]);
                const numB = parseInt(b.fen.match(/\d+$/)[0]);
                return numA - numB;
            });
            if (ALLIANCE === "WHITE")
                initStepsContainer(me, opponent);
            else
                initStepsContainer(opponent, me);
            addSteps(steps);
            STEPS_CONTAINER.scrollLeft = STEPS_CONTAINER.scrollWidth;
            initGameFromFenRender(globalState, steps[0].fen);
            eventStep(steps);
        });
    }
}

function compareFENChanges(fen1, fen2) {
    const parseFEN = (fen) => {
        const rows = fen.split(' ')[0].split('/');
        return rows.map(row => {
            let expandedRow = '';
            for (let char of row) {
                if (!isNaN(char)) {
                    expandedRow += '.'.repeat(Number(char));
                } else {
                    expandedRow += char;
                }
            }
            return expandedRow;
        });
    };

    const board1 = parseFEN(fen1);
    const board2 = parseFEN(fen2);

    let changes = [];
    for (let i = 0; i < board1.length; i++) {
        for (let j = 0; j < board1[i].length; j++) {
            if (board1[i][j] !== board2[i][j]) {
                changes.push({
                    position: `${String.fromCharCode(97 + j)}${8 - i}`,
                    from: board1[i][j] === '.' ? 'empty' : board1[i][j],
                    to: board2[i][j] === '.' ? 'empty' : board2[i][j]
                });
            }
        }
    }

    return changes;
}

function eventStep(steps) {
    let activeIndex = 0;
    const stepDivs = document.querySelectorAll(".step");
    stepDivs[activeIndex].classList.add("active");
    stepDivs.forEach((stepDiv, index) => {
        stepDiv.onclick = () => {
            if (index === activeIndex) return;
            stepDivs[activeIndex].classList.remove("active");
            const changes = compareFENChanges(steps[activeIndex].fen, steps[index].fen);
            changes.forEach(change => {
                if (change.from !== "empty") {
                    deletePieceForReview(getPieceAtPosition(change.position));
                }
                if (change.to !== "empty") {
                    createPieceForReview(change);
                }
            });
            stepDiv.classList.add("active");
            activeIndex = index;
        }
    });

    const right = document.querySelector("#return-right");
    const left = document.querySelector("#return-left");
    const playBtn = document.querySelector("#play");
    const pauseBtn = document.querySelector("#pause");

    right.onclick = () => {
        if (activeIndex === steps.length - 1) return;
        stepDivs[activeIndex + 1].click();
    }

    left.onclick = () => {
        if (activeIndex === 0) return;
        stepDivs[activeIndex - 1].click();
    }

    let internal;

    playBtn.onclick = () => {
        playBtn.style.display = "none";
        pauseBtn.style.display = "flex";

        internal = setInterval(() => {
            if (activeIndex === steps.length - 1) {
                pauseBtn.click();
            }
            else stepDivs[activeIndex + 1].click();
        }, 1000);
    }

    pauseBtn.onclick = () => {
        playBtn.style.display = "flex";
        pauseBtn.style.display = "none";
        clearInterval(internal);
    }

    document.querySelector("#exit").onclick = () => {
        window.history.back();
    }
}

export {
    ROOM,
    ROLE,
    ALLIANCE,
    OPPONENT,
    matchNumber,
    whitePlayer,
    blackPlayer,
    globalState,
    matchActiveId,
    isMatchExecute,
    setRoom,
    addSteps,
    setRoomData,
    reCreateGame,
    initComponent,
    setMatchNumber,
    setMatchActiveId,
    setIsMatchExecute,
    initStepsContainer,
    setRoomAndComponents
};