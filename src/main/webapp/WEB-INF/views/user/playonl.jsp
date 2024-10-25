<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>

<head>
    <title>Chess.com</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet" />
    <style>
        body {
            background-image: url('./img/background.jpg');
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
            width: 200px;
            background-color: rgba(43, 43, 43, 0.1);
            padding: 20px;
            box-sizing: border-box;
        }

        .sidebar img {
            width: 100px;
            margin-bottom: 20px;
        }

        .sidebar ul {
            list-style: none;
            padding: 0;
        }

        .sidebar ul li {
            margin: 20px 0;
            display: flex;
            align-items: center;
        }

        .sidebar ul li i {
            margin-right: 10px;
        }

        .sidebar ul li a {
            color: #fff;
            text-decoration: none;
            font-size: 18px;
        }

        .sidebar .search {
            margin-top: 20px;
        }

        .sidebar .search input {
            width: 100%;
            padding: 10px;
            border: none;
            border-radius: 5px;
            box-sizing: border-box;
        }

        .sidebar .auth-buttons {
            margin-top: 20px;
        }

        .sidebar .auth-buttons button {
            width: 100%;
            padding: 10px;
            border: none;
            border-radius: 5px;
            margin-bottom: 10px;
            font-size: 16px;
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
            padding: 20px;
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
            width: 600px;
            height: 600px;
        }

        .player-info {
            display: flex;
            justify-content: space-between;
            width: 400px;
            margin-top: 20px;
        }

        .player {
            display: flex;
            align-items: center;
        }

        .player img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-right: 10px;
        }

        .player .name {
            font-size: 20px;
            cursor: pointer;
        }






        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            width: 600px;

        }



        .header div {
            display: flex;
            align-items: center;
            font-size: 30px;
        }

        .header div i {
            margin-right: 5px;
        }

        .header div span {
            font-size: 20px;
        }

        .time-selection {
            background-color: #3a3a3a;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
        }

        .time-selection i {
            margin-right: 5px;
        }

        .time-selection span {
            font-size: 16px;
        }

        .dropdown-content {
            display: none;
            background-color: #3a3a3a;
            border-radius: 5px;
            margin-top: 5px;
            padding: 10px;

        }

        .dropdown-content button {
            background-color: #4a4a4a;
            color: #ffffff;
            border: none;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 5px;
            width: 100%;
            cursor: pointer;
        }

        .play-button {
            margin-top: 200px;
            background-color: #00ff00;
            color: #000000;
            border: none;
            padding: 15px;
            border-radius: 5px;
            width: 100%;
            font-size: 30px;
            cursor: pointer;
            height: 100px;
        }

        .play-button button:hover {
            background-color: red;
        }









        .container9 {
            width: 600px;
            height: 100vh;
            background-color: rgba(43, 43, 43, 0.1);
            /* background-color: rgba(43, 43, 43, 0.9);  */
            padding: 20px;
            border-radius: 10px 0 0 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .header9 {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 10px;
            border-bottom: 1px solid #444;
        }

        .header9 div {
            display: flex;
            align-items: center;
        }

        .header9 div i {
            margin-right: 5px;
        }

        .header9 div span {
            font-size: 14px;
        }

        .moves9 {
            margin-top: 20px;
            flex-grow: 1;

        }

        .moves9 table {
            width: 100%;
            border-collapse: collapse;
        }

        .moves9 table th,
        .moves9 table td {
            padding: 5px;
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
            padding-top: 10px;
            border-top: 1px solid #444;
        }

        .footer9 div {
            display: flex;
            align-items: center;
        }

        .footer9 div i {
            margin-right: 5px;
        }

        .footer9 div span {
            font-size: 14px;
        }

        .footer9 .actions9 {
            display: flex;
            align-items: center;
        }

        .footer9 .actions9 i {
            margin: 0 5px;
            cursor: pointer;
        }

        .footer9 .actions9 i:hover {
            color: #ccc;
        }

        .new-game9 {
            margin-top: 20px;
            font-size: 14px;
        }

        .new-game9 span {
            font-weight: bold;
        }

        .new-game9 i {
            margin-left: 5px;
        }

        .chat9 {
            margin-top: 20px;
            background-color: rgba(43, 43, 43, 0.1);
            padding: 10px;
            border-radius: 5px;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
        }

        .chat9 .messages9 {
            flex-grow: 1;

            margin-bottom: 10px;
        }

        .chat9 .messages9 .message9 {
            margin-bottom: 5px;
        }

        .chat9 .messages9 .message9 span {
            font-weight: bold;
        }

        .chat9 input[type="text"] {
            width: calc(100% - 50px);
            padding: 5px;
            border: none;
            border-radius: 5px;
            margin-right: 5px;
        }

        .chat9 button {
            padding: 5px 10px;
            border: none;
            border-radius: 5px;
            background-color: #555;
            color: #fff;
            cursor: pointer;
        }

        .chat9 button:hover {
            background-color: #777;
        }

        /* Dropdown styles */
        .theme-selector {
            margin-top: 10px;
            background-color: #333;
            padding: 10px;
            border-radius: 5px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .theme-selector select {
            background-color: #444;
            color: #fff;
            padding: 5px;
            border: none;
            border-radius: 5px;
            font-size: 14px;
        }

        .theme-selector label {
            font-size: 14px;
        }










        /* Ẩn mặc định */
        #overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            /* Làm mờ nền */
            z-index: 1;
            /* Đặt overlay phía trên */
        }



        .body_profile {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 600px;
            height: 600px;
            padding: 20px;
            text-align: center;
            z-index: 2;
            /* Đặt popup phía trên overlay */
            border-radius: 10px;
        }

        .container_profile {
            background-color: rgba(43, 43, 43, 0.1);
            border: 2px solid #302E2B;
            border-radius: 10px;
            width: 400px;
            padding: 30px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            text-align: center;
        }

        .header_profile {
            background-color: #5c4b4b;
            border-radius: 5px;
            padding: 10px;
            margin-bottom: 20px;
            font-size: 24px;
        }

        .profile-pic {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            background-color: #fff;
            margin: 20px auto;
        }

        .info_profile {
            background-color: #5c4b4b;
            border-radius: 5px;
            padding: 15px;
            margin-bottom: 20px;
            font-size: 18px;
        }

        .info_profile i {
            margin-right: 10px;
        }

        .progress-bar_profile {
            background-color: #f0e6d2;
            border-radius: 5px;
            height: 15px;
            margin: 20px 0;
            position: relative;
        }

        .progress {
            background-color: #f0a500;
            height: 100%;
            width: 50%;
            border-radius: 5px;
        }

        .stats {
            display: flex;
            justify-content: space-around;
            margin-bottom: 20px;
            font-size: 18px;
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
            border-radius: 5px;
            padding: 15px;
            color: #fff;
            cursor: pointer;
            width: 45%;
            font-size: 18px;
        }

        .close-popup{
           
            
            background-color: #a67c52;
            border: none;
            border-radius: 5px;
            height: 50px;
            color: #fff;
            cursor: pointer;
            width: 200px;
            font-size: 18px;
            margin-left: -120px;
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
                </div>
                <div class="chat-status9">
                    <span>Đã tắt chat</span>
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