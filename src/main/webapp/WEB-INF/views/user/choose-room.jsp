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
		<table>
			<thead>
				<tr>
					<th>Mã phòng</th>
					<th>Số lượng người chơi</th>
					<th>Số lượng người xem</th>
					<th>Vào phòng</th>
				</tr>
			</thead>
			<tbody>
				<!-- 
				<tr>
                    <td>room1</td>
                    <td>1</td>
                    <td>0</td>
                    <td><button class="action-button">Vào game!</button></td>
                </tr>
                <tr>
                    <td>room2</td>
                    <td>0</td>
                    <td>0</td>
                    <td><button class="action-button">Vào game!</button></td>
                </tr>
                <tr>
                    <td>room3</td>
                    <td>0</td>
                    <td>0</td>
                    <td><button class="action-button">Vào game!</button></td>
                </tr>
                <tr>
                    <td>room4</td>
                    <td>0</td>
                    <td>0</td>
                    <td><button class="action-button">Vào game!</button></td>
                </tr>
                -->
			</tbody>
		</table>
		<button class="action-button" id="create-button"
			onclick="onClickFunc()">Tạo phòng chơi mới</button>
		<button class="action-button" id="exit-button" onclick="onExitFunc()">Thoát</button>
	</div>
	<script src="../assets/js/otherJS/choose-room.js"></script>
</body>
</html>
