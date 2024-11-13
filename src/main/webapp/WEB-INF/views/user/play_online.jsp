<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
    <link rel="stylesheet" href="../assets/css/user/base.css">
    <link rel="stylesheet" href="../assets/css/chess.css">
    <link rel="stylesheet" href="../assets/css/play_online.css">
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
                <button class="btn btn--pink logout">Đăng xuất</button>
            </div>
            <a class="settings-link" href=""><i class="fas fa-cog"></i>Cài đặt</a>
        </div>

        <div class="play-area">
            <div class="player-info-container">
                <div class="player-info">
                    <div class="avatar" style="background: url('${"avatar"}')
                    no-repeat center center / cover;">
                    </div>
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
                    <div class="avatar" style="background: url('../assets/img/robot.png')
                    no-repeat center center / cover;">
                    </div>
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

        <div class="right-panel">
            <div class="closure right-item chat-function">
                <div class="right-item__header">
                    <i class="fa-solid fa-comments header-img"></i>
                    <div class="right-item__title">Tin nhắn</div>
                </div>
                <div class="chats">
                    <div class="chat-container scrollable-element">
                        <div class="chat-list">
                            <div class="message other">
                                <div class="message__avatar"
                                     style="background: url('../assets/img/robot.png') no-repeat center center / cover">
                                </div>
                                <div class="chat closure">
                                    ba doan nay dep trai qua di ba doan nay dep trai qua di ba doan nay dep trai qua di
                                </div>
                                <div class="chat-username">
                                    badoan
                                </div>
                            </div>
                            <div class="message">
                                <div class="message__avatar"
                                     style="background: url('../assets/img/robot.png') no-repeat center center / cover">
                                </div>
                                <div class="chat closure">
                                    ta cung thay day
                                </div>
                                <div class="chat-username">
                                    badoan
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="chat-input">
                        <input type="text" id="send-chat-input" placeholder="Nhập tin nhắn" >
                        <i class="fa-solid fa-paper-plane send-icon" id="send-message"></i>
                    </div>
                </div>
            </div>
            <div class="closure steps-container right-item">
                <div class="right-item__header">
                    <i class="fa-solid fa-arrow-right-arrow-left header-img"></i>
                    <div class="right-item__title">Nước đi</div>
                </div>
                <div class="steps scrollable-element-x">
                    <div class="steps-table">
                        <div class="step-item">
                            <div class="step-index">avatar</div>
                            <div class="step-container">
                                <div class="step-avatar" style="background: url('${"avatar"}')
                                    no-repeat center center / cover;"></div>
                            </div>
                            <div class="step-container">
                                <div class="step-avatar" style="background: url('../assets/img/robot.png')
                                    no-repeat center center / cover;"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="step__footer">
                    <div class="btn btn--blue step__function"><i class="fa-regular fa-flag"></i></div>
                    <div class="btn btn--green step__function"><i class="fa-regular fa-handshake"></i></div>
                    <div class="btn btn--pink step__function"><i class="fa-solid fa-angle-left"></i></div>
                    <div class="btn btn--pink step__function"><i class="fa-solid fa-angle-right"></i></div>
                </div>
            </div>
        </div>
    </div>
    <script>
        const MODE = "PLAY_ONLINE";
    </script>
    <script type="module" src="../assets/js/chessjs/index.js"></script>
</body>
</html>