<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>

<head>
    <title>Chess.com</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet" />
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
           background-image: url('../assets/img/background.jpg');
            color: #fff;
        }

        .container {
            display: flex;
        }

        .sidebar {
            width: 134px;
            /* 200px * 0.67 */
            height: 100vh;
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
            font-size: 12px;
            /* 18px * 0.67 */
        }

        .bot-info {
            font-family: Arial, sans-serif;
            background-color: rgba(43, 43, 43, 0.1);
            color: #fff;
            margin: 0;
            padding: 0;
            width: 402px;
            /* 600px * 0.67 */
            height: 100vh;
        }

        .bot-header h1 {
            font-size: 16px;
            /* 24px * 0.67 */
            color: #ffffff;
            margin: 0;
        }

        .bot-header {
            display: flex;
            align-items: center;
            margin-bottom: 6.7px;
            /* 10px * 0.67 */
        }

        .bot -header img {
            width: 26.8px;
            /* 40px * 0.67 */
            height: 26.8px;
            /* 40px * 0.67 */
            margin-right: 6.7px;
            /* 10px * 0.67 */
            border-radius: 50%;
        }

        .bot-name {
            font-size: 12px;
            /* 18px * 0.67 */
            font-weight: bold;
        }

        .bot-rating {
            font-size: 10.72px;
            /* 16px * 0.67 */
            margin-left: auto;
            display: flex;
            align-items: center;
        }

        .bot-rating i {
            margin-left: 3.35px;
            /* 5px * 0.67 */
        }

        .bot-description {
            font-size: 9.38px;
            /* 14px * 0.67 */
            margin: 6.7px 0;
            /* 10px * 0.67 */
        }

        .bot-list {
            margin: 6.7px 0;
            /* 10px * 0.67 */
        }

        .bot-category {
            font-weight: bold;
            font-size: 10.72px;
            /* 16px * 0.67 */
            margin: 6.7px 0 3.35px;
            /* 10px 0 5px * 0.67 */
        }

        .bot-item {
            display: inline-block;
            margin-right: 6.7px;
            /* 10px * 0.67 */
        }

        .bot-item img {
            width: 26.8px;
            /* 40px * 0.67 */
            height: 26.8px;
            /* 40px * 0.67 */
            border-radius: 50%;
        }

        .play-button {
            text-align: center;
            margin-top: 10.05px;
            /* 15px * 0.67 */
        }

        .play-button button {
            background-color: #4CAF50;
            color: white;
            padding: 6.7px 13.4px;
            /* 10px 20px * 0.67 */
            border: none;
            border-radius: 3.4px;
            /* 5px * 0.67 */
            cursor: pointer;
            width: 134px;
            /* 200px * 0.67 */
            height: 33.5px;
            /* 50px * 0.67 */
        }

        .play-button button:hover {
            background-color: #45a049;
        }

        .header {
            background-color: #2a2a2a;
            padding: 6.7px;
            /* 10px * 0.67 */
            display: flex;
            align-items: center;
        }

        .header img {
            border-radius: 50%;
            margin-right: 6.7px;
            /* 10px * 0.67 */
        }

        .header h1 {
            font-size: 13.4px;
            /* 20px * 0.67 */
            margin: 0;
        }

        .content {
            padding: 13.4px;
            /* 20px * 0.67 */
        }

        .profile {
            display: flex;
            align-items: center;
            margin-bottom: 13.4px;
            /* 20px * 0.67 */
        }

        .profile img {
            border-radius: 50%;
            margin-right: 6.7px;
            /* 10px * 0.67 */
        }

        .profile .quote {
            background-color: #3a3a3a;
            padding: 5px;
            /* 10px * 0.67 */
            border-radius: 3.4px;
            /* 5px * 0.67 */
            margin-left: 6.7px;
            /* 10px * 0.67 */
        }

        .profile .quote p {
            margin: 0;
            font-size: 10px;
        }

        .profile .details {
            margin-left: 10px;
            font-size: 10px;
            /* 20px * 0.67 */
        }

        .profile .details h2 {
            margin: 0;
            font-size: 10px;
            /* 24px * 0.67 */
        }

        .profile .details .rating {
            display: flex;
            align-items: center;
        }

        .profile .details .rating i {
            margin-left: 3.35px;
            /* 5px * 0.67 */
        }

        .profile .details p {
            margin: 3.35px 0 0 0;
            /* 5px 0 0 0 * 0.67 */
        }

        .bot-category {
            background-color: #2a2a2a;
            padding: 6.7px;
            /* 10px * 0.67 */
            border-radius: 3.4px;
            /* 5px * 0.67 */
            margin-bottom: 6.7px;
            /* 10px * 0. 67 */
        }

        .bot-category h3 {
            margin: 0;
            font-size: 12px;
            /* 18px * 0.67 */
        }

        .bot-category .bots {
            display: flex;
            margin-top: 6.7px;
            /* 10px * 0.67 */
            overflow-x: auto;
        }

        .bot-category .bots img {
            border-radius: 3.4px;
            /* 5px * 0.67 */
            margin-right: 6.7px;
            /* 10px * 0.67 */
            border: 2px solid transparent;
            cursor: pointer;
        }

        .bot-category .bots img.selected {
            border-color: #00ff00;
        }

        .footer {
            background-color: #2a2a2a;
            padding: 6.7px;
            /* 10px * 0.67 */
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .footer .play-button {
            background-color: #00ff00;
            color: #000;
            padding: 6.7px 13.4px;
            /* 10px 20px * 0.67 */
            border: none;
            border-radius: 3.4px;
            /* 5px * 0.67 */
            font-size: 12px;
            /* 18px * 0.67 */
            cursor: pointer;
        }

        .footer .play-as {
            display: flex;
            align-items: center;
        }

        .footer .play-as img {
            border-radius: 50%;
            margin-right: 3.35px;
            /* 5px * 0.67 */
        }

        .sidebar3 {
            width: 402px;
            /* 600px * 0.67 */
            background-color: rgba(43, 43, 43, 0.1);
            display: flex;
            flex-direction: column;
            height: 100vh;
        }

        .header3 {
            background-color: rgba(43, 43, 43, 0.1);
            padding: 6.7px;
            /* 10px * 0.67 */
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .header3 img {
            width: 20.1px;
            /* 30px * 0.67 */
            height: 20.1px;
            /* 30px * 0.67 */
            margin-right: 6.7px;
            /* 10px * 0.67 */
        }

        .header3 h1 {
            font-size: 13.4px;
            /* 20px * 0.67 */
            margin: 0;
        }

        .content3 {
            padding: 13.4px;
            /* 20px * 0.67 */
            text-align: center;
            flex-grow: 1;
        }

        .content3 img {
            width: 67px;
            /* 100px * 0.67 */
            height: 67px;
            /* 100px * 0.67 */
            border-radius: 50%;
        }

        .moves3 {
            margin-top: 13.4px;
            /* 20px * 0.67 */
            text-align: left;
        }

        .moves3 table {
            width: 100%;
            border-collapse: collapse;
        }

        .moves3 th,
        .moves3 td {
            padding: 6.7px;
            /* 10px * 0.67 */
            border-bottom: 1px solid #333333;
        }

        .moves3 th {
            text-align: left;
        }

        .moves3 td {
            text-align: center;
        }

        .footer3 {
            background-color: rgba(43, 43, 43, 0.1);
            padding: 6.7px;
            /* 10px * 0.67 */
            display: flex;
            justify-content: space-around;
            align-items: center;
        }

        .footer3 button {
            background-color: #333333;
            border: none;
            color: #ffffff;
            padding: 6.7px;
            /* 10px * 0.67 */
            font-size: 13.4px;
            /* 20px * 0.67 */
            cursor: pointer;
        }

        .footer3 button i {
            margin-right: 3.35px;
            /* 5px * 0.67 */
        }

        .footer3 .accept3 {
            display: flex;
            align-items: center;
        }

        .footer3 .accept3 i {
            margin-right: 3.35px;
            /* 5px * 0.67 */
        }
    </style>
</head>

<body>
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
                    <div class="name">Player 1</div>
                </div>
            </div>
            <div class="chess-board">
                <img src="https://www.chess.com/bundles/web/images/board.2d7c7b0b.svg" alt="Chess board">
            </div>
            <div class="player-info">
                <div class="player">
                    <img src="https://www.chess.com/bundles/web/images/user-image.3920d4c5.svg" alt="Player 2">
                    <div class="name">Player 2</div>
                </div>
            </div>
        </div>
        <div class="bot-info" id="mainDiv">

            <div class="header">
                <img alt="User Icon" height="30" src="https://placehold.co/30x30" width="30" />
                <h1>Play Bots</h1>
            </div>
            <div class="content">
                <div class="profile">
                    <img id="profile-img" alt="William Kai" height="60" src="https://placehold.co/60x60" width="60" />
                    <div class="quote">
                        <p id="profile-quote">This is where it begins, like launching into the void. No going back now.
                        </p>
                    </div>
                    <div class="details">
                        <h2 id="profile-name">William Kai <span class="rating">500 <i class="fas fa-star"></i></span>
                        </h2>
                        <p id="profile-description">William Kai pilots the Aquarius III spaceship and leads the
                            infantry. Can you defeat him in battle?</p>
                    </div>
                </div>
                <div class="bot-category">
                    <h3>Ultra 85 by Logic <span>5 bots</span></h3>
                    <div class="bots" id="bot-list">
                        <img alt="Bot 1" class="selected" height="50" src="https://placehold.co/50x50" width="50"
                            onclick="selectBot('William Kai', 'This is where it begins, like launching into the void. No going back now.', 'William Kai pilots the Aquarius III spaceship and leads the infantry. Can you defeat him in battle?', 'https://placehold.co/60x60')" />
                        <img alt="Bot 2" height="50" src="https://placehold.co/50x50" width="50"
                            onclick="selectBot('Bot 2', 'Quote for Bot 2', 'Description for Bot 2', 'https://placehold.co/60x60')" />
                        <img alt="Bot 3" height="50" src="https://placehold.co/50x50" width="50"
                            onclick="selectBot('Bot 3', 'Quote for Bot 3', 'Description for Bot 3', 'https://placehold.co/60x60')" />
                        <img alt="Bot 4" height="50" src="https://placehold.co/50x50" width="50"
                            onclick="selectBot('Bot 4', 'Quote for Bot 4', 'Description for Bot 4', 'https://placehold.co/60x60')" />
                        <img alt="Bot 5" height="50" src="https://placehold.co/50x50" width="50"
                            onclick="selectBot('Bot 5', 'Quote for Bot 5', 'Description for Bot 5', 'https://placehold.co/60x60')" />
                    </div>
                </div>
                <div class="bot-category">
                    <h3>Halloween <span>5 bots</span></h3>
                    <div class="bots">
                        <img alt="Bot 1" height="50" src="https://placehold.co/50x50" width="50" />
                        <img alt="Bot 2" height="50" src="https://placehold.co/50x50" width="50" />
                        <img alt="Bot 3" height="50" src="https://placehold.co/50x50" width="50" />
                        <img alt="Bot 4" height="50" src="https://placehold.co/50x50" width="50" />
                        <img alt="Bot 5" height="50" src="https://placehold.co/50x50" width="50" />
                    </div>
                </div>
                <div class="bot-category">
                    <h3>Moo the Hippo <span>3 bots</span></h3>
                    <div class="bots">
                        <img alt="Bot 1" height="50" src="https://placehold.co/50x50" width="50" />
                        <img alt="Bot 2" height="50" src="https://placehold.co/50x50" width="50" />
                        <img alt="Bot 3" height="50" src="https://placehold.co/50x50" width="50" />
                    </div>
                </div>
                <!-- <div class="bot-category">
                    <h3>Coach <span>5 bots</span></h3>
                    <div class="bots">
                        <img alt="Bot 1" height="50" src="https://placehold.co/50x50" width="50" />
                        <img alt="Bot 2" height="50" src="https://placehold.co/50x50" width="50" />
                        <img alt="Bot 3" height="50" src="https://placehold.co/50x50" width="50" />
                        <img alt="Bot 4" height="50" src="https://placehold.co/50x50" width="50" />
                        <img alt="Bot 5" height="50" src="https://placehold.co/50x50" width="50" />
                    </div>
                </div> -->
            </div>




            <div class="play-button">

                <button onclick="replaceMainDiv()">Play</button>
            </div>
        </div>
    </div>

    <script>

        document.getElementById("form-login").onclick = function () {
            window.location.href = 'login.html';
        };
        document.getElementById("form-signup").onclick = function () {
            window.location.href = 'sign up.html';
        };



        function selectBot(name, quote, description, imgSrc) {
            document.getElementById('profile-name').innerText = name;
            document.getElementById('profile-quote').innerText = quote;
            document.getElementById('profile-description').innerText = description;
            document.getElementById('profile-img').src = imgSrc;

            var bots = document.querySelectorAll('.bot-category .bots img');
            bots.forEach(function (bot) {
                bot.classList.remove('selected');
            });
            event.target.classList.add('selected');
        }





        function replaceMainDiv() {
            const mainDiv = document.getElementById("mainDiv");
            mainDiv.innerHTML = `
           
    <div class="sidebar3">
      <div class="header3">
        <img alt="User icon" height="30" src="https://storage.googleapis.com/a1aa/image/heMr64OXfLicI0UtpuSABQBe9mZDilIahRrNvZLCIkduoYQnA.jpg" width="30" />
        <h1>Play Bots</h1>
      </div>
      <div class="content3">
        <img alt="Bot avatar" height="100" src="https://storage.googleapis.com/a1aa/image/TCZAA1S87rbzKhx7blCyaQtfjfd3e1172Vri6ZaoD2NtoYQnA.jpg" width="100" />
        <div class="moves3">
          <p>Saragossa Opening</p>
          <table>
            <tr><th>1.</th><td>c3</td><td>d5</td></tr>
            <tr><th>2.</th><td>e4</td><td>dxe4</td></tr>
            <tr><th>3.</th><td>Q a4+</td><td>N d7</td></tr>
            <tr><th>4.</th><td>d4</td><td>c6</td></tr>
            <tr><th>5.</th><td>f4</td><td>N gf6</td></tr>
          </table>
        </div>
      </div>
      <div class="footer3">
        <button><i class="fas fa-plus"></i></button>
        <button><i class="fas fa-times"></i></button>
        <button><i class="fas fa-arrow-left"></i></button>
        <button><i class="fas fa-arrow-right"></i></button>
        <button><i class="fas fa-lightbulb"></i></button>
        <div class="accept3">
          <i class="fas fa-flag"></i>
          <span>Chấp nhận thua</span>
        </div>
      </div>
    </div>
  
    `;
        }

    </script>

</body>

</html>