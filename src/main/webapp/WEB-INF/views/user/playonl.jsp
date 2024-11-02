<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
    <title>Chess.com</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="../assets/css/playonline.css">
    <style>
    body{
    background-image: url('../assets/img/background.jpg');
}
    </style>

</head>

<body>
    <div id="overlay"></div>
    <div class="body_profile" id="body_profile">
        <div class="main_profile">
            <div class="container_profile">
                <div class="header_profile">
                    Thông tin người chơi
                </div>
                <div class="close-btn_profile" id="close-btn_profile">
                    <i id="close-btn_profile" class="fas fa-times">
                    </i>
                </div>
                <div class="profile">
                    <img alt="Profile picture" height="50"
                        src="https://storage.googleapis.com/a1aa/image/cmHOokL2Ip6bLVL9xC0SbkER4keWfN73RCj6BOzleFGImoYnA.jpg"
                        width="50" />
                    <div class="profile-info">
                        <div class="name">
                            Nhất đăng kỳ thủ
                        </div>
                        <div class="gender">
                            ♂ Binh
                        </div>
                        <div class="coins">
                            14,630
                            <i class="fas fa-coins">
                            </i>
                            0
                            <i class="fas fa-star">
                            </i>
                        </div>
                    </div>
                </div>
                <div class="stats">
                    <div class="progress-bar">
                        <div class="progress">
                        </div>
                    </div>
                    <div class="trophy">
                        <div>
                            967
                            <i class="fas fa-shield-alt">
                            </i>
                        </div>
                        <div>
                            5
                            <i class="fas fa-trophy">
                            </i>
                        </div>
                    </div>
                </div>
                <div class="results">
                    <div>
                        2
                        <br />
                        Thắng
                    </div>
                    <div>
                        0
                        <br />
                        Hòa
                    </div>
                    <div>
                        5
                        <br />
                        Thua
                    </div>
                </div>
                <div class="achievements">
                    <img alt="Achievement 1" height="40"
                        src="https://storage.googleapis.com/a1aa/image/YY6isBTFXbLUPNNlUUb8AnP0vZRJeo1J7BOpJb4TZPXhJK2JA.jpg"
                        width="40" />
                    <img alt="Achievement 2" height="40"
                        src="https://storage.googleapis.com/a1aa/image/GkqVj2F8kwZ0CNVhOU0jXokF2GE0lPUw1nkRq8fWULyiJK2JA.jpg"
                        width="40" />
                </div>
                <div class="buttons">
                    <button>
                        Cập nhật
                    </button>
                    <button>
                        Ván đấu
                    </button>
                </div>
            </div>
        </div>
    </div>















    <div class="container">
        <div class="sidebar">
            <img alt="Chess.com logo" src="../assets/img/icon.jpg" width="150" height="100" />
            <a href="playonline.html"><i class="fas fa-chess"></i> Play Online</a>
            <a href="playonline.html"><i class="fas fa-puzzle-piece"></i> Play Computer</a>

            <!-- <div class="search">
                <input type="text" placeholder="Search" />
            </div> -->
            <button id="form-signup" class="button signup">Sign Up</button>
            <button id="form-login" class="button login">Log In</button>
            <a class="settings-link" href="profile.html"><i class="fas fa-cog"></i>Cài đặt</a>


        </div>
        <div class="main-content">
            <div class="player-info">
                <div class="player">
                    <img src="https://www.chess.com/bundles/web/images/user-image.3920d4c5.svg" alt="Player 1">
                    <div class="name" id="name">Player 1</div>
                </div>
            </div>
            <div class="chess-board">
                <img src="https://www.chess.com/bundles/web/images/board.2d7c7b0b.svg" alt="Chess board">
            </div>
            <div class="player-info">
                <div class="player">
                    <img src="https://www.chess.com/bundles/web/images/user-image.3920d4c5.svg" alt="Player 2">
                    <div class="name" id="name1">Player 2</div>
                </div>
            </div>
        </div>
        <div class="bot-info">
            <div class="container9">
                <div>
                    <div class="header9">
                        <div>
                            <i class="fas fa-clock"></i>
                            <span>Chơi</span>
                        </div>
                        <div>
                            <i class="fas fa-plus"></i>
                            <span>Ván cờ mới</span>
                        </div>
                        <div>
                            <i class="fas fa-chess-board"></i>
                            <span>Các ván đấu</span>
                        </div>
                        <div>
                            <i class="fas fa-user-friends"></i>
                            <span>Các kỳ thủ</span>
                        </div>
                    </div>



                    <div class="moves9">
                        <table>
                            <tr>
                                <th>Bird's Opening</th>
                            </tr>
                            <tr>
                                <td>1.</td>
                                <td>f4</td>
                                <td><i class="fas fa-chess-knight"></i> c6</td>
                                <td>47.2</td>
                            </tr>
                            <tr>
                                <td>2.</td>
                                <td>g4</td>
                                <td>d5</td>
                                <td>4.3</td>
                            </tr>
                            <tr>
                                <td>3.</td>
                                <td><i class="fas fa-chess-knight"></i> a3</td>
                                <td><i class="fas fa-chess-bishop"></i> xg4</td>
                                <td>6.0</td>
                            </tr>
                            <tr>
                                <td>3.</td>
                                <td><i class="fas fa-chess-knight"></i> a3</td>
                                <td><i class="fas fa-chess-bishop"></i> xg4</td>
                                <td>6.0</td>
                            </tr>
                        </table>
                    </div>
                    <div class="footer9">
                        <div>
                            <i class="fas fa-flag"></i>
                            <span>Hòa cờ</span>
                        </div>
                        <div>
                            <i class="fas fa-flag-checkered"></i>
                            <span>Chấp nhận thua</span>
                        </div>
                        <div class="actions9">
                            <i class="fas fa-step-backward"></i>
                            <i class="fas fa-chevron-left"></i>
                            <i class="fas fa-chevron-right"></i>
                            <i class="fas fa-step-forward"></i>
                            <i class="fas fa-sync-alt"></i>
                        </div>
                    </div>
                    <div class="new-game9">
                        <span>VÁN CỜ MỚI</span>
                        <span>12binhbinh gặp danielthemonkeyidk (10 phút)</span>
                        <i class="fas fa-user"></i>
                        <i class="fas fa-info-circle"></i>
                    </div>
                </div>
                <div class="chat9">
                    <div class="messages9_container">
                        <div class="message9">
                            <span>12binhbinh:</span> Xin chào!
                        </div>
                        <div class="message9">
                            <span>danielthemonkeyidk:</span> Chào bạn!
                        </div>
                        <div class="message9">
                            <span>danielthemonkeyidk:</span> Chào bạn!
                        </div>
                        <div class="message9">
                            <span>danielthemonkeyidk:</span> Chào bạn!
                        </div>
                        <div class="message9">
                            <span>danielthemonkeyidk:</span> Chào bạn!
                        </div>
                        <div class="message9">
                            <span>danielthemonkeyidk:</span> Chào bạn!
                        </div>
                        <div class="message9">
                            <span>danielthemonkeyidk:</span> Chào bạn!
                        </div>
                        <div class="message9">
                            <span>danielthemonkeyidk:</span> Chào bạn!
                        </div>
                        <div class="message9">
                            <span>danielthemonkeyidk:</span> Chào bạn!
                        </div>
                        <div class="message9">
                            <span>danielthemonkeyidk:</span> Chào bạn!
                        </div>
                        <div class="message9">
                            <span>danielthemonkeyidk:</span> Chào bạn!
                        </div>
                        <div class="message9">
                            <span>danielthemonkeyidk:</span> Chào bạn!
                        </div>
                        <div class="message9">
                            <span>danielthemonkeyidk:</span> Chào bạn!
                        </div>
                        <div class="message9">
                            <span>danielthemonkeyidk:</span> Chào bạn!
                        </div>
                        <div class="message9">
                            <span>danielthemonkeyidk:</span> Chào bạn!
                        </div>
                        <div class="message9">
                            <span>danielthemonkeyidk:</span> Chào bạn!
                        </div>
                    </div>
                    <div style="display: flex;">
                        <input type="text" placeholder="Nhập tin nhắn...">
                        <button>Gửi</button>
                    </div>
                    <div class="chat-status9">
                        <span>Đã tắt chat</span>
                    </div>
                </div>

            </div>

        </div>
   
    </div>
    </div>
      <script type="module" src="../assets/js/layout/playonline.js"></script>
</body>

</html>