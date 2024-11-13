import {
    renderPersonalInformation,
    renderUpdateAvatar,
    renderConfirm,
    renderChangePassword,
    renderCreateRoom,
    renderRoom,
    renderTopUser,
    renderFindRoom
} from "./render.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const overlay = $("#overlay");
const activityBtn = $("#activity-btn");
const activityList = $(".activity-list");
const topUsers = [];

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
    console.log(1)
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
});

function turnOnModal(renderFunction, attr) {
    overlay.style.zIndex = "100";
    console.log(renderFunction(attr));
    overlay.innerHTML = renderFunction(attr);

    $("#back").onclick =  function () {
        turnOffModal();
    };
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

        // TODO: catch event see matches
    });
});

$("#change-avatar-btn").addEventListener("click", event => {
    event.preventDefault();
    const user = localStorage.getItem("USER");
    turnOnModal(renderUpdateAvatar, avatar);

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
        console.log(file);
        const formData = new FormData();
        formData.append("file", file);
        if (file) {
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
            })
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
                    "Authorization": "Bearer " + token
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

    $("#confirm-enter-room").onclick = () => {
        // TODO: find room, code similarly with create room but fetch to find if room active and corrected password
    };
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

    $("$confirm-create-room").onclick = () => {
        const time = times[timeActive].getAttribute("data-value");
        const password = $("#roomPassword").value;
        const data = {time, password};
        // TODO: create room and direct to another jsp to test
    }
}

function addRoom(room) {
    const tr = document.createElement("tr");
    tr.classList.add("room");
    tr.setAttribute("data-id", room.id);
    tr.style.backgroundColor = "#3a3a3a";
    tr.innerHTML = renderRoom(room);
    $(".rooms-list").appendChild(tr);
}

// TODO: add event when load this jsp load room active to add room and use addRoom to add a room