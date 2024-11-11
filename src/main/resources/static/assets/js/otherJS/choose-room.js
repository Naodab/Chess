function onClickFunc() {
    window.location.href = "../play-with-people/new-room";
}

function onExitFunc() {
    window.location.href = "../login";
}

function joinRoom(roomID) {
    alert("Bạn đang chuẩn bị vào phòng chơi mới! Room ID = " + roomID);
    const token = localStorage.getItem("TOKEN");
    console.log(token);
    const socket = new SockJS('/chess/websocket', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const stompClient = Stomp.over(socket);
    console.log("chuan bi");
    stompClient.connect({
        headers: {
            Authorization: `Bearer ${token}`
        }
        }, (frame) => {
        console.log("aa");
        console.log("Connected: " + frame);
        stompClient.subscribe('/topic/public', (message) => {
            const notification = JSON.parse(message);
            console.log(notification);
            alert(notification); //khúc ni là khúc chuẩn bị cập nhật lại giao diện!
        });
        const massage = "Nguoi dung muon tham gia room: " + roomID;
        stompClient.send('/app/join-room', {}, JSON.stringify(massage));
        alert("Request sent to join room: " + roomID);
        }, (error) => {
        console.error("Error connecting to WebSocket:", error);
        }
    );
}

function loadRoom() {
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
            if (!response.ok) throw new Error("Có chuyện xảy ra rồi!");
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
            console.error("Lỗi khi truyền tải dữ liệu!", error);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    loadRoom();
});
