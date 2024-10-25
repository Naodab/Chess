function onClickFunc() {
	alert("Bạn đã nhấn chọn phòng chơi mới!");
	//window.location.href = "/new-room.html";
}

function onExitFunc() {
	alert("Bạn đã nhấn thoát, okeee 123!");
	//window.location.href = "/login-chess.html";
}

function joinRoom() {
	/*
	const username = new URLSearchParams(window.location.search).get("username");
	fetch(`/hxh/join-room?roomId=${encodeURIComponent(roomID)}&username=${encodeURIComponent(username)}`, {
		method: "POST",
	}).then (response => response.text())
	.then (message => {
		alert(message);
		if (message.includes("người chơi")) {
			window.location.href = `/enter-game.html?roomID=${encodeURIComponent(roomID)}&username=${encodeURIComponent(username)}&role=player`;
		}
		else if (message.includes("người xem")) {
			window.location.href = `/enter-game.html?roomID=${encodeURIComponent(roomID)}&username=${encodeURIComponent(username)}&role=viewer`;
		}
		loadRoom();
	}).catch(error => {
		console.error("Lỗi khi vào phòng!");
		alert("Có lỗi xảy ra rồi!");
	})
	*/
}

function loadRoom() {
	alert("Load form");
	fetch("/hxh/get-rooms").then(response => response.json()).then(rooms => {
		console.log(rooms.length);
		
		const tableBody = document.querySelector(".table-container table tbody");
		tableBody.innerHTML = "";

		rooms.forEach(room => {
			const row = document.createElement("tr");

			const cell_roomID = document.createElement("td");
			cell_roomID.textContent = room.roomID;
			row.appendChild(cell_roomID);

			const cell_numberOfPlayer = document.createElement("td");
			const playerCount = room.playerList ? room.playerList.length : 0;
			cell_numberOfPlayer.textContent = playerCount;
			row.appendChild(cell_numberOfPlayer);

			const cell_numberOfViewer = document.createElement("td");
			const viewerCount = room.viewerList ? room.viewerList.length : 0;
			cell_numberOfViewer.textContent = viewerCount;
			row.appendChild(cell_numberOfViewer);

			const cell_action = document.createElement("td");
			const joinButton = document.createElement("button");
			joinButton.textContent = "Vào game!";
			joinButton.classList.add("action-button");
			joinButton.addEventListener("click", joinRoom);
			cell_action.appendChild(joinButton);
			row.appendChild(cell_action);

			tableBody.appendChild(row);
		})
	}).catch(error => {
		console.error("Lỗi khi truyền tải dữ liệu!", error);
	})
}

document.addEventListener('DOMContentLoaded', () => {
	//loadRoom();
	alert("Phòng đã được load lên thành công!");
});
