var wsCreateRoom;

function onClickFunc() {
    window.location.href = "../play-with-people/choose-room";
}

function onCreateFunc() {
    const roomPassword = document.getElementById("roomCode").value;

    //for testing with token and username
    const token = localStorage.getItem("TOKEN");
    console.log(token);

    const username = sessionStorage.getItem("USERNAME");
    console.log(username);

    if (!roomPassword) {
        alert("Please enter a password for your new room!");
        return;
    }

    const roomCreateRequest = {
        roomID: Math.floor(Math.random() * 10000),
        password: roomPassword,
        host: username
    }

    wsCreateRoom = new WebSocket("ws://localhost:8080/chess/websocket/createRoom");
    //for testing purpose:
    wsCreateRoom.onopen = function () {
        console.log("Websocket from newroom.js is now open!");
        wsCreateRoom.send(JSON.stringify(roomCreateRequest));
        sessionStorage.setItem("RoomID", roomCreateRequest.roomID + "");
        window.location.href = "../play-with-people/enter-game";
    }
    wsCreateRoom.onerror = function () {
        console.log("Websocket from newrooom.js has error(s)!");
    }

    /*
    fetch(`/chess/api/users/username/${username}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Cannot get hostID from username!");
            }
            return response.json();
        })
        .then(userData => {
            const user = userData.result;

            const hostID = user.id;
            const roomCreateRequest = {
                hostId: hostID,
                password: roomPassword
            }
            return fetch("/chess/api/rooms", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(roomCreateRequest)
            });
        })
        .then (response => response.json())
        .then (data => {
            //for testing purpose
            console.log(data);
            const result = data.result;
            console.log(result);
            alert("A room has just been created successfully!");
            //window.location.href = "../play-with-people/enter-game";
            connectWebSocket();
        })
        .catch(error => {
            console.log("Lỗi: " + error);
            alert("Đã xảy ra lỗi trong quá trình tạo phòng!");
        })
     */
}

/*
function connectWebSocket() {
    const ws = new WebSocket("ws://localhost:8080/chess/websocket/createRoom");
    ws.onopen = function () {
        console.log("websocket cập nhật rooms khi có một room mới được khởi tạo!");
    }
    ws.onmessage = function (event) {
        console.log("chuẩn bị broadcast đi nè");
        const message = JSON.parse(event.data);
        console.log(event);
        console.log(message);

    }
    ws.onerror = function (error ) {
        console.error("websocket có lỗi " + error);
    }
}
*/