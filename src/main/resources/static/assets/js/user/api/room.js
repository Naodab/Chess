function getRoom(roomId) {
    return fetch("/chess/api/rooms/" + roomId, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("TOKEN")
        }
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
    }).then(data => data.result);
}

export {
    getRoom
}