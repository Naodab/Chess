import {renderMessage} from "../opponents/message.js";

const $ = document.querySelector.bind(document);

let ws;

function initializeWebsocket() {
    ws = new WebSocket("ws://localhost:8080/chess/websocket/chatInRoom/" + sessionStorage.getItem("ROOM_ID"));
    ws.onopen = function () {
        console.log("Websocket to broadcast in a room is now opened! - RoomID: " + sessionStorage.getItem("ROOM_ID"));
    }
    ws.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.type === "SEND_MESSAGE") {
            addMessages(data.user, data.message, true);
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
    const scrollableElement = $(".scrollable-element");
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
$("#exit-room-button").onclick = () => {
    alert("Click exit room!");
    const data = {

    }
    fetch("../api/rooms/leaveRoom/" + sessionStorage.getItem("ROOM_ID"), {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("TOKEN")
        }
    })
}