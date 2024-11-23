<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
    <link rel="stylesheet" href="../assets/css/user/base.css">
    <link rel="stylesheet" href="../assets/css/chess.css">
    <link rel="stylesheet" href="../assets/css/review.css">
    <title>Chess</title>
</head>
<body>
<div id="background"></div>
<div id="coating"></div>
<div id="overlay"></div>
<div class="container">
    <div class="sidebar closure">
        <div class="sidebar-header">
            <img alt="Chess.com logo" src="../assets/img/icon.jpg" width="150" height="100" />
            <a href="" class="active"><i class="fas fa-chess"></i>Chơi online</a>
            <a href=""><i class="fas fa-puzzle-piece"></i>Chơi với máy</a>
        </div>
        <div class="sidebar-body">
            <button class="btn btn--pink logout" id="exit-room-button">Thoát phòng</button>
        </div>
        <a class="settings-link" href=""><i class="fas fa-cog"></i>Cài đặt</a>
    </div>

    <div class="play-area">
        <div class="player-info-container">
            <div class="player-info">
                <div class="avatar"></div>
                <span class="content">
                        <span class="name"></span>
                        <div class="ele-wrap">
                            <span class="elo"></span>
                        </div>
                    </span>
            </div>
            <div class="player-info">
                <span class="content">
                    <span class="name"></span>
                    <div class="ele-wrap">
                        <span class="elo"></span>
                    </div>
                </span>
                <div class="avatar"></div>
            </div>
        </div>

        <div class="game-board-container">
            <div id="game-board"></div>
        </div>

        <div class="defeated-pieces-container">
            <span class="defeated-pieces"></span>
            <span class="defeated-pieces "></span>
        </div>
    </div>

    <div class="right-panel">
        <div class="closure steps-container right-item">
            <div class="right-item__header">
                <i class="fa-solid fa-arrow-right-arrow-left header-img"></i>
                <div class="right-item__title">Nước đi</div>
            </div>
            <div class="steps scrollable-element-x">
                <div class="steps-table">
                    <div class="step-item">
                        <div class="step-index-review">avatar</div>
                        <div class="step-container">
                            <div class="step-avatar" style="background: url('../assets/img/robot.png')
                                    no-repeat center center / cover;" ></div>
                        </div>
                        <div class="step-container">
                            <div class="step-avatar" style="background: url('../assets/img/robot.png')
                                    no-repeat center center / cover;"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="step__footer">
                <div class="btn btn--pink step__function"   id="return-left"><i class="fa-solid fa-angle-left"></i></div>
                <div class="btn btn--pink step__function"   id="return-right"><i class="fa-solid fa-angle-right"></i></div>
            </div>
        </div>
    </div>
</div>
<script>
    const MODE = "REVIEW";
</script>
<script type="module" src="../assets/js/chessjs/index.js"></script>
<script type="module" src="../assets/js/chessjs/mode/review.js"></script>
</body>
</html>