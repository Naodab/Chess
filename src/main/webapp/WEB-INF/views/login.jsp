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
	<form id="loginForm">
		<div class="form-group">
			<label for="input-1">Username:</label> <input id="username"
				placeholder="username" name="username" type="text" />
		</div>
		<div class="form-group">
			<label for="input-2">Password:</label> <input id="password"
				placeholder="password" name="password" type="text" />
		</div>
		<input type="submit" value="Submit" id="button-1" />
	</form>
	<div id="message"></div>
	<script>
	document.getElementById('loginForm').addEventListener('submit', function(event) {
	    event.preventDefault();
	    
	    var username = document.getElementById('username').value;
	    var password = document.getElementById('password').value;

	    fetch('/chess/auth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(response => {
            if (!response.ok) {	
            	if (response.status === 401) {
                    throw new Error('Unauthorized: Invalid username or password');
                } else {
                    throw new Error('An error occurred: ' + response.statusText);
                }
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem("TOKEN", data.result.token);
            window.location.href="/chess/public/home";
        })
        .catch(error => {
            document.getElementById('message').innerText = 'Error: ' + error.message;
        });
    });
	</script>
</body>
</html>