import { ROOM } from "../index.js";

let countDownTime = ROOM.time * 60 * 1000;

const timeWhite = {
    clock: document.querySelector(".player-info.alliance-white .clock"),
    endTime: new Date().getTime() + countDownTime,
    countDownInterval: null,
    isPaused: true
}

const timeBlack = {
    clock: document.querySelector(".player-info.alliance-black .clock"),
    endTime: new Date().getTime() + countDownTime,
    countDownInterval: null,
    isPaused: true
}

function updateCountDown(timeColor) {
    const now = new Date().getTime();
    const distance = timeColor.endTime - now;

    const minutes = Math.floor(distance / (1000 * 60));
    const seconds = Math.floor(distance % (1000 * 60) / 1000);

    document.querySelector(timeColor.selector + " .minutes")
        .textContent = minutes.toString().padStart(2, "0");
    document.querySelector(timeColor.selector + " .seconds")
        .textContent = seconds.toString().padStart(2, "0");

    if (distance < 0) {
        clearInterval(timeColor.countDownInterval);
        // TODO: announce time out
    }
}

function togglePause(timeColor) {
    if (timeColor.isPaused) {
        timeColor.endTime = new Date().getTime()
            + (parseInt(timeColor.clock.querySelector(".minutes").textContent) * 60 * 1000)
            + (parseInt(timeColor.clock.querySelector(".seconds").textContent) * 1000);

        timeColor.countDownInterval = setInterval(
            () => updateCountDown(timeColor),
            1000);
    } else {
        clearInterval(timeColor.countDownInterval);
    }
    timeColor.isPaused = !timeColor.isPaused;
}

export { timeWhite, timeBlack, togglePause }