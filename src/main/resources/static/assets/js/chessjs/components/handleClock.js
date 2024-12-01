import {countDownTime, handleEndGame} from "../mode/play_online.js";
import {ALLIANCE, ROLE, ROOM} from "../index.js";
import {turn} from "../event/global.js";

const timeWhite = {
    color: "WHITE",
    clock: null,
    endTime: 0,
    countDownInterval: null,
    isPaused: true
}

const timeBlack = {
    color: "BLACK",
    clock: null,
    endTime: 0,
    countDownInterval: null,
    isPaused: true
}

function getTimeRemaining(timeColor) {
    const minute = parseInt(timeColor.clock
        .querySelector(".minutes").textContent);
    const second = parseInt(timeColor
        .clock.querySelector(".seconds").textContent);

    return ROOM.time * 60 - minute * 60 - second;
}

function updateCountDown(timeColor) {
    const now = new Date().getTime();
    const distance = timeColor.endTime - now;

    const minutes = Math.floor(distance / (1000 * 60));
    const seconds = Math.floor(distance % (1000 * 60) / 1000);

    const minutesDiv = timeColor.clock.querySelector(".minutes");
    const secondsDiv = timeColor.clock.querySelector(".seconds");

    minutesDiv.textContent = minutes.toString().padStart(2, "0");
    secondsDiv.textContent = seconds.toString().padStart(2, "0");

    if (distance <= 0) {
        minutesDiv.textContent = "00";
        secondsDiv.textContent = "00";

        clearInterval(timeColor.countDownInterval);
        let title = ALLIANCE === timeColor.color ? "Thua cuộc" : "Chiến thắng";
        let time = ALLIANCE === "WHITE" ? getTimeRemaining(timeWhite)
                : getTimeRemaining(timeBlack);

        if (ROLE === "VIEWER") {
            title = ("WHITE" === timeColor.color ? "Đen" : "Trắng") + " chiến thắng" ;
            time = "WHITE" === timeColor ? getTimeRemaining(timeBlack) : getTimeRemaining(timeWhite);
        }
        handleEndGame({
            title,
            state: "Hết giờ",
            status: "TIME_OUT",
            time,
            turn: Math.floor(turn / 2),
            winner: timeColor.color === "WHITE" ? "BLACK" : "WHITE",
        });
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

function resetClock(whiteRemainTime = countDownTime,
                    blackRemainTime = countDownTime) {
    timeWhite.clock = document.querySelector(".player-info.alliance-white .clock");
    timeBlack.clock = document.querySelector(".player-info.alliance-black .clock");

    timeWhite.endTime = new Date().getTime() + whiteRemainTime * 1000;
    timeBlack.endTime = new Date().getTime() + blackRemainTime * 1000;

    updateCountDown(timeBlack);
    updateCountDown(timeWhite);
}

export { timeWhite, timeBlack, getTimeRemaining, togglePause, resetClock }