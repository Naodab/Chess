<%@ page language="java" contentType="text/html; charset=UTF-8"
		 pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/assets/css/choose-room.css">
	<title>Choose room</title>
</head>
<body>
<div class="table-container">
	<table id="myTable">
		<thead>
		<tr>
			<th>Mã phòng</th>
			<th>Chủ phòng</th>
			<th>Người chơi cùng</th>
			<th>Số lượng người xem</th>
			<th>Vào phòng</th>
		</tr>
		</thead>
		<tbody>

		</tbody>
	</table>
	<button class="action-button" id="create-button"
			onclick="onClickFunc()">Tạo phòng chơi mới</button>
	<button class="action-button" id="exit-button" onclick="onExitFunc()">Thoát</button>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.1.4/sockjs.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.min.js"></script>
<script>
	console.log("SockJS loaded:", typeof SockJS !== 'undefined');
	console.log("STOMP loaded:", typeof Stomp !== 'undefined');
</script>
<script src="${pageContext.request.contextPath}/assets/js/otherJS/choose-room.js"></script>
</body>
</html>
