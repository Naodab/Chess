function onClickFunc() {
    window.location.href = "../play-with-people/choose-room";
}

function onCreateFunc() {
    const roomPassword = document.getElementById("roomCode").value;
    const token = localStorage.getItem("TOKEN");
    //for showing token, help a lot in testing in postman
    console.log(token);
    const username = localStorage.getItem("USERNAME");
    if (!roomPassword) {
        alert("Hãy nhập một mật khẩu cho phòng chơi của bạn!");
        return;
    }

    fetch(`/chess/api/users/username/${username}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Không thể lấy được hostID từ username!");
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
            const result = data.result;
            console.log("Một phòng chơi mới đã được tạo thành công!" + result.host + " " + result.password);
            alert("Một phòng chơi mới đã được tạo thành công!");
        })
        .catch(error => {
            console.log("Lỗi: " + error);
            alert("Đã xảy ra lỗi trong quá trình tạo phòng!");
        })
}