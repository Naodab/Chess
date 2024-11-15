<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tạo phòng chơi mới</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/new-room.css">
</head>
<body>
<div class="container">
    <h1>Tạo phòng chơi mới</h1>
    <div class="form-group">
        <label for="roomCode">Nhập mật khẩu: </label>
        <input type="text" id="roomCode" placeholder="Nhập mật khẩu phòng chơi...">
    </div>
    <div class="button-group">
        <button class="btn create" id="create" onclick="onCreateFunc()">Tạo phòng chơi</button>
        <button class="btn exit" id="exit" onclick="onClickFunc()">Thoát</button>
    </div>
</div>
<script src="${pageContext.request.contextPath}/assets/js/otherJS/new-room.js"></script>
</body>
</html>
