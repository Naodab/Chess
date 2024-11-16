import Validator from "../validator.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

Validator({
    form: '#form-1',
    formGroupSelector: ".form-group",
    errorSelector: '.form-message',
    rules: [
        Validator.isRequired('#username'),
        Validator.isRequired("#password")
    ],
    onSubmit: data => {
        fetch('../api/auth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (!response.ok) {
                throw new Error('Tài khoản hoặc mật khẩu không đúng');
            }
            return response.json();
        }).then(data2 => {
            localStorage.setItem("TOKEN", data2.result.token)
            localStorage.setItem("USERNAME", data.username);
            sessionStorage.setItem("USERNAME", data.username);
            window.location.href = "../public/home";
        }).catch(error => {
            $("#message").innerText = error.message;
        });
    }
});

// TODO: Should verify email before sign up
Validator({
    form: '#form-2',
    formGroupSelector: ".form-group",
    errorSelector: '.form-message',
    rules: [
        Validator.isRequired('#username2'),
        Validator.minLength('#username2', 5),
        Validator.isRequired("#password2"),
        Validator.minLength("#password2", 6),
        Validator.isRequired('#email2'),
        Validator.isEmail('#email2'),
        Validator.isRequired('#confirm-password'),
        Validator.isConfirmed('#confirm-password', () => {
            return $("#password2").value;
        }, "Mật khẩu nhập lại không chính xác")
    ],
    onSubmit: data => {
        fetch('../api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (!response.ok) {
                throw new Error('Username hoặc email đã tồn tại');
            }
            return response.json();
        }).then(() => {
            alert("Đăng ký thành công");
            $(".btn-login").click();
        }).catch(error => {
            $("#message2").innerText = error.message;
        });
    }
});

$(".btn-signup").addEventListener('click', () => {
    $$('.container').forEach(container => container.classList.add('active'));
});

$(".btn-login").addEventListener('click', () => {
    $$('.container').forEach(container => container.classList.remove('active'));
});

$("#forgot").addEventListener('click', () => {
    fetch("../public/forgot");
});