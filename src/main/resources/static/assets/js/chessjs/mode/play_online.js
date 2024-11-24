import {
    confirm,
    innerPerson,
    renderWinner,
    alertMessage,
    renderMessage,
    turnOnOverlay,
    turnOffOverlay,
    turnOnGameModal,
    turnOffGameModal,
    renderPersonalInformation
} from "../opponents/message.js";
import {
    ROLE,
    ROOM,
    OPPONENT,
    ALLIANCE,
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
    setRoomAndComponents,
} from "../index.js";
import {getRoom} from "../../user/api/room.js";
import {createMatchOnline, getMatch} from "../../user/api/match.js";
import {
    turn,
    turnWhite,
    isEndGame,
    changeTurn,
    globalEvent,
    setIsEndGame,
    setTurnNumber,
    receiveMoveFromOthers,
} from "../event/global.js";
import {initGameFromFenRender, initGameRender} from "../render/main.js";
import {STEPS_CONTAINER} from "../helper/constants.js";
import {getTimeRemaining, resetClock, timeBlack, timeWhite, togglePause} from "../opponents/handleClock.js";
import {getSpiderActivity} from "../../util/spiderActivity.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const modalReadySelector = "#ready-confirm";
const modalWaitSelector = "#wait-others";

let ws;
let me;
let isMySelfReady = false;
let isOpponentReady = false;
let countDownTime;
let isChatRendered = false;

let persons = [];

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
    getSpiderActivity().then(data => {
        const ipAddress = data.result;
        ws = new WebSocket(`ws://${ipAddress}:8080/chess/websocket/chatInRoom/`
            + sessionStorage.getItem("ROOM_ID")
            + "?roomToken=" + sessionStorage.getItem("ROOM_ID"));
        ws.onopen = handleOpenSocket;
        ws.onmessage = handleSocketMessage;
    });
}

function handleOpenSocket() {
    console.log("Websocket to broadcast in a room is now opened! - RoomID: "
        + sessionStorage.getItem("ROOM_ID"));
    getRoom(sessionStorage.getItem("ROOM_ID")).then(room => {
        $("#id-room").textContent = room.id;
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
        addPerson(room.host, "HOST");
        if (room.player)
            addPerson(room.player, "PLAYER");
        if (room.viewers)
            room.viewers.forEach(viewer => addPerson(viewer, "VIEWER"));
    });
}

function handleSocketMessage(event) {
    const data = JSON.parse(event.data);
    if (data.type === "SEND_MESSAGE") {
        addMessages(data.user, data.message, true);
    } else if (data.type === "ENTER_ROOM") {
        getRoom(ROOM.id).then(room => {
            const other = data.user;
            const isExisted = persons.some(person => person.username === other.username);
            if(!isExisted) {
                addPerson(other, other.role);
            }

            if (other.role === "PLAYER") {
                ROOM.player = room.player;
                initComponent(other, OPPONENT.toLowerCase());
                if (ROLE !== "VIEWER" && !isMatchExecute) {
                    setTimeout(() => handleReadyModal(), 2000);
                }
            } else if (other.role === "VIEWER") {
                ROOM.viewers = room.viewers;
            }

            ROOM.matchActiveId = room.matchActiveId;
            setRoom(ROOM);
        });
    } else if (data.type === "READY") {
        if (data.isReady) {
            isOpponentReady = true;
            checkIfBothReady();
        }
        if (ROLE === "VIEWER") {
            setRoomAndComponents(ROOM);
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
            setIsMatchExecute(true);
        });
    } else if (data.type === "STEP") {
        receiveMoveFromOthers(data);
        handleDataTime(data);
    } else if (data.type === "RESPONSE_ENTER_ROOM") {
        setMatchNumber(data.matchNumber);
        setIsMatchExecute(data.isMatchExecute);
        setRoomAndComponents(ROOM);
        if (ROLE !== "VIEWER" && !isMatchExecute && ROOM.player) {
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
    } else if (data.type === "FORBIDDEN") {
        alertMessage("Không có quyền truy cập vào phòng chơi này.");

        $("#confirm").onclick = () => {
            turnOffOverlay();
            window.history.back();
        }
    } else if (data.type === "USER_LEAVE_ROOM") {
        if (data.isActive) {
            switch (data.role) {
                case "HOST":
                    ROOM.host = ROOM.player;
                    ROOM.player = null;
                    removePlayerFromUI(data.username);
                    setRoomData(ROOM);
                    clearPersonList();
                    addPerson(ROOM.host, "HOST");
                    if (ROOM.viewers)
                        ROOM.viewers.forEach(viewer => addPerson(viewer, "VIEWER"));
                    if(ROLE !== "VIEWER") {
                        turnOffGameModal(modalReadySelector);
                    }
                    break;
                case "PLAYER":
                    removePlayerFromUI(data.username);
                    removePersonFromUI(data.username);
                    if(ROLE !== "VIEWER") {
                        turnOffGameModal(modalReadySelector);
                    }
                    break;
                case "VIEWER":
                    removePersonFromUI(data.username);
                    break;
            }
        } else {
            alertMessage("Phòng hiện đã đóng.");
            $("#confirm").onclick = () => {
                turnOffOverlay();
                window.history.back();
            }
        }

        if (isMatchExecute && data.role !== "VIEWER") {
            let title = "Chiến thắng";
            if (ROLE === "VIEWER")
                title = (ALLIANCE === "WHITE" ? "Trắng " : "Đen ") + title;
            let time = ALLIANCE === "WHITE" ? getTimeRemaining(timeWhite)
                : getTimeRemaining(timeBlack);
            let winner = ALLIANCE;
            handleEndGame({
                title,
                state: "Đối thủ rời phòng",
                status: "SURRENDER",
                time,
                turn: Math.floor(turn / 2),
                winner
            });
        }
    } else if (data.type === "SURRENDER") {
        let title = "Chiến thắng";
        let time = ALLIANCE === "WHITE" ? getTimeRemaining(timeWhite)
            : getTimeRemaining(timeBlack);
        let winner = ALLIANCE;
        if (ROLE === "VIEWER") {
            title = (data.alliance === "WHITE" ? "Đen " : "Trắng ") + title;
            time = data.alliance === "WHITE" ? getTimeRemaining(timeBlack)
                : getTimeRemaining(timeWhite);
            winner = data.alliance === "WHITE" ? "BLACK" : "WHITE"
        }

        handleEndGame({
            title,
            state: "Đối thủ đầu hàng",
            status: "SURRENDER",
            time,
            turn: Math.floor(turn / 2),
            winner
        });
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
    const chatList = $(".chat-list");
    chatList.appendChild(div);
    div.scrollIntoView({ behavior: "smooth" });
}

function addPerson(person, role) {
    person.role = role;
    persons.push(person);
    const div = document.createElement('div');
    div.classList.add("person");
    div.id = person.username;
    div.innerHTML = innerPerson(person);
    if (ROLE !== "HOST" || person.role === "HOST") {
        div.classList.add("non-host");
    }
    $(".person-list").appendChild(div);

    div.onclick = () => {
        fetch(`/chess/api/users/username/${div.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("TOKEN")
            }
        }).then(response => {
            if (response.ok)
                return response.json();
        }).then(data => {
            turnOnOverlay(renderPersonalInformation, data.result);
        });
    }

    div.querySelector(".person-delete").onclick = event => {
        event.stopPropagation();
        if (ROLE !== "HOST" || isMatchExecute) return;
        const sendData = {
            type: "FORBIDDEN_USER",
            username: person.username
        }
        ws.send(JSON.stringify(sendData));
    }
}

// use for receive leave room from server
function removePersonFromUI(username) {
    const index = persons.findIndex(person => person.username === username);
    if (index > -1) {
        persons.splice(index, 1);
    }
    const personList = $(".person-list");
    const div = document.getElementById(`${username}`);
    personList.removeChild(div);
}

function removePlayerFromUI(username) {
    const allianceDelete = whitePlayer.username === username ? "alliance-white" : "alliance-black";
    const alliance = document.querySelector(`.player-info.${allianceDelete}`);
    const name = alliance.querySelector(".name");
    const elo = alliance.querySelector(".elo");
    const avatar = alliance.querySelector(".avatar");
    name.innerText = "";
    elo.innerHTML = "";
    avatar.style.background = ` no-repeat center center / cover`;
}

function clearPersonList() {
    persons = [];
    $(".person-list").innerHTML = "";
}

function handleEndGame(data) {
    turnOnOverlay(renderWinner, data);

    if (!timeWhite.isPaused) {
        togglePause(timeWhite);
    }
    if (!timeBlack.isPaused) {
        togglePause(timeBlack);
    }

    setMatchNumber(ROOM.matchNumber + 1);
    setIsMatchExecute(false);
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
        if (ROLE !== "VIEWER" && ROOM.player) {
            setTimeout(() => {
                if (ROLE !== "VIEWER" && ROOM.player) {
                    console.log(ROOM.player);
                    handleReadyModal();
                }
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
            console.log(ROOM.matchNumber);
            setMatchActiveId(data.id);
            reCreateGame();
            initStepsContainer();
            changeTurn(true);
            setIsEndGame(false);
            setTurnNumber(0);
            resetClock(sendData.time, sendData.time);
            togglePause(timeWhite);
            setIsMatchExecute(true);
        });
    }
}

if (MODE === "PLAY_ONLINE") {
    const btnHeader = $$(".right-item__header.online-header");
    btnHeader.forEach(header => {
        header.onclick = () => {
            if (isChatRendered) {
                $(".right-item__header.online-header.header__room")
                    .classList.add("active");
                $(".right-item__header.online-header.header__message")
                    .classList.remove("active");

                $(".persons").classList.add("active");
                $(".chats").classList.remove("active");
            } else {
                $(".right-item__header.online-header.header__room")
                    .classList.remove("active");
                $(".right-item__header.online-header.header__message")
                    .classList.add("active");

                $(".persons").classList.remove("active");
                $(".chats").classList.add("active");
            }
            isChatRendered = !isChatRendered;
        }
    });

    const sendChatInput = $("#send-chat-input");
    $("#send-message").onclick = () => {
        const messageContent = sendChatInput.value.trim();
        if (!messageContent) return;
        const user = {
            "username": sessionStorage.getItem("USERNAME"),
            "avatar": me.avatar
        }
        const dataToSend = {
            "type": "SEND_MESSAGE",
            "user": user,
            "message": messageContent
        }
        addMessages(user, messageContent);
        ws.send(JSON.stringify(dataToSend));
        sendChatInput.value = "";
    }

    sendChatInput.onkeyup = event => {
        if (event.keyCode === 13) $("#send-message").click();
    }

    $("#flag-lose").onclick = async () => {
        if (!isMatchExecute || ROLE === "VIEWER") return;
        const result = await confirm("Bạn chắc chứ?");
        if (!result) return;
        const dataSend = {
            type: "SURRENDER",
            alliance: ALLIANCE
        }
        ws.send(JSON.stringify(dataSend));
        handleEndGame({
            title: "Thua cuộc",
            status: "SURRENDER",
            state: "Đầu hàng",
            time: ALLIANCE === "WHITE" ? getTimeRemaining(timeWhite)
                : getTimeRemaining(timeBlack),
            winner: ALLIANCE === "WHITE" ? blackPlayer.id : whitePlayer.id
        });
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

    $("#exit-room-button").onclick = async () => {
        if (isMatchExecute) {
            const result = await confirm("Bạn sẽ thua nếu bạn thoát");
            if (result) {
                const dataSend = {
                    type: "LEAVE_ROOM_ACTIVELY",
                    roomId: sessionStorage.getItem("roomId"),
                    username: me.username,
                    role: ROLE
                }
                ws.send(JSON.stringify(dataSend));
                window.history.back();
            }
        } else {
            window.history.back();
        }
    }
}

export { ws, countDownTime, handleEndGame }