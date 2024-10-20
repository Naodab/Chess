import { initGame } from "./data/data.js";
import { initGameRender, initGameFromFenRender } from "./render/main.js";
import { globalEvent } from "./event/global.js";

window.onload = function() {
    const gbContainer = document.querySelector(".game-board-container");
    gbContainer.style.width = gbContainer.offsetHeight + 'px';
}

window.onresize = function() {
    const gbContainer = document.querySelector(".game-board-container");
    gbContainer.style.width = gbContainer.offsetHeight + 'px';
}

// will be useful when game ends
const globalState = initGame();

const matchID = localStorage.getItem("MATCH_ID");
const allianceWhite = document.querySelector(".player-info.alliance-white");
const nameWhite = allianceWhite.querySelector(".name");
const eloWhite = allianceWhite.querySelector(".elo");
let fen = "";
document.body.onload = async function () {
    await fetch(`/chess/api/steps/bot/${matchID}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`
        }
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        throw new Error("Match has been deleted or already played");
    }).then(data => {
        fen = data.result.fen;
        nameWhite.innerText = data.result.match.player.username;
        eloWhite.innerText = data.result.match.player.elo;
        initGameFromFenRender(globalState, fen);
        globalEvent();
    }).catch(error => {
        alert(error.message);
    })
}

export { globalState };