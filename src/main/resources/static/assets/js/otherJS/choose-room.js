function onClickFunc() {
	alert("Bạn đã nhấn chọn phòng chơi mới!");
	window.location.href = "../public/play-with-people/new-room";
}

function onExitFunc() {
	alert("Bạn đã nhấn thoát, cảm ơn bạn đã tham gia chơi!");
	window.location.href = "../public/login";
}

function joinRoom() {
	alert("Bạn đang chuẩn bị vào phòng chơi mới!");
}

function loadRoom() {
	alert("Danh sách các phòng chơi đang được load lên!");
	fetch("../api/rooms", {
		//method: 
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
				fetch('../api/rooms/${roomID}')
					.then(response => {
						if (!response.ok) throw new Error("Không tìm thấy được phòng");
						return response.json();
					})
					.then(roomData => {
						const res = roomData.result;
						
						const row = document.createElement("tr");
						
						const cell_roomID = document.createElement("td");
						cell_roomID.textContent = res.id;
						row.appendChild(cell_roomID);
						
						const cell_host = document.createElement("td");
						cell_host.textContent = res.host;
						row.appendChild(cell_host);
						
						const cell_player = document.createElement("td");
						cell_player.textContent = res.player;
						row.appendChild(cell_player);
						
						const cell_numberOfViewer = document.createElement("td");
						cell_numberOfViewer.textContent = res.viewers ? res.viewer.length : 0;
						row.appendChild(cell_numberOfViewer);
						
						const cell_action = document.createElement("td");
						const joinButton = document.createElement("button");
						joinButton.textContent = "Vào game";
						cell_action.appendChild(joinButton);
						row.appendChild(cell_action);
						
						tableBody.appendChild(row);
					})
			})
		}).catch(error => {
			console.error("Lỗi khi truyền tải dữ liệu!", error);
		})
}

document.addEventListener('DOMContentLoaded', () => {
	loadRoom();
});
