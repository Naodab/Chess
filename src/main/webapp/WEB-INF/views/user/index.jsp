<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="stylesheet" href="../assets/css/chess.css">
<title>Insert title here</title>
</head>
<body>
    <div class="background"></div>
    <div class="overlay"></div>
    <div class="container">
        <nav class="main-nav">
        </nav>
        <div class="play-area">
            <div class="player-info-container">
                <div class="player-info">
                    <div class="avatar"></div>
                    <span class="content">
                        <span class="name">Computer</span>
                        <span class="elo">200</span>
                    </span>
                </div>
                <div class="player-info">
                    <span class="content">
                        <span class="name">Computer</span>
                        <span class="elo">200</span>
                    </span>
                    <div class="avatar"></div>
                </div>
            </div>

            <div class="game-board-container">
                <div id="game-board"></div>
                <div id="prompt-pieces">
                    <div class="rook prompt-piece" name="PAWN"></div>
                    <div class="knight prompt-piece" name="KNIGHT"></div>
                    <div class="bishop prompt-piece" name="BISHOP"></div>
                    <div class="queen prompt-piece" name="QUEEN"></div>
                </div>
            </div>

            <div class="defeated-pieces-container">
                <span class="defeated-pieces"></span>
                <span class="defeated-pieces "></span>
            </div>
        </div>
        <!-- MAYBE CHAT BOX HERE -->
    </div>
    <script type="module" src="../assets/js/chessjs/index.js"></script>
</body>
</html>