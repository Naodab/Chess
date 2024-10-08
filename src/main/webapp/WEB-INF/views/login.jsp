<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
	rel="stylesheet" />
<link href="/chess/assets/css/login.css" rel="stylesheet">
<title>Log In</title>
</head>
<body>
	<div class="background"></div>
	<div class="overlay"></div>
	<div class="login-container">
		<form action="" method="POST" class="form" id="form-1">
			<a href="#" style="font-size: 20px;" class="login-logo" title="Chess.com"> Cờ vua </a>
			<div id="message"></div>
			<div class="form-group">
				<input id="username" name="username" type="text"
					placeholder="Tài khoản" class="form-control"> <span
					class="form-message"></span>
			</div>
			<div class="form-group">
				<input id="password" name="password" type="password"
					placeholder="Mật khẩu" class="form-control"> <span
					class="form-message"></span>
			</div>
			<div
				style="display: flex; justify-content: flex-end; align-items: center;">
				<a href="/chess/public/forgot" id="forgot"> Quên mật khẩu? </a>
			</div>
			<button id="form-submit" class="form-submit" type="submit">
				Đăng nhập</button>
		</form>
	</div>
	<script src="/chess/assets/js/validator.js"></script>
	<script>
	Validator({
        form: '#form-1',
        formGroupSelector: ".form-group",
        intputSelector: ".form-control",
        errorSelector: '.form-message',
        rules: [
            Validator.isRequired('#username'),
            Validator.isRequired("#password")
        ],
        onSubmit: data => {
            console.log(data);
        	fetch('/chess/auth/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {	
                	throw new Error('Tài khoản hoặc mật khẩu không đúng');
                }
                return response.json();
            })
            .then(data => {
                localStorage.setItem("TOKEN", data.result.token);
                window.location.href="/chess/public/home";
            })
            .catch(error => {
                document.getElementById('message').innerText = error.message;
            });
        }
    });
	</script>
</body>
</html>