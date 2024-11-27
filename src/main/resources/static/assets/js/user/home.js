import {
    renderPersonalInformation,
    renderUpdateAvatar,
    renderConfirm,
    renderChangePassword,
    renderCreateRoom,
    renderRoom,
    renderTopUser,
    renderFindRoom,
    renderEnterRoomWithPassword, renderLoading, renderMatches, renderModalMatches, renderWaitingForOthers
} from "./render.js";
import {getSpiderActivity} from "../util/spiderActivity.js";
import {getPageMatch} from "./api/match.js";
import {joinRoom} from "./api/room.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const overlay = $("#overlay");
const activityBtn = $("#activity-btn");
const activityList = $(".activity-list");
const topUsers = [];

let ws;
let activePageMatches = 0;

function initializeWebsocket() {
    getSpiderActivity().then(data => {
        const ipAddress = data.result;
        ws = new WebSocket(`ws://${ipAddress}:8080/chess/websocket`);
        ws.onopen = function () {
            console.log("Websocket is now opened!");
            const dataSend = {
                type: "ENTER_LOBBY",
                username: sessionStorage.getItem("USERNAME")
            }
            ws.send(JSON.stringify(dataSend));
        }
        ws.onmessage = function (event) {
            const data = JSON.parse(event.data);
            switch (data.type) {
                case "RESPONSE_ENTER_LOBBY":
                    const roomList = data.rooms;
                    if (roomList && roomList.length !== 0) {
                        for (const room of roomList)
                            addRoom(room);
                    }
                    break;
                case "CREATE_ROOM":
                    addRoom(data);
                    break;
                case "JOIN_ROOM_AS_PLAYER":
                    updateRoomUI(data);
                    break;
                case "JOIN_ROOM_AS_VIEWER":
                    updateRoomUI(data);
                    break;
                case "RESPONSE_CREATE_ROOM":
                    sessionStorage.setItem("ROOM_ID", data.id);
                    addRoom(data);
                    window.location.href = "../public/playonl";
                    break;
                case "RESPONSE_JOIN_ROOM_AS_PLAYER":
                    sessionStorage.setItem("ROOM_ID", data.id);
                    joinRoom(data.id, "PLAYER", "").then();
                    updateRoomUI(data);
                    window.location.href = "../public/playonl";
                    break;
                case "DELETE_ROOM":
                    deleteRoom(data.roomId);
                    break;
                case "USER_LEAVE_ROOM":
                    updateLeaveRoomUI(data);
                    break;
                case "RESPONSE_VALID_ROOM":
                    joinRoomAsPlayer_Auto(data);
                    break;
            }
        }
    });
}

function addEventForEye() {
    const iconEyes = $$(".password-container i");
    iconEyes.forEach(icon => {
        icon.onclick = () => {
            const pwContainer = icon.closest(".password-container");
            if (pwContainer && pwContainer.classList.contains("active")) {
                pwContainer.classList.remove("active");
                pwContainer.querySelector("input").type = "password";
            } else if (pwContainer) {
                pwContainer.classList.add("active");
                pwContainer.querySelector("input").type = "text";
            }
        }
    });
}

function addTopUser(user, rank) {
    const div = document.createElement("div");
    div.classList.add("player");
    div.innerHTML = renderTopUser(user, rank);
    $(".leader-container").appendChild(div);
}

window.addEventListener("load", () => {
    fetch("/chess/api/users/top", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`
        }
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
    }).then(data => {
        data.result.forEach((user, index) => {
            addTopUser(user, index + 1);
            topUsers.push(user);
        });
        $$(".player").forEach((player, index) => {
            player.onclick = () => turnOnModal(renderPersonalInformation, topUsers[index]);
        });
    });
    initializeWebsocket();
});

function turnOnModal(renderFunction, attr) {
    overlay.style.zIndex = "100";
    overlay.innerHTML = renderFunction(attr);

    const backBtn = $("#back");
    if (backBtn) {
        backBtn.onclick =  function () {
            turnOffModal();
        };
    }
}

function turnOffModal() {
    overlay.innerHTML = "";
    overlay.style.zIndex = "-10";
}

let confirmResolve;
function confirm(message) {
    turnOnModal(renderConfirm, message);

    $("#yes").addEventListener("click", function () {
        resolveConfirm(true);
    });

    $("#no").addEventListener("click", function () {
        resolveConfirm(false);
    });

    $("#back").onclick =  function () {
        resolveConfirm(false);
    };

    return new Promise(resolve => {
        confirmResolve = resolve;
    });
}

function resolveConfirm(isConfirmed) {
    overlay.innerHTML = "";
    turnOffModal();
    confirmResolve(isConfirmed);
}

document.addEventListener("click", event => {
    if (!activityBtn.contains(event.target)) {
        if (activityList.classList.contains("active")) {
            activityList.classList.remove("active");
        }
    }
});

$$(".logout").forEach(btn => {
    btn.addEventListener("click", async event => {
        event.preventDefault();
        let result = await confirm("Bạn có chắc chắn không?");
        if (result) {
            fetch("/chess/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({token: localStorage.getItem("TOKEN")})
            }).then(response => response.ok).then(data => {
                if (data) {
                    location.reload();
                }
            });
        }
    });
});

activityBtn.addEventListener("click", () => {
    if (activityList.classList.contains("active")) {
        activityList.classList.remove("active");
    } else {
        activityList.classList.add("active");
    }
});

$("#see-my-information").addEventListener("click", event => {
    event.preventDefault();
    fetch("/chess/api/users/myInfo", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("TOKEN")
        }
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
    }).then(data => {
        const user = data.result;
        turnOnModal(renderPersonalInformation, user);

        $(".matches-history").onclick = () => {
            turnOffModal();
            turnOnModal(renderLoading);
            getPageMatch(activePageMatches).then(matches => {
                turnOffModal();
                const attrs = {};
                attrs.matches = matches;
                attrs.size = user.battleNumber;
                turnOnModal(renderModalMatches, attrs);
                handleMatchClick();
                const pages = $$(".page");
                pages.forEach((page, index) => {
                    if (index === activePageMatches) {
                        page.classList.add("active");
                    }

                    page.onclick = () => {
                        if (index === activePageMatches) return;
                        getPageMatch(index).then(matches => {
                            pages[activePageMatches].classList.remove("active");
                            activePageMatches = index;
                            pages[activePageMatches].classList.add("active");
                            const matchesContainer = $(".matches-container");
                            matchesContainer.innerHTML = renderMatches(matches);
                            handleMatchClick();
                        });
                    }
                })
            });
        }
    });
});

function handleMatchClick() {
    $$(".match").forEach(match => {
        match.onclick = () => {
            const matchId = match.getAttribute("data-id");
            turnOffModal();
            sessionStorage.setItem("MATCH_ID", matchId);
            window.location.href = "/chess/public/review";
        }
    });
}

$("#change-avatar-btn").addEventListener("click", event => {
    event.preventDefault();
    const user = localStorage.getItem("USER");
    turnOnModal(renderUpdateAvatar, avatar);

    const errorMessage = $(".error-message");
    $("#avatarInput").onchange = event => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                $("#img-update").src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    };

    $("#accept-update-avatar").onclick =  () => {
        const file = $("#avatarInput").files[0];
        const formData = new FormData();
        formData.append("file", file);
        if (file) {
            turnOffModal();
            turnOnModal(renderLoading);
            fetch("/chess/api/avatar", {
                method: "POST",
                headers: {
                   Authorization: `Bearer ${localStorage.getItem("TOKEN")}`
                },
                body: formData
            }).then(response => {
                if (response.ok) {
                    return response.json();
                }
            }).then(data => {
                if (data) {
                    turnOffModal();
                    avatar = data.result;
                    $(".header__avatar").style.background = `url("${avatar}") no-repeat center center / cover`;
                }
            });
        } else {
            errorMessage.textContent = "Vui lòng chọn ảnh";
        }
    };
});

$("#change-password-btn").onclick = event => {
    event.preventDefault();
    turnOnModal(renderChangePassword);
    addEventForEye();
    const oldPassword = $("#oldPassword");
    const newPassword = $("#newPassword");
    const preNewPassword = $("#preNewPassword");
    const error = $(".error-message");

    $("#confirm-change-password").onclick = () => {
        const old = oldPassword.value;
        const newValue = newPassword.value;
        const pre = preNewPassword.value;

        if (!old || !newValue || !pre) {
            error.innerText = "Điền đầy đủ thông tin!";
        } else if (newValue !== pre) {
            error.innerText = "Mật khẩu nhập lại không chính xác!";
        } else {
            fetch("../api/auth/changePassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("TOKEN")
                },
                body: JSON.stringify({ oldPassword, newPassword })
            }).then(response => {
                return response.ok;
            }).then(result => {
                if (result)
                    turnOffModal();
            }).catch(() => errorMessage.innerText = "Mật khẩu cũ không chính xác");
        }
    }

    $("#cancel").onclick = () => turnOffModal();
}

$("#play-with-bot").onclick = () => {
    fetch("../api/matches/bot", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("TOKEN")}`
        },
        redirect: "follow"
    }).then(response => {
        if (!response.ok) {
            throw new Error("Something is wrong!");
        }
        return response.json();
    })
    .then(data => {
        localStorage.setItem("MATCH_ID", data.result.id);
        window.location.href = "../public/play-with-bot";
    })
    .catch(error => {
        alert(error.message);
    });
}

$("#find-room-btn").onclick = () => {
    turnOnModal(renderFindRoom);
    addEventForEye();
    $("#cancel").onclick = () => turnOffModal();
    $("#confirm-enter-room-player").onclick = () => {
        const idRoom = $("#idRoom").value;
        const passwordRoom = $("#roomPassword").value;
        findRoom(idRoom, passwordRoom, true);
    };
    $("#confirm-enter-room-viewer").onclick = () => {
        const idRoom = $("#idRoom").value;
        const passwordRoom = $("#roomPassword").value;
        findRoom(idRoom, passwordRoom, false);
    }
}

function findRoom(idRoom, passwordRoom, isPlayer) {
    const errorMessage = $(".error-message");
    const role = isPlayer ? "PLAYER" : "VIEWER";
    const password = passwordRoom;
    fetch("../api/rooms/joinRoom/" + idRoom, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("TOKEN")
        },
        body: JSON.stringify({role, password})
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
    }).then(data => data.result)
        .then(room => {
            sessionStorage.setItem("ROOM_ID", room.id);
            if (role === "PLAYER")
                joinRoomAsPlayer(room);
            else
                joinRoomAsViewer(room);
        }).catch( () => {
            if (role === "PLAYER")
                errorMessage.innerText = "Phòng đã có đủ người chơi hoặc sai mật khẩu!";
            else errorMessage.innerText = "Mật khẩu không chính xác!";
    })
}

$("#create-room").onclick = () => {
    turnOnModal(renderCreateRoom);
    addEventForEye();
    let timeActive = 0;

    $("#cancel").onclick = () => turnOffModal();

    const times = $$(".time");
    times.forEach((time, index) => {
        time.onclick = () => {
            if (index === timeActive) return;
            times[timeActive].classList.remove("active");
            timeActive = index;
            times[timeActive].classList.add("active");
        }
    });

    $("#confirm-create-room").onclick = () => {
        const time = times[timeActive].getAttribute("data-value");
        const password = $("#roomPassword").value.trim();
        const data = {time, password};
        fetch("../api/rooms", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("TOKEN")
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.ok)
                return response.json();
            else
                throw new Error("Network response was not ok " + response.statusText);
        }).then(data => {
            const roomCreateData = data.result;
            const infoToBroadcast = {
                type: "CREATE_ROOM",
                id: roomCreateData.id,
                time: roomCreateData.time,
                host: sessionStorage.getItem("USERNAME"),
                people: 1,
                hasPassword: password.length !== 0
            };
            sessionStorage.setItem("ROOM_ID", roomCreateData.id);
            ws.send(JSON.stringify(infoToBroadcast));
            window.location.href = "../public/playonl";
        }).catch((error) => {
            console.log("An error has been detected: " + error);
        })
    }
}

$("#play-random").onclick = () => {
    turnOnModal(renderWaitingForOthers);
    const dataToSend = {
        type: "REQUEST_PLAY_RANDOM",
        username: sessionStorage.getItem("USERNAME")
    };
    ws.send(JSON.stringify(dataToSend));
}

function addRoom(room) {
    const tr = document.createElement("tr");
    tr.classList.add("room");
    tr.setAttribute("data-id", room.id);
    tr.style.backgroundColor = "#3a3a3a";
    tr.innerHTML = renderRoom(room);
    $(".rooms-list").appendChild(tr);

    tr.querySelector("#join-a-room-as-player").onclick = async () => {
        enterPassword(room);
    }

    tr.querySelector("#join-a-room-as-viewer").onclick = () => {
        enterPassword(room, false);
    }
}

function deleteRoom(roomId) {
    const rooms = $$(".room");
    for (let i = 0; i < rooms.length; i++) {
        if (rooms[i].getAttribute("data-id") === String(roomId)) {
            $(".rooms-list").removeChild(rooms[i]);
            break;
        }
    }
}

function enterPassword(room, isPlayer = true) {
    turnOnModal(renderEnterRoomWithPassword);
    addEventForEye();
    const role = isPlayer ? "PLAYER" : "VIEWER";
    $("#idRoom").value = room.id;
    const errorMessage = $(".error-message");
    $("#cancel").onclick = () => turnOffModal();

    $("#enter-room").onclick = () => {
        const password = $("#roomPassword").value;
        joinRoom(room.id, role, password).then(room => {
            sessionStorage.setItem("ROOM_ID", room.id);
            if (role === "PLAYER")
                joinRoomAsPlayer(room);
            else
                joinRoomAsViewer(room);
        }).catch( () => {
            if (role === "PLAYER")
                errorMessage.innerText = "Phòng đã có đủ người chơi hoặc sai mật khẩu!";
            else errorMessage.innerText = "Mật khẩu không chính xác!";
        })
    }
}

// TODO: add event when load this jsp load room active to add room and use addRoom to add a room
// NOTE: get all active rooms when load/reload page
function loadAllRooms() {
    fetch("../api/rooms/active", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("TOKEN")
        }
    }).then(response => {
        if (response.ok)
            return response.json();
        else
            throw new Error("Network response was not ok " + response.statusText);
    }).then(data => {
        const roomList = data.result;
        for (let i = 0; i < roomList.length; i++) {
            const room = roomList[i];
            let people = 0;
            if (room.host != null) people++;
            if (room.player != null) people++;
            if (room.viewers != null) people += room.viewers.length;
            const roomData = {
                id: room.id,
                time: room.time,
                people: people
            };
            addRoom(roomData);
        }
    })
}

function joinRoomAsPlayer(room) {
    const dataToBroadcast = {
        type: "JOIN_ROOM_AS_PLAYER",
        roomId: room.id,
        username: sessionStorage.getItem("USERNAME")
    };
    ws.send(JSON.stringify(dataToBroadcast));
    window.location.href = "../public/playonl";
}

function joinRoomAsPlayer_Auto(room) {
    const dataToBroadcast = {
        type: "JOIN_ROOM_AS_PLAYER",
        roomId: room.id,
        username: sessionStorage.getItem("USERNAME")
    };
    ws.send(JSON.stringify(dataToBroadcast));
    sessionStorage.setItem("ROOM_ID", room.id);
    window.location.href = "../public/playonl";
}

function joinRoomAsViewer(room) {
    const dataToBroadcast = {
        type: "JOIN_ROOM_AS_VIEWER",
        roomId: room.id,
        username: sessionStorage.getItem("USERNAME")
    };
    ws.send(JSON.stringify(dataToBroadcast));
    window.location.href = "../public/playonl";
}

function updateRoomUI(room) {
    const roomRow = document.querySelector(`[data-id='${room.roomId}']`);
    if (roomRow) {
        let peopleElement = roomRow.querySelector(".room-people");
        let currentPeople = parseInt(peopleElement.textContent);
        peopleElement.textContent = (currentPeople + 1) + "";
    }
}

function updateLeaveRoomUI(room) {
    const roomRow = document.querySelector(`[data-id='${room.roomId}']`);
    if (roomRow) {
        let peopleElement = roomRow.querySelector(".room-people");
        let currentPeople = parseInt(peopleElement.textContent);
        peopleElement.textContent = (currentPeople - 1) + "";
    }
}