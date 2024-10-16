import { initGame } from "./data/data.js";
import { initGameRender } from "./render/main.js";
import { globalEvent } from "./event/global.js";

// will be useful when game ends
const globalState = initGame();

initGameRender(globalState);
globalEvent();

export { globalState };