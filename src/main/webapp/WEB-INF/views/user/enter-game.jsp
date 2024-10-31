<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vào chơi game</title>
    <link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/assets/css/enter-game.css">
</head>
<body>
<div class="container">
    <div class="left-panel">
        <img alt="" src="https://backscattering.de/web-boardimage/board.svg?fen=5r1k/1b4pp/3pB1N1/p2Pq2Q/PpP5/6PK/8/8&lastMove=f4g6&check=h8&arrows=Ge6g8,Bh7&squares=a3,c3">
    </div>

    <div class="right-panel">
        <div class="main-content">
            <!-- main content is displayed here (details information, chats,...) -->
        </div>

        <div class="bottom-bar">
            <input type="text" placeholder="Nhập tin nhắn" class="text-input">
            <button class="submit-btn">Gửi</button>
        </div>
    </div>
</div>
<script src="${pageContext.request.contextPath}/assets/js/otherJS/new-game.js"></script>
</body>
</html>
