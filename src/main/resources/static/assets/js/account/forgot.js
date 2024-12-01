let step = 1;

const input = document.getElementById("input");
const errorInput = input.closest(".form-group").querySelector(".form-message");

const errorMessage = document.getElementById("message");
const form = document.getElementById("form-1");
const btnSubmit = document.querySelector(".form-submit");
let username = "";

async function  fetchApi(url, method, headers, data, message) {
    errorMessage.innerHTML = "";
    const response = await fetch(url, {
        method,
        headers,
        body: data
    });
    if (response.ok) {
        return response.json();
    }
    errorMessage.innerText = message;
}

function eleFormGroup() {
    return `<input id="prePassword" name="prePassword" type="password"
                placeholder="Nhập lại mật khẩu" class="form-control">
            <span class="form-message"></span>`;
}

btnSubmit.addEventListener("click", event => {
    event.preventDefault();
    if (step === 1) {
        btnSubmit.disabled = true;
        const headers = new Headers();
        headers.set('Content-Type', 'application/json');
        fetchApi("../api/auth/forgot", "POST", headers,
            JSON.stringify({username: input.value}),
            "Tài khoản hoặc email không tồn tại.")
            .then(data => {
                if (data.code === 1000) {
                    username = input.value;
                    input.value = "";
                    input.placeholder = "Nhập OTP";
                    btnSubmit.innerText = "Gửi";
                    step++;
                }
            })
            .catch(err => errorMessage.innerText = err.message);
        btnSubmit.disabled = false;
    } else if (step === 2) {
        btnSubmit.disabled = true;
        const headers = new Headers();
        headers.set('Content-Type', 'application/json');
        fetchApi("../api/auth/verify", "POST", headers,
            JSON.stringify({username, token: input.value}),
            "Mã OTP không hợp lệ.")
            .then(data => {
                if (data.code === 1000) {
                    sessionStorage.setItem('TOKEN', data.result.token);

                    input.value = "";
                    input.type = "password";
                    input.placeholder = "Nhập mật khẩu mới";
                    btnSubmit.innerText = "Xác nhận";

                    const fGroup = document.createElement('div');
                    fGroup.className = 'form-group';
                    fGroup.innerHTML = eleFormGroup();
                    form.insertBefore(fGroup, btnSubmit);
                    step++;
                }
            })
            .catch(err => errorMessage.innerText = err.message);
        btnSubmit.disabled = false;
    } else if (step === 3) {
        const inputCheck = document.getElementById('prePassword');

        const password = input.value;
        if (password.length === 0) {
            errorInput.innerText = "Vui lòng điền mục này";
        } else if (password.length <= 6) {
            errorInput.innerText = "Mật khẩu ít nhất 6 kí tự";
        } else {
            errorInput.innerText = "";
        }

        const prePassword = inputCheck.value;
        const errorPrePassword = inputCheck.closest(".form-group")
            .querySelector(".form-message");
        if (prePassword.length === 0) {
            errorPrePassword.innerText = "Vui lòng điền mục này";
        } else {
            errorPrePassword.innerText = "";
        }

        if (password === prePassword) {
            const headers = new Headers();
            headers.set('Content-Type', 'application/json');
            headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('TOKEN'));
            fetchApi("../api/auth/confirm", "POST", headers,
                JSON.stringify({password}),
                "Không thành công.")
                .then(data => {
                    if (data.code === 1000) {
                        alert("Thay đổi mật khẩu thành công");
                        window.location.href = "./login";
                    }
                })
                .catch(err => errorMessage.innerText = "Không thành công.");
        } else {
            errorMessage.innerText = "Mật khẩu nhập lại không khớp";
        }
    }
});