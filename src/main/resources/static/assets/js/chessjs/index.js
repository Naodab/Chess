import { initGame } from "./data/data.js";
import { initGameRender, initGameFromFenRender } from "./render/main.js";
import { globalEvent } from "./event/global.js";

const name2 = document.getElementById("name-2");

// will be useful when game ends
const globalState = initGame();

const matchID = localStorage.getItem("MATCH_ID");
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
        console.log(data);
        fen = data.result.fen;
        name2.innerText = `${data.result.match.player.username}(${data.result.match.player.elo})`;
        initGameFromFenRender(globalState, fen);
        globalEvent();
    }).catch(error => {
        alert(error.message);
    })
}

export { globalState };