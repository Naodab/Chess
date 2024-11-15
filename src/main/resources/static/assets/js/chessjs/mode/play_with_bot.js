import { createMatchBot } from "../../user/api/match.js";
import {confirm, innerStepAvatar} from "../opponents/message.js";
import {ROOT_DIV, STEPS_CONTAINER} from "../helper/constants.js";
import {globalState, reCreateGame} from "../index.js";
import {initGameRender} from "../render/main.js";

const $ = document.querySelector.bind(document);

const btnNewBotMatch = $("#create-new-match");
if (btnNewBotMatch) {
    btnNewBotMatch.onclick = async () => {
        let result = await confirm("Bạn chắc chắn chứ?");
        if (result) {
            createMatchBot().then(data => {
                localStorage.setItem("MATCH_ID", data.id);

                const div = document.createElement("div");
                div.classList.add("step-item");
                div.innerHTML = innerStepAvatar(data.player.avatar);
                STEPS_CONTAINER.innerHTML = "";
                STEPS_CONTAINER.appendChild(div);

                ROOT_DIV.innerHTML = "";
                reCreateGame();
                initGameRender(globalState);
            });
        }
    }
}