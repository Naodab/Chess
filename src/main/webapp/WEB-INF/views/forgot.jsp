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
<title>Todo List</title>
</head>
<body>
	<div class="background"></div>
	<div class="overlay"></div>
	<div class="login-container">
		<form action="" method="POST" class="form" id="form-1">
			<a href="#" class="login-logo" title="Chess.com"> Chess.com </a>
			<div id="message"></div>
			<div class="form-group">
				<input id="username" name="username" type="text"
					placeholder="Tài khoản hoặc email" class="form-control"> <span
					class="form-message"></span>
			</div>
			<button id="form-submit" class="form-submit" type="submit">
				Nhận Mail</button>
		</form>
	</div>
	<script src="/chess/assets/js/validator.js"></script>
	<script>
	Validator({
        form: '#form-1',
        formGroupSelector: ".form-group",
        errorSelector: '.form-message',
        rules: [
            Validator.isRequired('#username')
        ],
        onSubmit: data => {
            console.log(data);
        	fetch('/chess/auth/forgot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (!response.ok) {	
                	if (response.status === 401) {
                        throw new Error('Email hoặc username không tồn tại');
                    } else {
                        throw new Error('An error occurred: ' + response.statusText);
                    }
                }
                return response.json();
            })
            .then(data => {
                localStorage.setItem("TOKEN", data.result.token);
                window.location.href="/chess/public/confirm";
            })
            .catch(error => {
                document.getElementById('message').innerText = error.message;
            });
        }
    });
	</script>
</body>
</html>