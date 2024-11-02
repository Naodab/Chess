

function replaceMainDiv1() {
    const mainDiv = document.getElementById("mainDiv");
      if (!mainDiv) {
        console.error("Không tìm thấy phần tử mainDiv");
        return;
    }
    mainDiv.innerHTML = `
   
    <div class="container9">
<h1>
    Bàn cờ và quân cờ
</h1>
<div class="form-group9">
    <label for="cac-quan-co">
        Các quân cờ
    </label>
    <select id="cac-quan-co">
        <option>
            Neo
        </option>
         <option>
            Đỏ
        </option>
         <option>
            Xanh
        </option>
    </select>
</div>
<div class="form-group9">
    <label for="ban-co">
        Bàn cờ
    </label>
    <select id="ban-co">
        <option>
            Xanh lá cây
        </option>
         <option>
            Vàng xanh
        </option>
         <option>
            Trắng xanh
        </option>
    </select>
</div>


</div>

`;
}



function replaceMainDiv() {
    const mainDiv = document.getElementById("mainDiv");
      if (!mainDiv) {
        console.error("Không tìm thấy phần tử mainDiv");
        return;
    }
    mainDiv.innerHTML = `
   
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
                        <input id="username" type="text" value="12binhbinh" />
                    </div>

                    <div class="form-group">
                        <label for="last-name">
                            Email
                        </label>
                        <input id="last-name" type="text" value="phuongbinh732004@gmail.com" />
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

`;
}




function replaceMainDiv2() {
    const mainDiv = document.getElementById("mainDiv");
      if (!mainDiv) {
        console.error("Không tìm thấy phần tử mainDiv");
        return;
    }
    mainDiv.innerHTML = `
<div class="container10">
    <div id="halloween" class="section halloween">
        <div class="section-title">Halloween</div>
        <div class="option">
            <img alt="Custom chess piece set 1" src="https://placehold.co/50x50" />
            <img alt="Custom chess piece set 2" src="https://placehold.co/50x50" />
        </div>
    </div>
    <div id="go" class="section go">
        <div class="section-title">Chủ đề gỗ</div>
        <div class="option selected">
            <img alt="Standard chess piece set 1" src="https://placehold.co/50x50" />
            <img alt="Standard chess piece set 2" src="https://placehold.co/50x50" />
        </div>
    </div>
    <div id="thuytinh" class="section thuytinh">
        <div class="section-title">Chủ đề thủy tinh</div>
        <div class="option">
            <img alt="Glass chess piece set 1" src="https://placehold.co/50x50" />
            <img alt="Glass chess piece set 2" src="https://placehold.co/50x50" />
        </div>
    </div>
    <div id="sky" class="section sky">
        <div class="section-title">Chủ đề Bầu Trời</div>
        <div class="option">
            <img alt="Sky chess piece set 1" src="https://placehold.co/50x50" />
            <img alt="Sky chess piece set 2" src="https://placehold.co/50x50" />
        </div>
    </div>
    <div id="space" class="section space">
        <div class="section-title">Chủ đề Không Gian</div>
        <div class="option">
            <img alt="Space chess piece set 1" src="https://placehold.co/50x50" />
            <img alt="Space chess piece set 2" src="https://placehold.co/50x50" />
        </div>
    </div>
</div>
`;

    // Gán sự kiện sau khi nội dung đã được thay đổi
    addSectionEventListeners();
}

function addSectionEventListeners() {
    // Định nghĩa các ảnh nền cho từng chủ đề
    const themes = {
        halloween: "../assets/img/halowend.png",
        go: "../assets/img/background.jpg",
        thuytinh: "../assets/img/thuytinh.jpg",
        sky: "../assets/img/sky.png",
        space: "../assets/img/space.png"
    };

    // Gán sự kiện click cho mỗi phần tử
    Object.keys(themes).forEach(themeId => {
        const section = document.getElementById(themeId);
        section.addEventListener("click", function () {
            document.body.style.backgroundImage = `url('${themes[themeId]}')`;
        });
    });
}




function replaceMainDiv3() {
    const mainDiv = document.getElementById("mainDiv");
      if (!mainDiv) {
        console.error("Không tìm thấy phần tử mainDiv");
        return;
    }
    mainDiv.innerHTML = `
     <div class="container11">
    <h1>Thay đổi mật khẩu</h1>
    <div class="form-group11">
    <label for="new-password">Mật khẩu mới</label>
    <div class="input-wrapper">
        <input type="password" id="new-password" class="password-input">
        <i class="fas fa-eye toggle-password"></i>
    </div>
</div>
<div class="form-group11">
    <label for="confirm-password">Nhập lại mật khẩu mới</label>
    <div class="input-wrapper">
        <input type="password" id="confirm-password" class="password-input">
        <i class="fas fa-eye toggle-password"></i>
    </div>
</div>

    <button class="btn11">Thay đổi mật khẩu</button>





</div>
`;
document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', function () {
        const passwordInput = this.previousElementSibling;

        // Kiểm tra và chuyển đổi giữa type "password" và "text"
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            this.classList.remove('fa-eye');
            this.classList.add('fa-eye-slash'); // Đổi icon để biểu thị mật khẩu đang hiển thị
        } else {
            passwordInput.type = 'password';
            this.classList.remove('fa-eye-slash');
            this.classList.add('fa-eye'); // Đổi lại icon về trạng thái ban đầu
        }
    });
});
}



