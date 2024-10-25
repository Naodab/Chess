<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>

<head>
    <title>Chess.com</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet" />
    <style>
        body {
            background-image: url('../assets/img/background.jpg');
            color: #ffffff;
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            overflow: hidden;
        }

        .container {
            display: flex;
        }

        .sidebar {
            width: 134px;
            /* 200px * 0.67 */
            background-color: rgba(43, 43, 43, 0.1);
            padding: 13.4px;
            /* 20px * 0.67 */
            box-sizing: border-box;
        }

        .sidebar img {
            width: 67px;
            /* 100px * 0.67 */
            margin-bottom: 13.4px;
            /* 20px * 0.67 */
        }

        .sidebar ul {
            list-style: none;
            padding: 0;
        }

        .sidebar ul li {
            margin: 13.4px 0;
            /* 20px * 0.67 */
            display: flex;
            align-items: center;
        }

        .sidebar ul li i {
            margin-right: 6.7px;
            /* 10px * 0.67 */
        }

        .sidebar ul li a {
            color: #fff;
            text-decoration: none;
            font-size: 12px;
            /* 18px * 0.67 */
        }

        .sidebar .search {
            margin-top: 13.4px;
            /* 20px * 0.67 */
        }

        .sidebar .search input {
            width: 100%;
            padding: 6.7px;
            /* 10px * 0.67 */
            border: none;
            border-radius: 3.4px;
            /* 5px * 0.67 */
            box-sizing: border-box;
        }

        .sidebar .auth-buttons {
            margin-top: 13.4px;
            /* 20px * 0.67 */
        }

        .sidebar .auth-buttons button {
            width: 100%;
            padding: 6.7px;
            /* 10px * 0.67 */
            border: none;
            border-radius: 3.4px;
            /* 5px * 0.67 */
            margin-bottom: 6.7px;
            /* 10px * 0.67 */
            font-size: 10.72px;
            /* 16px * 0.67 */
            cursor: pointer;
        }

        .sidebar .auth-buttons .login {
            background-color: #4CAF50;
            color: #fff;
        }

        .sidebar .auth-buttons .signup {
            background-color: #333;
            color: #fff;
        }

        .main-content {
            flex: 1;
            padding: 13.4px;
            /* 20px * 0.67 */
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .chess-board {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }

        .chess-board img {
            width: 402px;
            /* 600px * 0.67 */
            height: 402px;
            /* 600px * 0.67 */
        }

        .player-info {
            display: flex;
            justify-content: space-between;
            width: 268px;
            /* 400px * 0.67 */
            margin-top: 13.4px;
            /* 20px * 0.67 */
        }

        .player {
            display: flex;
            align-items: center;
        }

        .player img {
            width: 33.5px;
            /* 50px * 0.67 */
            height: 33.5px;
            /* 50px * 0.67 */
            border-radius: 50%;
            margin-right: 6.7px;
            /* 10px * 0.67 */
        }

        .player .name {
            font-size: 13.4px;
            /* 20px * 0.67 */
            cursor: pointer;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 13.4px;
            /* 20px * 0.67 */
            width: 402px;
            /* 600px * 0.67 */
        }

        .header div {
            display: flex;
            align-items: center;
            font-size: 20.1px;
            /* 30px * 0.67 */
        }

        .header div i {
            margin-right: 3.35px;
            /* 5px * 0.67 */
        }

        .header div span {
            font-size: 13.4px;
            /* 20px * 0.67 */
        }

        .time-selection {
            background-color: #3a3a3a;
            padding: 6.7px;
            /* 10px * 0.67 */
            border-radius: 3.4px;
            /* 5px * 0.67 */
            margin-bottom: 13.4px;
            /* 20px * 0.67 */
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
        }

        .time-selection i {
            margin-right: 3.35px;
            /* 5px * 0.67 */
        }

        .time-selection span {
            font-size: 10.72px;
            /* 16px * 0.67 */
        }

        .dropdown-content {
            display: none;
            background-color: #3a3a3a;
            border-radius: 3.4px;
            /* 5px * 0.67 */
            margin-top: 3.35px;
            /* 5px * 0.67 */
            padding: 6.7px;
            /* 10px * 0.67 */
        }

        .dropdown-content button {
            background-color: #4a4a4a;
            color: #ffffff;
            border: none;
            padding: 6.7px;
            /* 10px * 0.67 */
            border-radius: 3.4px;
            /* 5px * 0.67 */
            margin-bottom: 3.35px;
            /* 5px * 0.67 */
            width: 100%;
            cursor: pointer;
        }

        .play-button {
            margin-top: 134px;
            /* 200px * 0.67 */
            background-color: #00ff00;
            color: #000000;
            border: none;
            padding: 10.05px;
            /* 15px * 0.67 */
            border-radius: 3.4px;
            /* 5px * 0.67 */
            width: 100%;
            font-size: 20.1px;
            /* 30px * 0.67 */
            cursor: pointer;
            height: 67px;
            /* 100px * 0.67 */
        }

        .play-button button:hover {
            background-color: red;
        }

        .container9 {
            width: 402px;
            /* 600px * 0.67 */
            height: 100vh;
            background-color: rgba(43, 43, 43, 0.1);
            padding: 13.4px;
            /* 20px * 0.67 */
            border-radius: 6.7px;
            /* 10px * 0.67 */
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .header9 {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 6.7px;
            /* 10px * 0.67 */
            border-bottom: 1px solid #444;
        }

        .header9 div {
            display: flex;
            align-items: center;
        }

        .header9 div i {
            margin-right: 3.35px;
            /* 5px * 0.67 */
        }

        .header9 div span {
            font-size: 9.38px;
            /* 14px * 0.67 */
        }

        .moves9 {
            margin-top: 13.4px;
            /* 20px * 0.67 */
            flex-grow: 1;
        }

        .moves9 table {
            width: 100%;
            border-collapse: collapse;
        }

        .moves9 table th,
        .moves9 table td {
            padding: 3.35px;
            /* 5px * 0.67 */
            text-align: left;
        }

        .moves9 table th {
            font-weight: normal;
            color: #999;
        }

        .moves9 table td {
            border-bottom: 1px solid #444;
        }

        .moves9 table td:last-child {
            text-align: right;
        }

        .footer9 {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 6.7px;
            /* 10px * 0.67 */
            border-top: 1px solid #444;
        }

        .footer9 div {
            display: flex;
            align-items: center;
        }

        .footer9 div i {
            margin-right: 3.35px;
            /* 5px * 0.67 */
        }

        .footer9 div span {
            font-size: 9.38px;
            /* 14px * 0.67 */
        }

        .footer9 .actions9 {
            display: flex;
            align-items: center;
        }

        .footer9 .actions9 i {
            margin: 0 3.35px;
            /* 0 5px * 0.67 */
            cursor: pointer;
        }

        .footer9 .actions9 i:hover {
            color: #ccc;
        }

        .new-game9 {
            margin-top: 13.4px;
            /* 20px * 0.67 */
            font-size: 9.38px;
            /* 14px * 0.67 */
        }

        .new-game9 span {
            font-weight: bold;
        }

        .new-game9 i {
            margin-left: 3.35px;
            /* 5px * 0.67 */
        }

        .chat9 {
            margin-top: 13.4px;
            /* 20px * 0.67 */
            background-color: rgba(43, 43, 43, 0.1);
            padding: 6.7px;
            /* 10px * 0.67 */
            border-radius: 3.4px;
            /* 5px * 0.67 */
            flex-grow: 1;
            display: flex;
            flex-direction: column;
        }

        .chat9 .messages9 {
            flex-grow: 1;
            margin-bottom: 6.7px;
            /* 10px * 0.67 */
        }

        .chat9 .messages9 .message9 {
            margin-bottom: 3.35px;
            /* 5px * 0.67 */
        }

        .chat9 .messages9 .message9 span {
            font-weight: bold;

        }

        .chat9 .chat-status9 {
            font-size: 20px;
            margin-top: 10px;
            margin-bottom: 20px;
        }

        .chat9 input[type="text"] {
            width: calc(100% - 33.5px);
            /* 100% - 50px * 0.67 */
            padding: 3.35px;
            /* 5px * 0.67 */
            border: none;
            border-radius: 3.4px;
            /* 5px * 0.67 */
            margin-right: 3.35px;
            /* 5px * 0.67 */
        }



        .chat9 button {
            padding: 3.35px 6.7px;
            /* 5px 10px * 0.67 */
            border: none;
            border-radius: 3.4px;
            /* 5px * 0.67 */
            background-color: #555;
            color: #fff;
            cursor: pointer;
        }

        .chat9 button:hover {
            background-color: #777;
        }

        .theme-selector {
            margin-top: 6.7px;
            /* 10px * 0.67 */
            background-color: #333;
            padding: 6.7px;
            /* 10px * 0.67 */
            border-radius: 3.4px;
            /* 5px * 0.67 */
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .theme-selector select {
            background-color: #444;
            color: #fff;
            padding: 3.35px;
            /* 5px * 0.67 */
            border: none;
            border-radius: 3.4px;
            /* 5px * 0.67 */
            font-size: 9.38px;
            /* 14px * 0.67 */
        }

        .theme-selector label {
            font-size: 9.38px;
            /* 14px * 0.67 */
        }

        #overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            z-index: 1;
        }

        .body_profile {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 402px;
            /* 600px * 0.67 */
            height: 402px;
            /* 600px * 0.67 */
            padding: 13.4px;
            /* 20px * 0.67 */
            text-align: center;
            z-index: 2;
            border-radius: 6.7px;
            /* 10px * 0.67 */
        }

        .container_profile {
            background-color: rgba(43, 43, 43, 0.1);
            border: 2px solid #302E2B;
            border-radius: 6.7px;
            /* 10px * 0.67 */
            width: 268px;
            /* 400px * 0.67 */
            padding: 20.1px;
            /* 30px * 0.67 */
            box-shadow: 0 0 6.7px rgba(0, 0, 0, 0.5);
            text-align: center;
        }

        .header_profile {
            background-color: #5c4b4b;
            border-radius: 3.4px;
            /* 5px * 0.67 */
            padding: 6.7px;
            /*  10px * 0.67 */
            margin-bottom: 13.4px;
            /* 20px * 0.67 */
            font-size: 16.08px;
            /* 24px * 0.67 */
        }

        .profile-pic {
            width: 46.9px;
            /* 70px * 0.67 */
            height: 46.9px;
            /* 70px * 0.67 */
            border-radius: 50%;
            background-color: #fff;
            margin: 13.4px auto;
            /* 20px * 0.67 */
        }

        .info_profile {
            background-color: #5c4b4b;
            border-radius: 3.4px;
            /* 5px * 0.67 */
            padding: 10.05px;
            /* 15px * 0.67 */
            margin-bottom: 13.4px;
            /* 20px * 0.67 */
            font-size: 12.06px;
            /* 18px * 0.67 */
        }

        .info_profile i {
            margin-right: 6.7px;
            /* 10px * 0.67 */
        }

        .progress-bar_profile {
            background-color: #f0e6d2;
            border-radius: 3.4px;
            /* 5px * 0.67 */
            height: 10.05px;
            /* 15px * 0.67 */
            margin: 13.4px 0;
            /* 20px * 0.67 */
            position: relative;
        }

        .progress {
            background-color: #f0a500;
            height: 100%;
            width: 50%;
            border-radius: 3.4px;
            /* 5px * 0.67 */
        }

        .stats {
            display: flex;
            justify-content: space-around;
            margin-bottom: 13.4px;
            /* 20px * 0.67 */
            font-size: 12.06px;
            /* 18px * 0.67 */
        }

        .stats div {
            flex: 1;
            text-align: center;
        }

        .buttons {
            display: flex;
            justify-content: space-around;
        }

        .buttons button {
            background-color: #a67c52;
            border: none;
            border-radius: 3.4px;
            /* 5px * 0.67 */
            padding: 10.05px;
            /* 15px * 0.67 */
            color: #fff;
            cursor: pointer;
            width: 30.15%;
            /* 45% * 0.67 */
            font-size: 12.06px;
            /* 18px * 0.67 */
        }

        .close-popup {
            background-color: #a67c52;
            border: none;
            border-radius: 3.4px;
            /* 5px * 0.67 */
            height: 33.5px;
            /* 50px * 0.67 */
            color: #fff;
            cursor: pointer;
            width: 134px;
            /* 200px * 0.67 */
            font-size: 12.06px;
            /* 18px * 0.67 */
            margin-left: -80.6px;
            /* -120px * 0.67 */
        }
    </style>
</head>

<body>
    <div id="overlay"></div>
    <div class="body_profile" id="body_profile">
        <div class="container_profile">
            <div class="header_profile">Thông tin người chơi</div>
            <div class="profile-pic"></div>
            <div class="info_profile">
                <div><i class="fas fa-mars"></i> Nguyễn Phương Bình</div>

            </div>
            <div class="progress-bar_profile">
                <div class="progress"></div>
            </div>
            <div class="stats">
                <div>0<br>Thắng</div>
                <div>0<br>Hòa</div>
                <div>0<br>Thua</div>
            </div>
            <div class="buttons">
                <button>Cập nhật</button>
                <button>Ván đấu</button>
            </div>

        </div>
        <button id="close-popup" class="close-popup">Đóng</button>
    </div>















    <div class="container">
        <div class="sidebar">
            <img src="https://www.chess.com/bundles/web/images/offline-logo.2d7c7b0b.svg" alt="Chess.com logo">
            <ul>
                <li><i class="fas fa-chess"></i><a href="playonline.html">Play online</a></li>
                <li><i class="fas fa-puzzle-piece"></i><a href="playbots.html">Play Computer</a></li>

            </ul>
            <div class="search">
                <input type="text" placeholder="Search">
            </div>
            <div class="auth-buttons">
                <button id="form-signup" class="signup">Sign Up</button>
                <button id="form-login" class="login">Log In</button>
            </div>
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

                    <div class="theme-selector">
                        <label for="theme">Chọn chủ đề:</label>
                        <select id="theme">
                            <option value="default">Mặc định</option>
                            <option value="forest">Rừng</option>
                            <option value="ocean">Đại dương</option>
                            <option value="space">Không gian</option>
                        </select>
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
                    <div class="messages9">
                        <div class="message9">
                            <span>12binhbinh:</span> Xin chào!
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



        <script>


            document.getElementById("name").onclick = function () {
                document.getElementById("overlay").style.display = "block";
                document.getElementById("body_profile").style.display = "block";
            };
            document.getElementById("name1").onclick = function () {
                document.getElementById("overlay").style.display = "block";
                document.getElementById("body_profile").style.display = "block";
            };

            document.getElementById("close-popup").onclick = function () {
                document.getElementById("overlay").style.display = "none";
                document.getElementById("body_profile").style.display = "none";
            };




            document.getElementById("form-login").onclick = function () {
                window.location.href = 'login.html';
            };
            document.getElementById("form-signup").onclick = function () {
                window.location.href = 'sign up.html';
            };


            function toggleDropdown() {
                var dropdown = document.getElementById("dropdown-content");
                if (dropdown.style.display === "none" || dropdown.style.display === "") {
                    dropdown.style.display = "block";
                } else {
                    dropdown.style.display = "none";
                }
            }

            function selectTime(time) {
                document.getElementById("selected-time").innerText = time;
                toggleDropdown();
            }





            const themeSelect = document.getElementById('theme');

            themeSelect.addEventListener('change', function () {
                const selectedTheme = this.value;

                switch (selectedTheme) {
                    case 'forest':
                        document.body.style.backgroundImage = "url('https://images.chesscomfiles.com/chess-themes/backgrounds/originals/large/wood.png')";
                        document.body.style.opacity = "0.6"; /* Set transparency */
                        break;
                    case 'ocean':
                        document.body.style.backgroundImage = "url('https://images.chesscomfiles.com/chess-themes/backgrounds/originals/large/sky.png')";
                        document.body.style.opacity = "0.8"; /* Set transparency */
                        break;
                    case 'space':
                        document.body.style.backgroundImage = "url('https://images.chesscomfiles.com/chess-themes/backgrounds/originals/large/space.png')";
                        document.body.style.opacity = "0.7"; /* Set transparency */
                        break;
                    default:
                        document.body.style.backgroundImage = "url('../assets/img/background.jpg')"
                        document.body.style.backgroundColor = "0.8";
                }
            });


        </script>

    </div>
    </div>
</body>

</html>