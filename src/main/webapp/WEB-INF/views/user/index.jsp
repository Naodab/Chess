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
                <div class="player-info alliance-white">
                    <div class="avatar"></div>
                    <span class="content">
                        <span class="name">Computer</span>
                        <span class="elo">200</span>
                    </span>
                </div>
                <div class="player-info alliance-black">
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
                <span class="defeated-pieces alliance-white"></span>
                <span class="defeated-pieces alliance-black"></span>
            </div>
        </div>
        <!-- MAYBE CHAT BOX HERE -->
    </div>
    <script type="module" src="../assets/js/chessjs/index.js"></script>
    <script>
        const gbContainer = document.querySelector(".game-board-container");
        for (let i = 8; i >= 1; i--) {
            const digit = document.createElement('div');
            digit.innerText = i;
            digit.classList.add('game-board-container-digit');
            gbContainer.appendChild(digit);
        }
        const characters = document.createElement('div');
        characters.classList.add('game-board-container-character');
        for (let i = "a".charCodeAt(0); i <= "h".charCodeAt(0); i++) {
            const character = document.createElement('div');
            character.innerText = String.fromCharCode(i);
            character.classList.add('character');
            characters.appendChild(character);
        }
        gbContainer.appendChild(characters);
    </script>
</body>
</html>