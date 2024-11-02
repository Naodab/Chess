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
<link href="../assets/css/forgot.css" rel="stylesheet">
<title>Chess</title>
</head>
<body>
	<div class="background"></div>
	<div class="overlay"></div>
	<div class="container">
		<div class="form-container">
			<form class="form" id="form-1">
				<a href="#" style="font-size: 25px; margin-bottom: 16px"> Quên
					mật khẩu </a>
				<div id="message"></div>
				<div class="form-group">
					<input id="input" name="username" type="text"
						placeholder="Tài khoản hoặc email" class="form-control">
					<span class="form-message"></span>
				</div>
				<button class="form-submit" type="submit">Nhận code</button>
			</form>
		</div>
	</div>
	<script src="../assets/js/account/forgot.js"></script>
</body>
</html>