<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>

<head>
    <title>Chess.com</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="playbots.css">
    <link rel="stylesheet" href="playbots.js">
    <link rel="stylesheet" href="../assets/css/playbots.css">

    <style>
    body{
    background-image: url('../assets/img/background.jpg');
}
    </style>
</head>

<body>
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

  <script type="text/javascript" src="../assets/js/layout/playbots.js"></script>




</body>

</html>