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
<link href="../assets/css/login.css" rel="stylesheet">
<title>Log In</title>
</head>

<body>
	<div class="background"></div>
	<div class="overlay"></div>
	<div class="container login">
		<img class="chess-image" alt="" src="../assets/img/model.jpg" />
		<div class="toggle">
			<div class="form-container">
				<form action="" method="POST" class="form" id="form-1">
					<a href="#" style="font-size: 25px; margin-bottom: 16px"> Đăng
						nhập </a>
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
					<a href="/chess/public/forgot" id="forgot"> Quên mật khẩu? </a>
					<button class="form-submit" type="submit">Đăng nhập</button>
					<div class="btn-signup">Đăng ký</div>
				</form>
			</div>
		</div>
	</div>
	<div class="container signup">
		<div class="form-container-signup">
			<form action="" method="POST" id="form-2">
				<a href="#"
					style="font-size: 25px; margin-bottom: 16px; height: fit-content;">
					Đăng ký </a>
				<div id="message2"></div>
				<div class="form-group">
					<input id="email2" name="email" type="text" placeholder="Email"
						class="form-control"> <span class="form-message"></span>
				</div>
				<div class="form-group">
					<input id="username2" name="username" type="text"
						placeholder="Tài khoản" class="form-control"> <span
						class="form-message"></span>
				</div>
				<div class="form-group">
					<input id="password2" name="password" type="password"
						placeholder="Mật khẩu" class="form-control"> <span
						class="form-message"></span>
				</div>
				<div class="form-group">
					<input id="confirm-password" name="confirm-password"
						type="password" placeholder="Nhập lại mật khẩu"
						class="form-control"> <span class="form-message"></span>
				</div>
				<div class="form-group">
					<input id="dob2" name="dob" type="date" class="form-control">
					<span class="form-message"></span>
				</div>
				<button class="form-submit" type="submit">Đăng ký</button>
				<div class="btn-login">Đăng nhập</div>
			</form>
		</div>
	</div>
	<script src="../assets/js/validator.js"></script>
	<script>
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
				console.log(data);
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
				}).then(data => {
					localStorage.setItem("TOKEN", data.result.token);
					window.location.href = "../public/home";
				}).catch(error => {
					$("#message").innerText = error.message;
				});
			}
		});
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
				}, "Mật khẩu nhập lại không chính xác"),
				Validator.isRequired('#dob2')
			],
			onSubmit: data => {
				console.log(data);
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
					fetch("../public/home");
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
	</script>
</body>

</html>