import { renderPersonalInformation,
    renderUpdateAvatar,
    renderConfirm,
    renderChangePassword
} from "./render.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const overlay = $("#overlay");
const activityBtn = $("#activity-btn");
const activityList = $(".activity-list");

function turnOnModal(renderFunction, attr) {
    overlay.style.zIndex = "100";
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
    const user = localStorage.getItem("USER");
    turnOnModal(renderPersonalInformation, user);
});

$("#change-avatar-btn").addEventListener("click", event => {
    event.preventDefault();
    const user = localStorage.getItem("USER");
    turnOnModal(renderUpdateAvatar, "");

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
                return response.ok;
            }).then(data => {
                if (data) {
                    turnOffModal();
                }
            })
        }
    };
});

$("#change-password-btn").onclick = event => {
    event.preventDefault();
    turnOnModal(renderChangePassword);
    const oldPassword = $("#oldPassword");
    const newPassword = $("#newPassword");
    const preNewPassword = $("#preNewPassword");
    const error = $(".error-message");

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