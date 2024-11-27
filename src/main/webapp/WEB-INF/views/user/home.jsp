<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Chess</title>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
	<link rel="stylesheet" href="../assets/css/user/base.css">
	<link rel="stylesheet" href="../assets/css/home.css">
</head>
<body>
<div id="overlay"></div>
<div id="coating"></div>
<div id="background"></div>
<div id="container">
	<div class="sidebar closure">
		<div class="sidebar-header">
			<img alt="Chess.com logo" src="../assets/img/icon.jpg" width="150" height="100" />
			<a href=""><i class="fas fa-chess"></i>Play Online</a>
			<a href=""><i class="fas fa-puzzle-piece"></i>Play Computer</a>
		</div>

		<div class="sidebar-body">
			<button class="btn btn--pink logout">Đăng xuất</button>
		</div>
		<a class="settings-link" id="about-us-btn">Thông tin</a>
	</div>

	<div class="main-content">
		<div class="content__body closure">
			<div class="body__header">
				<h1 class="content__title">Chào mừng trở lại <span></span></h1>
				<div class="header__avatar"
					 style='background: url("${user.avatar}") no-repeat center center / cover;'
					 id="activity-btn">
					<div class="activity-list closure">
						<a href="#" class="activity-item" id="see-my-information">
							<i class="fa-solid fa-circle-info activity__icon"></i>
							<span>Thông tin cá nhân</span>
						</a>
						<a href="#" class="activity-item" id="change-avatar-btn">
							<i class="fa-regular fa-image activity__icon"></i>
							<span>Thay đổi ảnh đại diện</span>
						</a>
						<a href="#" class="activity-item" id="change-password-btn">
							<i class="fa-solid fa-key activity__icon"></i>
							<span>Thay đổi mật khẩu</span>
						</a>
						<a href="#" class="activity-item logout">
							<i class="fa-solid fa-right-from-bracket activity__icon"></i>
							<span>Đăng xuất</span>
						</a>
					</div>
				</div>
			</div>
			<div class="rooms-container scrollable-element">
				<table class="rooms-table">
					<thead>
					<tr>
						<th>Phòng</th>
						<th>Thời gian</th>
						<th>Số người</th>
						<th>Trạng thái</th>
					</tr>
					</thead>
					<tbody class="rooms-list"></tbody>
				</table>
			</div>
		</div>
		<div class="content__footer closure">
			<div class="btn btn--green content__btn" id="create-room">Tạo phòng</div>
			<div class="btn btn--pink content__btn" id="find-room-btn">Tìm phòng</div>
			<div class="btn btn--yellow content__btn" id="play-random">Ngẫu nhiên</div>
			<div class="btn btn--blue content__btn" id="play-with-bot">Chơi với máy</div>
		</div>
	</div>

	<div class="leader-panel">
		<div class="leader-item introduce__label closure">
			<h1>Cờ vua online số 1</h1>
		</div>
		<div class="leader-item leader__board closure">
			<div class="leader__title">
				Top tuyển thủ
			</div>
			<div class="leader-container scrollable-element">
			</div>
		</div>
	</div>
</div>
<script>
	if ("${user.avatar}")
		sessionStorage.setItem("AVATAR", "${user.avatar}");
</script>
<script type="module" src="../assets/js/user/home.js"></script>
</body>
</html>