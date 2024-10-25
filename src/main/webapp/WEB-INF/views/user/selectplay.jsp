<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>

<head>
    <title>Chess Online</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet" />
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background-image: url('../assets/img/background.jpg');
            color: #fff;
            display: flex;
            height: 100vh;
        }

        .sidebar {
            width: 200px;
            background-color: rgba(43, 43, 43, 0.4);
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .sidebar img {
            width: 150px;
            margin-bottom: 20px;
        }

        .sidebar a {
            color: #fff;
            text-decoration: none;
            margin: 10px 0;
            display: flex;
            align-items: center;
            font-size: 18px;
        }

        .sidebar a i {
            margin-right: 10px;
        }

        .sidebar .search {
            margin: 20px 0;
        }

        .sidebar .search input {
            width: 100%;
            padding: 10px;
            border: none;
            border-radius: 5px;
        }

        .sidebar .button {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            text-align: center;
            border-radius: 5px;
            cursor: pointer;
        }

        .sidebar .button.signup {
            background-color: #4CAF50;
            color: #fff;
        }

        .sidebar .button.login {
            background-color: #8BC34A;
            color: #fff;
        }

        .sidebar .footer {
            margin-top: auto;
            text-align: center;
        }

        .main-content {
            flex-grow: 1;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .main-content .chess-board {
            width: 400px;
            height: 400px;
            background-image: url('https://placehold.co/600x600');
            background-size: cover;
        }




        .container {
            width: 100%;
            max-width: 800px;
            margin: 0 auto;

            padding: 20px;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 0;
            width: 900px;

        }

        .header button {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;

        }


        .header .play-now {
            background-color: #D3BFA7;
            color: black;
        }

        .header .create-room {
            background-color: #D3BFA7;
            color: black;


        }

        .table {
            width: 900px;
            border-collapse: collapse;
            margin-top: 20px;
            height: 600px;
        }

        .table th,
        .table td {
            padding: 10px;
            text-align: center;

        }

        .table th {

            background-color: rgba(43, 43, 43, 0.1);
        }

        .table td {

            background-color: rgba(43, 43, 43, 0.1);
        }

        table tr {
            border: 1px solid black;
        }

        .table .room-id {
            background-color: rgba(43, 43, 43, 0.1);
            border-radius: 5px;
            padding: 10px;
        }

        .table .main-btn {
            background-color: red;
            color: white;
            border: none;
            border-radius: 5px;
            padding: 10px 20px;
            cursor: pointer;
        }

        .footer {
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 20px 0;
        }



        .profile {
            display: flex;
            align-items: center;
            padding: 10px 0;
        }

        .profile img {
            border-radius: 50%;
            margin-right: 10px;
        }



        .right-panel {
            width: 300px;
            background-color: rgba(43, 43, 43, 0.4);
            padding: 80px;
            display: flex;
            flex-direction: column;
            align-items: center;
            overflow-y: auto;
            /* Thêm thanh cuộn dọc */
            max-height: 100vh;
            /* Chiều cao tối đa để thanh cuộn xuất hiện khi nội dung vượt quá */
        }


        .right-panel .title {
            font-size: 45px;
            margin-bottom: 10px;
            text-align: center;
        }

        .right-panel .stats {
            font-size: 18px;
            margin-bottom: 20px;
            text-align: center;
        }

        .right-panel .button {
            width: 100%;
            padding: 20px;
            margin: 10px 0;
            text-align: center;
            border-radius: 5px;
            cursor: pointer;
            font-size: 18px;
        }

        .right-panel .button.play-online {
            background-color: #4CAF50;
            color: #fff;
        }

        .right-panel .button.play-bots {
            background-color: #3E3E3E;
            color: #fff;
        }



        .right-panel::-webkit-scrollbar {
            width: 8px;
        }

        .right-panel::-webkit-scrollbar-thumb {
            background-color: #000;
            border-radius: 4px;
        }

        .player {
            display: flex;
            align-items: center;
            padding: 10px;
            border-bottom: 1px solid #444;
            width: 100%;
        }

        .player:last-child {
            border-bottom: none;
        }

        .player img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-right: 10px;
        }

        .player .info {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
        }

        .player .info .name {
            font-size: 14px;
            font-weight: bold;
        }

        .player .info .rating {
            font-size: 12px;
            color: #ccc;
        }

        .player .status {
            font-size: 12px;
            color: #ccc;

        }

        .player .status.online {
            color: #00ff00;

        }

        .player .status.playing {
            color: #ff0000;
        }

        .player .flag {
            width: 20px;
            height: 15px;
            margin-left: 5px;
        }

        .player .title {
            background-color: #ff0000;
            color: #ffffff;
            padding: 2px 4px;
            border-radius: 3px;
            font-size: 12px;
            margin-right: 5px;
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

        .popup-create-room {
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

        .popup-create-room h2,
        .popup-create-room p {
            color: white;
        }

        .popup-create-room button {
            padding: 10px;
            background-color: white;
            border: none;
            cursor: pointer;
        }




        .container1 {
            max-width: 600px;
            margin: 0 auto;
            background-color: #302E2B;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        }

        .header1 {
            font-size: 24px;
            margin-bottom: 20px;
        }

        .button-group1 {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }

        .button-group1 button {
            background-color: #D3BFA7;
            border: none;
            padding: 10px 20px;
            color: black;
            font-size: 16px;
            border-radius: 5px;
            cursor: pointer;
        }

        .button-group1 button.active {
            background-color: #D3BFA7;
        }

        .section {
            margin-bottom: 20px;
        }

        .section-title {
            font-size: 18px;
            margin-bottom: 10px;
        }

        .betting-box,
        .time-box {
            background-color: #5a4a3a;
            padding: 10px;
            border-radius: 5px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .betting-box span,
        .time-box span {
            font-size: 16px;
        }

        .betting-box .value,
        .time-box .value {
            font-size: 18px;
            font-weight: bold;
        }

        .control-buttons {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
        }

        .control-buttons button {
            background-color: #7a6a5a;
            border: none;
            padding: 10px;
            color: #d3b18a;
            font-size: 16px;
            border-radius: 5px;
            cursor: pointer;
        }

        .create-button1 {
            background-color: #b37a3a;
            border: none;
            padding: 15px 30px;
            color: #3a2a1a;
            font-size: 18px;
            font-weight: bold;
            border-radius: 5px;
            cursor: pointer;
        }

        .close-popup {


            background-color: #a67c52;
            border: none;
            border-radius: 5px;
            height: 50px;
            color: black;
            cursor: pointer;
            width: 200px;
            font-size: 18px;
            margin-left: -20px;
        }


        .taoban {
            position: relative;
            display: inline-block;

        }




        .extra-buttons {
            display: flex;
            position: absolute;
            bottom: 40px;
            /* Hiển thị ở phía trên */
            left: 50%;
            transform: translateX(-50%);
            text-align: center;
        }

        .extra-buttons button {
            display: block;
            width: 100px;
            margin: 5px 0;
            padding: 8px;
            background-color: #2ecc71;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        .taoban:hover .extra-buttons {
            display: flex;
        }

        /* Để các nút hiển thị mượt mà */
        .extra-buttons {
            transition: opacity 0.3s ease;
            opacity: 0;
            gap: 10px;
            /* Khoảng cách giữa các nút */
        }

        .taoban:hover .extra-buttons {
            opacity: 1;
        }



        .search{
            margin-right: 20px;
        }

        .search-room {
            display: flex;
            align-items: center;
           
        }

        .search-room input {
            padding: 8px;
            font-size: 16px;
            width: 200px;
            border: 1px solid #ccc;
            border-radius: 4px;
            margin-right: 20px;
        }

        .search-room button {
            padding: 8px 12px;
            
            font-size: 16px;
            cursor: pointer;
            border: none;
            background-color: #4CAF50;
            color: white;
            border-radius: 4px;
        }

      

       
    </style>
</head>

<body>
    <div id="overlay"></div>
    <div id="popup-create-room" class="popup-create-room">
        <div class="container1">
            <div class="header1">Chơi với bạn</div>
         
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

        <button id="close-popup" class="close-popup">Đóng</button>
    </div>






    <div class="sidebar">
        <img alt="Chess.com logo"
            src="https://oaidalleapiprodscus.blob.core.windows.net/private/org-LmQ09WWGIGwOeeA4ArnRw0x5/user-uJPET5fjNenSso8wCETWVNOp/img-Qd3FxrBNS31HwV7wA9Aaf7S0.png?st=2024-09-17T11%3A18%3A12Z&se=2024-09-17T13%3A18%3A12Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-09-16T23%3A13%3A37Z&ske=2024-09-17T23%3A13%3A37Z&sks=b&skv=2024-08-04&sig=peMWZS7vf0zeUn%2BBgo9S5KlpoZNddHeADtofLdDYA7s%3D"
            width="150" height="50" />
        <a href="/chess/public/playonl"><i class="fas fa-chess"></i> Play Online</a>
        <a href="/chess/public/playbot"><i class="fas fa-puzzle-piece"></i> Play Computer</a>

        <div class="search">
            <input type="text" placeholder="Search" />
        </div>
        <button id="form-signup" class="button signup">Sign Up</button>
        <button id="form-login" class="button login">Log In</button>
        <div class="footer">
            <a href="#">English</a><br />
            <a href="#">Support</a>
        </div>

    </div>
    <div class="main-content">
        <div class="container">
            <div class="header">
                <div class="search-room">
                    <button class="search" onclick="searchRoom()">Tìm kiếm</button>
                    <input type="text" id="searchInput" placeholder="Nhập ID ....">

                </div>


                <button id="btn_create" class="create-room">
                    TẠO BÀN
                </button>
            </div>
            <table class="table">
                <thead>
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
                        <!-- <th>
                            Mức cược
                        </th> -->
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
                            ❤️❤️
                        </td>
                        <!-- <td>
                            150k
                        </td> -->
                        <td>

                            <div class="taoban">
                                <button class="main-btn">Lựa chọn</button>

                                <div class="extra-buttons">
                                    <button class="view-btn">Xem</button>
                                    <button class="join-btn">Tham gia</button>
                                </div>
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
                            ❤️❤️
                        </td>
                        <!-- <td>
                            100K
                        </td> -->
                        <td>
                            <div class="taoban">
                                <button class="main-btn">Lựa chọn</button>

                                <div class="extra-buttons">
                                    <button class="view-btn">Xem</button>
                                    <button class="join-btn">Tham gia</button>
                                </div>
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
                            ❤️❤️
                        </td>
                        <!-- <td>
                            50K
                        </td> -->
                        <td>

                            <div class="taoban">
                                <button class="main-btn">Lựa chọn</button>

                                <div class="extra-buttons">
                                    <button class="view-btn">Xem</button>
                                    <button class="join-btn">Tham gia</button>
                                </div>
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
                            ❤️❤️
                        </td>
                        <!-- <td>
                            200K
                        </td> -->
                        <td>

                            <div class="taoban">
                                <button class="main-btn">Lựa chọn</button>

                                <div class="extra-buttons">
                                    <button class="view-btn">Xem</button>
                                    <button class="join-btn">Tham gia</button>
                                </div>
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
                            ❤️❤️
                        </td>
                        <!-- <td>
                            200K
                        </td> -->
                        <td>
                            <div class="taoban">
                                <button class="main-btn">Lựa chọn</button>

                                <div class="extra-buttons">
                                    <button class="view-btn">Xem</button>
                                    <button class="join-btn">Tham gia</button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="profile">
                <img alt="Profile picture" height="50"
                    src="https://oaidalleapiprodscus.blob.core.windows.net/private/org-LmQ09WWGIGwOeeA4ArnRw0x5/user-uJPET5fjNenSso8wCETWVNOp/img-8k6LCoeVAXbV6WRD9IdPTd7q.png?st=2024-09-17T11%3A46%3A03Z&amp;se=2024-09-17T13%3A46%3A03Z&amp;sp=r&amp;sv=2024-08-04&amp;sr=b&amp;rscd=inline&amp;rsct=image/png&amp;skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&amp;sktid=a48cca56-e6da-484e-a814-9c849652bcb3&amp;skt=2024-09-16T23%3A06%3A35Z&amp;ske=2024-09-17T23%3A06%3A35Z&amp;sks=b&amp;skv=2024-08-04&amp;sig=hYKAyAU15ZUSQTBhKIzOf%2Br7LQ8NH%2BiQ45d8iXtOUwo%3D"
                    width="50" />
                <div>
                    <div>
                        Binh
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

    <script>

        document.getElementById("btn_create").onclick = function () {
            document.getElementById("overlay").style.display = "block";
            document.getElementById("popup-create-room").style.display = "block";
        };

        document.getElementById("close-popup").onclick = function () {
            document.getElementById("overlay").style.display = "none";
            document.getElementById("popup-create-room").style.display = "none";
        };




        document.getElementById("form-login").onclick = function () {
            window.location.href = 'login.html';
        };
        document.getElementById("form-signup").onclick = function () {
            window.location.href = 'sign up.html';
        };
        document.getElementById("playonline").onclick = function () {
            window.location.href = 'playonline.html';
        };
        document.getElementById("playbots").onclick = function () {
            window.location.href = 'playbots.html';
        };





        function changeBet(amount) {
            let betValue = document.getElementById('bet-value');
            let winValue = document.getElementById('win-value');
            let currentBet = parseInt(betValue.textContent);
            let currentWin = parseInt(winValue.textContent);
            currentBet += amount;
            currentWin += amount * 2;
            if (currentBet >= 0) {
                betValue.textContent = currentBet;
                winValue.textContent = currentWin;
            }
        }

        function changeTime(type, amount) {
            let timeElement;
            let currentValue;
            if (type === 'game') {
                timeElement = document.getElementById('game-time');
                currentValue = parseInt(timeElement.textContent.split("'")[0]);
                currentValue += amount;
                if (currentValue >= 0) {
                    timeElement.textContent = currentValue + "'/ván";
                }
            } else if (type === 'move') {
                timeElement = document.getElementById('move-time');
                currentValue = parseInt(timeElement.textContent.split("s")[0]);
                currentValue += amount;
                if (currentValue >= 0) {
                    timeElement.textContent = currentValue + "s/nước";
                }
            } else if (type === 'increment') {
                timeElement = document.getElementById('increment-time');
                currentValue = parseInt(timeElement.textContent.split("s")[0]);
                currentValue += amount;
                if (currentValue >= 0) {
                    timeElement.textContent = currentValue + "s lũy tiến";
                }
            }
        }

    </script>
</body>

</html>