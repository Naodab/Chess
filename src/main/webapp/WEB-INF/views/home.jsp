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
	<button id="bot">Play with bot</button>
	<button id="signup">Play with people</button>
	<script type="text/javascript">
		document.getElementById('bot').addEventListener('click', event => {
			event.preventDefault();
			const authorization = "Bearer " + localStorage.getItem('TOKEN');
			const myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");
			myHeaders.append("Authorization", authorization);

			const requestOptions = {
				method: "GET",
				headers: myHeaders,
				redirect: "follow"
			};
			
			fetch("../api/matches/bot", requestOptions)
			.then(response => {
				if (!response.ok) {
					throw new Error("Something is wrong!");
				}
				return response.json();
			})
			.then(data => {
				localStorage.setItem("MATCH_ID", data.result.id);
				window.location.href = "../public/play-with-bot";
				// fetch("../public/save-data", {
				// 	method: "POST",
				// 	headers: {
				// 		"Content-Type": "application/json"
				// 	},
				// 	body: JSON.stringify({ name: "username", data: data.result.player.username }),
				// 	redirect: "follow"
				// })
				// .then(response => {
				// 	if (response.ok) {
				// 		window.location.href = "../public/play-with-bot";
				// 	}}
				// );
			})
			.catch(error => {
				alert(error.message);
			});
		});
		document.getElementById('signup').addEventListener('click', event => {
			event.preventDefault();
			
		});
    </script>
</body>
</html>