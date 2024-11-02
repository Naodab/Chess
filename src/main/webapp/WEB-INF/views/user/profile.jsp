<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <html>

<head>
    <title>
        Profile Page
    </title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="../assets/css/profile.css">
    <style>
body{
  background-image: url('../assets/img/background.jpg');
}
  .halloween {
      background-image: url('../assets/img/halowend.png');
      background-size: cover;
      background-position: center;
      padding: 10px;
  }

  .go {
      background-image: url('../assets/img/background.jpg');
      background-size: cover;
      background-position: center;
      padding: 10px;
  }

  .thuytinh {
      background-image: url('../assets/img/thuytinh.jpg');
      background-size: cover;
      background-position: center;
      padding: 10px;
  }

  .sky {
      background-image: url('../assets/img/sky.png');
      background-size: cover;
      background-position: center;
      padding: 10px;
  }

  .space {
      background-image: url('../assets/img/space.png');
      background-size: cover;
      background-position: center;
      padding: 10px;
  }
    </style>
</head>

<body>


    <div class="sidebar1">
        <img alt="Chess.com logo" src="../assets/img/icon.jpg" width="150" height="100" />
        <a href="playonline.html"><i class="fas fa-chess"></i> Play Online</a>
        <a href="playbots.html"><i class="fas fa-puzzle-piece"></i> Play Computer</a>


        <button id="form-signup" class="button signup">Sign Up</button>
        <button id="form-login" class="button login">Log In</button>
        <a class="settings-link" href="profile.html"><i class="fas fa-cog"></i>Cài đặt</a>

    </div>




    <div class="container">
        <div class="sidebar">
            <ul>
                <li onclick="replaceMainDiv()">
                    <i class="fas fa-user">
                    </i>
                    Hồ sơ
                </li>

                <li onclick="replaceMainDiv2()">
                    <i class="fas fa-comments">
                    </i>
                    Chủ đề
                </li>

                <li onclick="replaceMainDiv3()">
                    <i class="fas fa-cog">
                    </i>
                    Mật khẩu
                </li>

            </ul>
        </div>



        <div class="replace" id="mainDiv">
            <div class="content">
                <div class="profile-header">
                    <img alt="Profile Picture" height="100"
                        src="https://storage.googleapis.com/a1aa/image/JHeBgkD6qATifUz1lKka5dQLrongUea1U5oYygaSS7sHUzTnA.jpg"
                        width="100" />
                    <div class="profile-info">
                        <h2>
                            12binhbinh
                            <i class="fas fa-flag">
                            </i>
                        </h2>
                        <p>
                            Phương Bình Nguyễn
                        </p>
                        <div class="status">
                            <i class="fas fa-circle">
                            </i>
                            <span>
                                Đang status ở đây
                            </span>
                        </div>
                    </div>

                </div>
                <div class="profile-form">
                    <div class="form-group">
                        <label for="username">
                            Username
                        </label>
                        <input id="username" type="text" value="12binhbinh"  readonly/>
                    </div>

                    <div class="form-group">
                        <label for="last-name">
                            Email
                        </label>
                        <input id="last-name" type="text" value="phuongbinh732004@gmail.com"  readonly/>
                    </div>

                    <div class="form-container">
                        <div class="form-group3">
                            <label for="position">
                                Số trận hòa
                            </label>
                            <label for="position">100</label>
                        </div>
                        <div class="form-group3">
                            <label for="position">
                                Số trận thắng
                            </label>
                            <label for="position">100</label>
                        </div>
                        <div class="form-group3">
                            <label for="position">
                                Số trận thua
                            </label>
                            <label for="position">100</label>
                        </div>
                        <div class="form-group3">
                            <label for="position">
                                Cấp bậc
                            </label>
                            <label for="position">100</label>
                        </div>
                    </div>


                    <div class="form-group4">
                        <label for="position">
                            Thành tích
                        </label>
                        <div class="image-container">
                            <img alt="Achievement 1" height="40"
                                src="https://storage.googleapis.com/a1aa/image/YY6isBTFXbLUPNNlUUb8AnP0vZRJeo1J7BOpJb4TZPXhJK2JA.jpg"
                                width="40" />
                            <img alt="Achievement 2" height="40"
                                src="https://storage.googleapis.com/a1aa/image/GkqVj2F8kwZ0CNVhOU0jXokF2GE0lPUw1nkRq8fWULyiJK2JA.jpg"
                                width="40" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
         <script type="text/javascript" src="../assets/js/layout/profile.js"></script>
        
   
</body>

</html>