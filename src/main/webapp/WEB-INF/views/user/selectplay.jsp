<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="../assets/css/selectplay.css">
    <style>
    body{
    background-image: url('../assets/img/background.jpg');
}
    </style>
</head>

<body>
    <div id="overlay"></div>
    <div id="popup-create-room" class="popup-create-room">
        <div class="container1">
            <div class="close-btn_profile" id="close-btn_profile">
                <i id="close-btn_profile" class="fas fa-times">
                </i>
            </div>


            <div class="section">
                <div class="section-title">THỜI LƯỢNG</div>
                <div class="time-box">
                    <button onclick="changeTime('game', -1)">-</button>
                    <span id="game-time" class="value">15'/ván</span>
                    <button onclick="changeTime('game', 1)">+</button>
                </div>
                <div class="time-box">
                    <button onclick="changeTime('move', -10)">-</button>
                    <span id="move-time" class="value">90s/nước</span>
                    <button onclick="changeTime('move', 10)">+</button>
                </div>
                <div class="time-box">
                    <button onclick="changeTime('increment', -1)">-</button>
                    <span id="increment-time" class="value">0s lũy tiến</span>
                    <button onclick="changeTime('increment', 1)">+</button>
                </div>
            </div>
            <button class="create-button1">Tạo bàn</button>
        </div>

    </div>

    <div class="main_ontable" id="main_ontable">
        <div class="ontable">
            <div class="header99" id="header99">
                <i id="out" class="fas fa-arrow-left"></i>
                Vào bàn
            </div>

            <div class="input-code">
                <input type="text" id="codeInput" maxlength="5" readonly>
            </div>
            <div class="keypad">
                <button onclick="appendNumber(1)">1</button>
                <button onclick="appendNumber(2)">2</button>
                <button onclick="appendNumber(3)">3</button>
                <button onclick="appendNumber(4)">4</button>
                <button onclick="appendNumber(5)">5</button>
                <button onclick="appendNumber(6)">6</button>
                <button onclick="appendNumber(7)">7</button>
                <button onclick="appendNumber(8)">8</button>
                <button onclick="appendNumber(9)">9</button>
                <button onclick="clearInput()"><i class="fas fa-times"></i></button>
                <button onclick="appendNumber(0)">0</button>
                <button onclick="submitCode()"><i class="fas fa-check"></i></button>
            </div>
            <button class="submit-btn99" onclick="submitCode()">Vào bàn</button>
        </div>
    </div>




    <div class="body_profile" id="body_profile">
        <div class="main_profile">
            <div class="container_profile">
                <div class="header_profile">
                    Thông tin người chơi
                </div>
                <div class="close-btn_profile1" id="close-btn_profile1">
                    <i id="close-btn_profile1" class="fas fa-times">
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





    <div class="sidebar">
        <img alt="Chess.com logo" src="../assets/img/icon.jpg" width="150" height="100" />
        <a href="playonline.html"><i class="fas fa-chess"></i> Play Online</a>
        <a href="playbots.html"><i class="fas fa-puzzle-piece"></i> Play Computer</a>


        <button id="form-signup" class="button signup">Sign Up</button>
        <button id="form-login" class="button login">Log In</button>
        <a class="settings-link" href="profile.html"><i class="fas fa-cog"></i>Cài đặt</a>


    </div>
    <div class="main-content">
        <div class="container">
            <div class="header">
                <div class="search-room">
                    <button class="search" id="search" onclick="searchRoom()">Vào bàn</button>
                    <!-- <input type="text" id="searchInput" placeholder="Nhập ID ...."> -->

                </div>


                <button id="btn_create" class="create-room">
                    TẠO BÀN
                </button>
            </div>
            <table class="table">
                <!-- <thead>
                    <tr>
                        <th>
                            Phòng
                        </th>
                        <th>
                            Thời gian
                        </th>
                        <th>
                            Số người
                        </th>

                        <th>
                            Trạng thái
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="room-id">
                            <label for="">33008</label>
                        </td>
                        <td>
                            10 phút
                        </td>
                        <td>
                            2
                        </td>

                        <td>

                            <div class="taoban">
                                <button class="main-btn">Tham gia</button>
                                <button class="screen">Xem</button>

                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="room-id">
                            9783992
                        </td>
                        <td>
                            30 phút
                        </td>
                        <td>
                            2
                        </td>

                        <td>
                            <div class="taoban">
                                <button class="main-btn">Tham gia</button>
                                <button class="screen">Xem</button>

                            </div>

                        </td>
                    </tr>
                    <tr>
                        <td class="room-id">
                            9831609
                        </td>
                        <td>
                            5 phút
                        </td>
                        <td>
                            2
                        </td>

                        <td>

                            <div class="taoban">
                                <button class="main-btn">Tham gia</button>
                                <button class="screen">Xem</button>

                            </div>

                        </td>
                    </tr>
                    <tr>
                        <td class="room-id">
                            9851036
                        </td>
                        <td>
                            20 phút
                        </td>
                        <td>
                            2
                        </td>

                        <td>

                            <div class="taoban">
                                <button class="main-btn">Tham gia</button>
                                <button class="screen">Xem</button>

                            </div>

                        </td>
                    </tr>
                    <tr>
                        <td class="room-id">
                            9847615
                        </td>
                        <td>
                            15 phút
                        </td>
                        <td>
                            2
                        </td>

                        <td>
                            <div class="taoban">
                                <button class="main-btn">Tham gia</button>
                                <button class="screen">Xem</button>

                            </div>
                        </td>
                    </tr>
                </tbody> -->

                <thead>
                    <tr>
                        <th>Phòng</th>
                        <th>Thời gian</th>
                        <th>Số người</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody id="rooms-table">

                </tbody>
            </table>
            <div class="profile">
                <img alt="Profile picture" height="50" src="../assets/img/huydomic.jfif" width="50" />
                <div>
                    <div class="name" id="name">
                        HuyDomic
                    </div>
                    <div>
                        123,750
                    </div>
                </div>
            </div>

        </div>
    </div>
    <div class="right-panel">
        <div class="title">Play Chess Online on the #1 Site!</div>
        <div id="playonline" class="button play-online">Play Online<br />Play with someone at your level</div>
        <div id="playbots" class="button play-bots">Play Bots<br />Play vs customizable training bots</div>

        <div class="title">Top tuyển thủ</div>
        <div class="player">
            <img alt="Player avatar" height="30"
                src="https://storage.googleapis.com/a1aa/image/tBctpN9GdmazLdxoR24rNWaoupdW9i7CvK64UGgE69gv9k6E.jpg"
                width="30" />
            <div class="info">
                <div>
                    <span class="title">
                        GM
                    </span>
                    <span class="name">
                        Nguyễn Phương Bình
                    </span>
                    <span class="rating">
                        (1)
                    </span>

                </div>
                <div class="status online">
                    Đang Online
                </div>



            </div>
        </div>
        <div class="player">
            <img alt="Player avatar" height="30"
                src="https://storage.googleapis.com/a1aa/image/tBctpN9GdmazLdxoR24rNWaoupdW9i7CvK64UGgE69gv9k6E.jpg"
                width="30" />
            <div class="info">
                <div>
                    <span class="title">
                        GM
                    </span>
                    <span class="name">
                        Nguyễn Hồ Bá Doãn
                    </span>
                    <span class="rating">
                        (21)
                    </span>

                </div>
                <div class="status online">
                    Đang Online
                </div>
            </div>
        </div>



        <div class="player">
            <img alt="Player avatar" height="30"
                src="https://storage.googleapis.com/a1aa/image/tBctpN9GdmazLdxoR24rNWaoupdW9i7CvK64UGgE69gv9k6E.jpg"
                width="30" />
            <div class="info">
                <div>
                    <span class="title">
                        GM
                    </span>
                    <span class="name">
                        Hồ XUân Huy
                    </span>
                    <span class="rating">
                        (41)
                    </span>

                </div>
                <div class="status online">
                    Đang Online
                </div>
            </div>
        </div>
        <div class="player">
            <img alt="Player avatar" height="30"
                src="https://storage.googleapis.com/a1aa/image/tBctpN9GdmazLdxoR24rNWaoupdW9i7CvK64UGgE69gv9k6E.jpg"
                width="30" />
            <div class="info">
                <div>
                    <span class="title">
                        GM
                    </span>
                    <span class="name">
                        Ngô Văn Thành
                    </span>
                    <span class="rating">
                        (31)
                    </span>

                </div>
                <div class="status online">
                    Đang Online
                </div>
            </div>
        </div>
        <div class="player">
            <img alt="Player avatar" height="30"
                src="https://storage.googleapis.com/a1aa/image/tBctpN9GdmazLdxoR24rNWaoupdW9i7CvK64UGgE69gv9k6E.jpg"
                width="30" />
            <div class="info">
                <div>
                    <span class="title">
                        GM
                    </span>
                    <span class="name">
                        Phan Anh Phương
                    </span>
                    <span class="rating">
                        (31)
                    </span>

                </div>
                <div class="status online">
                    Đang Online
                </div>
            </div>
        </div>
        <div class="player">
            <img alt="Player avatar" height="30"
                src="https://storage.googleapis.com/a1aa/image/tBctpN9GdmazLdxoR24rNWaoupdW9i7CvK64UGgE69gv9k6E.jpg"
                width="30" />
            <div class="info">
                <div>
                    <span class="title">
                        GM
                    </span>
                    <span class="name">
                        Nguyễn Ngọc Tuyển
                    </span>
                    <span class="rating">
                        (73)
                    </span>

                </div>
                <div class="status online">
                    Đang Online
                </div>
            </div>
        </div>
        <div class="player">
            <img alt="Player avatar" height="30"
                src="https://storage.googleapis.com/a1aa/image/tBctpN9GdmazLdxoR24rNWaoupdW9i7CvK64UGgE69gv9k6E.jpg"
                width="30" />
            <div class="info">
                <div>
                    <span class="title">
                        GM
                    </span>
                    <span class="name">
                        NGuyễn Văn Đức
                    </span>
                    <span class="rating">
                        (23)
                    </span>

                </div>
                <div class="status online">
                    Đang Online
                </div>
            </div>
        </div>
        <div class="player">
            <img alt="Player avatar" height="30"
                src="https://storage.googleapis.com/a1aa/image/tBctpN9GdmazLdxoR24rNWaoupdW9i7CvK64UGgE69gv9k6E.jpg"
                width="30" />
            <div class="info">
                <div>
                    <span class="title">
                        GM
                    </span>
                    <span class="name">
                        Huỳnh Hữu Hoàng
                    </span>
                    <span class="rating">
                        (71)
                    </span>

                </div>
                <div class="status online">
                    Đang Online
                </div>
            </div>
        </div>
        <div class="player">
            <img alt="Player avatar" height="30"
                src="https://storage.googleapis.com/a1aa/image/tBctpN9GdmazLdxoR24rNWaoupdW9i7CvK64UGgE69gv9k6E.jpg"
                width="30" />
            <div class="info">
                <div>
                    <span class="title">
                        GM
                    </span>
                    <span class="name">
                        PHan TUấn Thành
                    </span>
                    <span class="rating">
                        (3)
                    </span>

                </div>
                <div class="status online">
                    Đang Online
                </div>
            </div>
        </div>
        <div class="player">
            <img alt="Player avatar" height="30"
                src="https://storage.googleapis.com/a1aa/image/tBctpN9GdmazLdxoR24rNWaoupdW9i7CvK64UGgE69gv9k6E.jpg"
                width="30" />
            <div class="info">
                <div>
                    <span class="title">
                        GM
                    </span>
                    <span class="name">
                        Nguyễn Thị Tuyết Nữ
                    </span>
                    <span class="rating">
                        (99)
                    </span>

                </div>
                <div class="status online">
                    Đang Online
                </div>
            </div>
        </div>

    </div>

  <script type="module" src="../assets/js/layout/selectplay.js"></script>

   
</body>

</html>