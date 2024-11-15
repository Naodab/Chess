let wsCreateRoom;
let wsJoinRoom;
let viewerList = [];

function initializeWebSockets() {
    //for creating room
    wsCreateRoom = new WebSocket("ws://localhost:8080/chess/websocket/createRoom");
    wsCreateRoom.onopen = function () {
        console.log("Websocket is ready to create a room from choose-room.js");
    }
    wsCreateRoom.onmessage = function (event) {
        const newRoom = JSON.parse(event.data);
        addRoomToLobby(newRoom);
    }

    //for joining room
    wsJoinRoom = new WebSocket("ws://localhost:8080/chess/websocket/joinRoom")
    wsJoinRoom.onopen = function () {
        console.log("Websocket is ready to join a room from joinRoomRequest");
    }
    wsJoinRoom.onmessage = function (event) {
        const joinRoomRequest = JSON.parse(event.data);
        updateWhenJoiningRoom(joinRoomRequest);
    }
}

function joinRoom(roomData) {
    const roomResult =  JSON.parse(roomData);
    const userRequestJoinRoom = sessionStorage.getItem("USERNAME");

    let coPlayer = null;
    if (roomResult.coPlayer === "Waiting ...") {
        coPlayer = userRequestJoinRoom;
    }

    const viewerCount = roomResult.viewerCount;
    if (viewerCount > 0) {
        viewerList.push(userRequestJoinRoom);
    }

    const joinRoomRequest = {
        roomID: roomResult.roomID,
        host: roomResult.host,
        coPlayer: coPlayer,
        viewerList: viewerList
    };

    wsJoinRoom.send(JSON.stringify(joinRoomRequest));
    sessionStorage.setItem("RoomID", joinRoomRequest.roomID + "");
    window.location.href = "../play-with-people/enter-game";
}

/*
function loadRoom() {
    //for testing in postman
    const token = localStorage.getItem("TOKEN");
    console.log(token);

    fetch("/chess/api/rooms", {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) throw new Error("Oops, having problems here!");
            return response.json();
        })
        .then(data => {
            const rooms = data.result || [];
            console.log("Số phòng được load lên: " + rooms.length);

            const tableBody = document.querySelector(".table-container table tbody");
            tableBody.innerHTML = "";

            rooms.forEach(room => {
                const roomID = room.id;
                console.log(roomID);
                const res = room;

                const row = document.createElement("tr");

                const cell_roomID = document.createElement("td");
                cell_roomID.textContent = res.id;
                row.appendChild(cell_roomID);

                const cell_host = document.createElement("td");
                cell_host.textContent = res.host ? res.host.username : "admin";
                row.appendChild(cell_host);

                const cell_player = document.createElement("td");
                cell_player.textContent = res.player ? res.player.username : "Đang chờ...";
                row.appendChild(cell_player);

                const cell_numberOfViewer = document.createElement("td");
                cell_numberOfViewer.textContent = res.viewers ? res.viewers.length : 0;
                row.appendChild(cell_numberOfViewer);

                const cell_action = document.createElement("td");
                const joinButton = document.createElement("button");
                joinButton.textContent = "Vào game";
                joinButton.addEventListener('click', () => joinRoom(roomID));
                cell_action.appendChild(joinButton);
                row.appendChild(cell_action);

                tableBody.appendChild(row);
            })
        })
        .catch(error => {
            console.error("Error in processing data!", error);
        });
}
*/

function addRoomToLobby(roomCreateRequest) {
    const table = document.getElementById("myTable");
    const newRow = table.insertRow(-1);

    const joinButton = document.createElement("button");
    joinButton.textContent = "Vào game";
    joinButton.addEventListener('click', (event) => {
        const row = event.target.closest("tr");
        const data = {
            roomID : row.cells[0].innerHTML,
            host: row.cells[1].innerHTML,
            coPlayer: row.cells[2].innerHTML,
            viewerCount: row.cells[3].innerHTML
        };
        joinRoom(JSON.stringify(data));
    });

    const idCell = newRow.insertCell(0);
    const hostCell = newRow.insertCell(1);
    const coPlayerCell = newRow.insertCell(2);
    const viewerCountCell = newRow.insertCell(3);
    const enterGameCell = newRow.insertCell(4);

    idCell.innerHTML = roomCreateRequest.roomID;
    hostCell.innerHTML = roomCreateRequest.host;
    coPlayerCell.innerHTML = "Waiting ...";
    viewerCountCell.innerHTML = "0";
    enterGameCell.appendChild(joinButton);
}

function updateWhenJoiningRoom(joinRoomRequest) {
    const table = document.getElementById("myTable");
    const rows = table.rows;
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const currentRoomID = row.cells[0].textContent;
        if (currentRoomID === joinRoomRequest.roomID) {
            row.cells[1].textContent = joinRoomRequest.host;
            row.cells[2].textContent = joinRoomRequest.coPlayer;
            row.cells[3].textContent = joinRoomRequest.viewerList.length;
            break;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initializeWebSockets();
    /*
    loadRoom(); //error using token, fix many times!
     */
});

function onClickFunc() {
    window.location.href = "../play-with-people/new-room";
}

function onExitFunc() {
    window.location.href = "../login";
}