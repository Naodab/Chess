import {
    renderMessage,
    turnOnGameModal,
    turnOffGameModal, turnOnOverlay, renderWinner, turnOffOverlay
} from "../opponents/message.js";
import {
    ROLE,
    OPPONENT,
    setRoom,
    whitePlayer,
    blackPlayer,
    ROOM,
    reCreateGame,
    initComponent,
    setMatchActiveId,
    matchNumber,
    setMatchNumber,
    addSteps,
    setRoomAndComponents,
    ALLIANCE, matchActiveId, globalState, setIsMatchExecute, setRoomData, isMatchExecute, initStepsContainer
} from "../index.js";
import {getRoom} from "../../user/api/room.js";
import {createMatchOnline, getMatch} from "../../user/api/match.js";
import {
    changeTurn,
    globalEvent,
    isEndGame,
    receiveMoveFromOthers,
    setIsEndGame,
    setTurnNumber,
    turnWhite
} from "../event/global.js";
import {initGameFromFenRender, initGameRender} from "../render/main.js";
import {STEPS_CONTAINER} from "../helper/constants.js";
import {getTimeRemaining, resetClock, timeBlack, timeWhite, togglePause} from "../opponents/handleClock.js";

const $ = document.querySelector.bind(document);
const modalReadySelector = "#ready-confirm";
const modalWaitSelector = "#wait-others";

let ws;
let me;
let isMySelfReady = false;
let isOpponentReady = false;
let countDownTime;

function handleReadyModal() {
    turnOnGameModal(modalReadySelector);
    $("#ready").onclick = () => {
        isMySelfReady = true;
        const sendData = {
            type: "READY",
            isReady: isMySelfReady
        }
        ws.send(JSON.stringify(sendData));
        turnOffGameModal(modalReadySelector);
        turnOnGameModal(modalWaitSelector);
        checkIfBothReady();
    }
}

function initializeWebsocket() {
    ws = new WebSocket("ws://localhost:8080/chess/websocket/chatInRoom/"
        + sessionStorage.getItem("ROOM_ID")
        + "?roomToken=" + sessionStorage.getItem("ROOM_ID"));
    ws.onopen = function () {
        console.log("Websocket to broadcast in a room is now opened! - RoomID: " + sessionStorage.getItem("ROOM_ID"));
        getRoom(sessionStorage.getItem("ROOM_ID")).then(room => {
            setRoomData(room);
            switch (ROLE) {
                case "HOST":
                    me = room.host;
                    break;
                case "PLAYER":
                    me = room.player;
                    break;
                case "VIEWER":
                    me = room.viewers.find(viewer => viewer.username ===
                        sessionStorage.getItem("USERNAME"));
                    break;
            }
            const dataToSend = {
                type: "ENTER_ROOM",
                user: {
                    username: sessionStorage.getItem("USERNAME"),
                    avatar: me.avatar,
                    elo: me.elo,
                    role: ROLE,
                },
                time: ROOM.time * 60
            }
            ws.send(JSON.stringify(dataToSend));
        });
    }

    ws.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.type === "SEND_MESSAGE") {
            addMessages(data.user, data.message, true);
        } else if (data.type === "ENTER_ROOM") {
            getRoom(ROOM.id).then(room => {
                const other = data.user;
                if (other.role === "PLAYER") {
                    ROOM.player = room.player;
                    initComponent(other, OPPONENT.toLowerCase());
                    if (ROLE !== "VIEWER" && !matchActiveId) {
                        setTimeout(() => handleReadyModal(), 2000);
                    }
                } else if (other.role === "VIEWER") {
                    ROOM.viewers = room.viewers;
                    // TODO: render viewers
                }
                ROOM.matchActiveId = room.matchActiveId;
                setRoom(ROOM);
            });
        } else if (data.type === "READY") {
            if (data.isReady) {
                isOpponentReady = true;
                checkIfBothReady();
            }
            if (isMatchExecute && ROLE === "VIEWER") {
                setRoom(ROOM);
            }
        } else if (data.type === "BEGIN_MATCH") {
            setMatchActiveId(data.matchId);
            getMatch("human", data.matchId).then(match => {
                sessionStorage.setItem("MATCH_ID", match.id);
                initStepsContainer();
                reCreateGame();
                setTurnNumber(0);
                resetClock(match.timeWhite, match.timeBlack);
                togglePause(timeWhite);
                changeTurn(true);
                setIsEndGame(false);
            });
        } else if (data.type === "STEP") {
            receiveMoveFromOthers(data);
            handleDataTime(data);
        } else if (data.type === "RESPONSE_ENTER_ROOM") {
            setMatchNumber(data.matchNumber);
            setIsMatchExecute(data.isMatchExecute);
            setRoomAndComponents(ROOM);
            if (ROLE === "PLAYER" && !isMatchExecute) {
                setTimeout(() => handleReadyModal(), 2000);
            }

            if (isMatchExecute) {
                getMatch("human", matchActiveId).then(match => {
                    sessionStorage.setItem("MATCH_ID", match.id);
                    initStepsContainer();
                    let steps = match.steps;
                    if (steps.length === 0) {
                        initGameRender(globalState);
                    } else {
                        steps.sort((a, b) => {
                            const numA = parseInt(a.fen.match(/\d+$/)[0]);
                            const numB = parseInt(b.fen.match(/\d+$/)[0]);
                            return numA - numB;
                        });
                        addSteps(steps);
                        STEPS_CONTAINER.scrollLeft = STEPS_CONTAINER.scrollWidth;
                        const fen = steps[steps.length - 1].fen;
                        initGameFromFenRender(globalState, fen);
                    }
                    if (ROLE !== "VIEWER") globalEvent();
                });
                handleDataTime(data);
            }
        } else if (data.type === "DATA_TIME") {
            handleDataTime(data);
        }
    }
}

function handleDataTime(data) {
    if (!timeWhite.isPaused) {
        togglePause(timeWhite);
    }
    if (!timeBlack.isPaused) {
        togglePause(timeBlack);
    }
    const whiteRemainingTime = data.timeWhite;
    const blackRemainingTime = data.timeBlack;
    resetClock(whiteRemainingTime, blackRemainingTime);
    const isTurnWhite = data.turnWhite;
    changeTurn(isTurnWhite);
    if (!isEndGame) {
        let timeColor = timeWhite;
        if (!turnWhite) {
            timeColor = timeBlack;
        }
        togglePause(timeColor);
    }
}

window.addEventListener("load", () => {
    if (MODE === "PLAY_ONLINE") {
        initializeWebsocket();
    }
});

function addMessages(user, message, isOther = false) {
    const div = document.createElement("div");
    div.classList.add("message");
    if (isOther) {
        div.classList.add("other");
    }
    div.innerHTML = renderMessage(user, message);
    document.querySelector(".chat-list").appendChild(div);
    const scrollableElement = $(".chat-list");
    scrollableElement.scrollTop = scrollableElement.scrollHeight;
}

const sendMessageBtn = $("#send-message");
if (sendMessageBtn) {
    sendMessageBtn.onclick = () => {
        const messageContent = $("#send-chat-input");
        if (messageContent !== "") {
            const user = {
                "username": sessionStorage.getItem("USERNAME"),
                "avatar": avatar
            }
            const dataToSend = {
                "type": "SEND_MESSAGE",
                "user": user,
                "message": messageContent.value
            }
            addMessages(user, messageContent.value);
            ws.send(JSON.stringify(dataToSend));
            messageContent.value = "";
        }
    }
}

function handleEndGame(data) {
    turnOnOverlay(renderWinner, data);

    if (!timeWhite.isPaused) {
        togglePause(timeWhite);
    }
    if (!timeBlack.isPaused) {
        togglePause(timeBlack);
    }

    if (ROLE === "HOST") {
        let winnerId = "DRAW";
        switch (data.winner) {
            case "WHITE":
                winnerId = whitePlayer.id;
                break;
            case "BLACK":
                winnerId = blackPlayer.id;
                break;
        }

        const dataSend = {
            type: "END_MATCH",
            timeWhitePlayer: getTimeRemaining(timeWhite),
            timeBlackPlayer: getTimeRemaining(timeBlack),
            gameStatus: data.status,
            winnerId
        }

        fetch("/chess/api/matches/human/" + matchActiveId, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("TOKEN")
            },
            body: JSON.stringify(dataSend)
        }).then(response => response.json())
        .then(data => {
            ws.send(JSON.stringify({ type: "END_MATCH" }));
        }).catch(error => console.log(error));
    }

    $("#ok").onclick = () => {
        turnOffOverlay();
        if (ROLE !== "VIEWER") {
            setTimeout(() => {
                handleReadyModal();
            }, 1000);
        }
    }
}

function checkIfBothReady() {
    if (!(isMySelfReady && isOpponentReady)) return;
    timeWhite.isPaused = true;
    timeBlack.isPaused = true;
    turnOffGameModal(modalWaitSelector);
    isMySelfReady = false;
    isOpponentReady = false;
    if (ROOM.matchNumber !== 0) {
        setRoomAndComponents(ROOM);
    }
    if (ROLE === "HOST") {
        createMatchOnline(whitePlayer.id, blackPlayer.id, ROOM.id).then(data => {
            const sendData = {
                type: "BEGIN_MATCH",
                matchId: data.id,
                time: ROOM.time * 60
            }
            ws.send(JSON.stringify(sendData));

            sessionStorage.setItem("MATCH_ID", data.id);
            setMatchActiveId(data.id);
            reCreateGame();
            initStepsContainer();
            changeTurn(true);
            setIsEndGame(false);
            setTurnNumber(0);
            resetClock(sendData.time, sendData.time);
            togglePause(timeWhite);
        });
    }
}

if (MODE === "PLAY_ONLINE") {
    $("#flag-lose").onclick = () => {
        //TODO:
    }

    $("#handshake").onclick = () => {
        //TODO:
    }

    $("#return-left").onclick = () => {
        //TODO:
    }

    $("#return-right").onclick = () => {
        //TODO:
    }

    //NOTE: TODO: exit room!
    $("#exit-room-button").onclick = async () => {
        fetch("../api/rooms/leaveRoom/" + sessionStorage.getItem("ROOM_ID"), {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("TOKEN")
            },
        }).then(response => {
            return response.ok;
        })
        const dataToSend = {
            type: "LEAVE_ROOM",
            id: sessionStorage.getItem("ROOM_ID")
        };
        ws.send(JSON.stringify(dataToSend));
        window.location.href = "../public/home";
    }
}

export { ws, countDownTime, handleEndGame }