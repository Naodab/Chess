function getRoom(roomId) {
    return fetch("/chess/api/rooms/" + roomId, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + sessionStorage.getItem("TOKEN")
        }
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
    }).then(data => data.result);
}

function joinRoom(roomId, role, password) {
    return fetch("../api/rooms/joinRoom/" + roomId, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + sessionStorage.getItem("TOKEN")
        },
        body: JSON.stringify({role, password})
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
    }).then(data => data.result);
}

export {
    getRoom,
    joinRoom
}