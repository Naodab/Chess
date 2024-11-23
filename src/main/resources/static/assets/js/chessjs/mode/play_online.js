import {
    renderMessage,
    turnOnGameModal,
    turnOffGameModal
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
    setRoomAndComponents,
    ALLIANCE
} from "../index.js";
import {getRoom} from "../../user/api/room.js";
import {createMatchOnline, getMatch} from "../../user/api/match.js";
import {receiveMoveFromOthers} from "../event/global.js";

const $ = document.querySelector.bind(document);
const modalReadySelector = "#ready-confirm";
const modalWaitSelector = "#wait-others";

let ws;
let isMySelfReady = false;
let isOpponentReady = false;

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
    }

    let internal = setInterval(() => {
        if (isOpponentReady && isMySelfReady) {
            clearInterval(internal);
            turnOffGameModal(modalWaitSelector);
            if (ROLE === "HOST") {
                console.log(blackPlayer, whitePlayer);
                createMatchOnline(whitePlayer.id, blackPlayer.id, ROOM.id).then(data => {
                    const sendData = {
                        type: "BEGIN_MATCH",
                        matchId: data.id
                    }
                    ws.send(JSON.stringify(sendData));

                    sessionStorage.setItem("MATCH_ID", data.id);
                    setMatchActiveId(data.id);
                    reCreateGame();
                    console.log(ALLIANCE);
                });
            }
        }
    }, 200);
}

function initializeWebsocket() {
    ws = new WebSocket("ws://localhost:8080/chess/websocket/chatInRoom/" + sessionStorage.getItem("ROOM_ID"));
    ws.onopen = function () {
        console.log("Websocket to broadcast in a room is now opened! - RoomID: " + sessionStorage.getItem("ROOM_ID"));
        getRoom(sessionStorage.getItem("ROOM_ID")).then(room => {
            setRoomAndComponents(room);
            console.log(room);
            if (ROLE !== "HOST") {
                let avatar = "";
                let elo;
                if (ROLE === "PLAYER") {
                    avatar = room.player.avatar;
                    elo = room.player.elo;
                } else {
                    const view = room.viewers.find(viewer => viewer.username ===
                        sessionStorage.getItem("USERNAME"));
                    elo = view.elo;
                    avatar = view.avatar;
                }
                const user = {
                    username: sessionStorage.getItem("USERNAME"),
                    avatar,
                    elo,
                    role: ROLE
                }
                const dataToSend = {
                    type: "ENTER_ROOM",
                    user
                }
                ws.send(JSON.stringify(dataToSend));
                if (ROLE === "PLAYER") {
                    setTimeout(() => handleReadyModal(), 3000);
                }
            }
        });
    }
    ws.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.type === "SEND_MESSAGE") {
            addMessages(data.user, data.message, true);
        } else if (data.type === "ENTER_ROOM") {
            getRoom(ROOM.id).then(room => {
                setRoom(room);
                console.log(data.user);
                const other = data.user;
                if (other.role === "PLAYER") {
                    initComponent(other, OPPONENT.toLowerCase());
                    if (ROLE !== "VIEWER") {
                        setTimeout(() => handleReadyModal(), 3000);
                    }
                }
            });
        } else if (data.type === "READY") {
            if (data.isReady) {
                isOpponentReady = true;

            }
        } else if (data.type === "BEGIN_MATCH") {
            setMatchActiveId(data.matchId);
            getMatch("human", data.matchId).then(match => {
                sessionStorage.setItem("MATCH_ID", match.id);
                reCreateGame();
                console.log(ALLIANCE)
            });
        } else if (data.type === "STEP") {
            receiveMoveFromOthers(data);
        }
    }
}

window.addEventListener("load", () => {
    initializeWebsocket();
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

$("#send-message").onclick = () => {
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

export { ws }