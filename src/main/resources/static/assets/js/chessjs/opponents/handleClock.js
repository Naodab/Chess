import { ROOM } from "../index.js";

let countDownTime = 0;

const timeWhite = {
    clock: null,
    endTime: 0,
    countDownInterval: null,
    isPaused: true
}

const timeBlack = {
    clock: null,
    endTime: 0,
    countDownInterval: null,
    isPaused: true
}

function updateCountDown(timeColor) {
    const now = new Date().getTime();
    const distance = timeColor.endTime - now;

    const minutes = Math.floor(distance / (1000 * 60));
    const seconds = Math.floor(distance % (1000 * 60) / 1000);

    timeColor.clock.querySelector(".minutes")
        .textContent = minutes.toString().padStart(2, "0");
    timeColor.clock.querySelector(".seconds")
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

function resetClock() {
    timeWhite.clock = document.querySelector(".player-info.alliance-white .clock");
    timeBlack.clock = document.querySelector(".player-info.alliance-black .clock");

    countDownTime = ROOM.time * 60 * 1000;
    timeWhite.endTime = new Date().getTime() + countDownTime;
    timeBlack.endTime = new Date().getTime() + countDownTime;

    updateCountDown(timeBlack);
    updateCountDown(timeWhite);
}

export { timeWhite, timeBlack, togglePause, resetClock }