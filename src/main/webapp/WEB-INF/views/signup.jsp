<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Todo List</title>
</head>
<body>
	<button id="login">Login</button>
	<button id="signup">Signup</button>
	<script type="text/javascript">
		document.getElementById('login').addEventListener('click', event => {
			event.preventDefault();
			window.location.href="/chess/public/login";
		});
		document.getElementById('signup').addEventListener('click', event => {
			event.preventDefault();
			window.location.href="/chess/public/signup";
		});
    </script>
</body>
</html>