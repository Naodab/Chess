<%@ page language="java" contentType="text/html; charset=UTF-8"
		 pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Chess</title>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
	<link rel="stylesheet" href="../assets/css/user/base.css">
	<link rel="stylesheet" href="../assets/css/welcome.css">
	
</head>
<body>
	<div id="overlay"></div>
	<div id="background"></div>
	<div id="container">
		<div class="content">
			<div class="title great-vibes-regular">Chess</div>
			<div class="btn-container">
				<button id="btn-signup" class="welcome-btn">Đăng ký</button>
				<button id="btn-login" class="welcome-btn">Đăng nhập</button>
			</div>
		</div>
	</div>
	<script>
		document.getElementById('btn-login').addEventListener('click', function() {
			window.location.href = "./login";
		});
		document.getElementById('btn-signup').addEventListener('click', function() {
			window.location.href = "./signup";
		});
	</script>
</body>
</html>