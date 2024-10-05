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
<title>Sign Up</title>
</head>
<body>
	<div class="background"></div>
	<div class="overlay"></div>
	<div class="login-container">
		<form action="" method="POST" class="form" id="form-1">
			<a href="#" class="login-logo" title="Chess.com"> Đăng ký </a>
			<div id="message"></div>
			<div class="form-group">
				<input id="email" name="email" type="text" placeholder="Email"
					class="form-control"> <span class="form-message"></span>
			</div>
			<div class="form-group">
				<input id="name" name="name" type="text" placeholder="Tên"
					class="form-control"> <span class="form-message"></span>
			</div>
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
			<div class="form-group">
				<input id="dob" name="dob" type="date" class="form-control">
				<span class="form-message"></span>
			</div>
			<div
				style="display: flex; justify-content: flex-end; align-items: center;">
				<a href="/chess/public/forgot" id="forgot"> Forgot Password? </a>
			</div>
			<button id="form-submit" class="form-submit" type="submit">
				Đăng ký</button>
		</form>
	</div>
	<script type="text/javascript">
		
	</script>
</body>
</html>