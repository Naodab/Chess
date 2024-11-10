function html([first, ...strings], ...values) {
    return values.reduce(
        (acc, cur) => acc.concat(cur, strings.shift()),
        [first]
    )
        .filter(x => x && x !== true || x === 0)
        .join('');
}

function renderPersonalInformation(user) {
    return html`
        <div class="modal closure" id="info-user">
            <h1 class="modal__title">Thông tin cá nhân</h1>
            <i class="fa-solid fa-xmark btn-icon btn-close" id="back"></i>
            <div class="main-modal">
                <img src="${user.avatar}" alt="avatar" class="modal__avatar">
                <h2 class="modal__username modal-item">${user.username}</h2>
                <h3 class="modal__elo modal-item">${user.elo}</h3>
                <div class="modal__numbers modal-item">
                    <div class="number-item closure closure--green">
                        <div class="number__title">THẮNG</div>
                        ${user.winNumber}
                    </div>
                    <div class="number-item closure closure--blue">
                        <div class="number__title">HÒA</div>
                        ${user.drawNumber}
                    </div>
                    <div class="number-item closure closure--pink end">
                        <div class="number__title">THUA</div>
                        ${user.battleNumber - user.winNumber - user.drawNumber}
                    </div>
                </div>
            </div>
            <div class="achievements-container modal-item">

            </div>
            <div class="modal__function">
                <div class="modal__btn btn">Ván đấu</div>
                <div class="modal__btn btn">Cập nhật</div>
            </div>
        </div>
    `;
}

function renderUpdateAvatar(oldAvatar) {
    return html`
        <div class="modal closure active" id="update-avatar">
            <h1 class="modal__title">Thay đổi ảnh đại diện</h1>
            <i class="fa-solid fa-xmark btn-icon btn-close" id="back"></i>
            <div class="main-modal">
                <img src="${oldAvatar}"
                     alt="avatar" class="modal__avatar" id="img-update">
                <div class="modal__function top--margin">
                    <label class="btn modal__btn" for="avatarInput">Tải ảnh lên</label>
                    <input type="file" class="btn modal__btn" id="avatarInput" accept="image/*">
                    <div class="btn modal__btn" id="accept-update-avatar">Thay dổi</div>
                </div>
            </div>
        </div>
    `;
}

function renderConfirm(message) {
    return html`
        <div class="modal closure active" id="update-avatar">
            <h1 class="modal__title">Thông báo</h1>
            <i class="fa-solid fa-xmark btn-icon btn-close" id="back"></i>
            <div class="main-modal">
                <h3 class="modal__elo modal-item">${message}</h3>
                <div class="modal__function top--margin">
                    <div class="btn btn--green modal__btn" id="yes"">Có</div>
                    <div class="btn btn--pink modal__btn" id="no"">Không</div>
                </div>
            </div>
        </div>
    `;
}

function renderChangePassword() {
    return html`
        <div class="modal closure active" id="change-password">
            <h1 class="modal__title">Thay đổi mật khẩu</h1>
            <i class="fa-solid fa-xmark btn-icon btn-close" id="back"></i>
            <div class="error-message"></div>
            <div class="main-modal">
                <div class="password-item">
                    <label for="oldPassword" class="modal__label">Mật khẩu cũ</label>
                    <div class="password-container">
                        <input type="password" id="oldPassword" class="password__input" placeholder="Mật khẩu cũ">
                        <i class="fa-solid fa-eye on"></i>
                        <i class="fa-solid fa-eye-slash off"></i>
                    </div>
                </div>
                <div class="password-item">
                    <label for="oldPassword" class="modal__label">Mật khẩu cũ</label>

                    <div class="password-container">
                        <input type="password" id="newPassword" class="password__input" placeholder="Mật khẩu mới">
                        <i class="fa-solid fa-eye on"></i>
                        <i class="fa-solid fa-eye-slash off"></i>
                    </div>
                </div>
                <div class="password-item">
                    <label for="oldPassword" class="modal__label">Mật khẩu cũ</label>
                    <div class="password-container">
                        <input type="password" id="preNewPassword" class="password__input"
                               placeholder="Nhập lại mật khẩu mói">
                        <i class="fa-solid fa-eye on"></i>
                        <i class="fa-solid fa-eye-slash off"></i>
                    </div>
                </div>
                <div class="modal__function top--margin">
                    <div class="btn btn--green modal__btn" id="confirm-change-password">Thay đổi</div>
                    <div class="btn btn--pink modal__btn" id="cancel">Hủy</div>
                </div>
            </div>
        </div>
    `;
}

export { renderPersonalInformation, renderUpdateAvatar, renderConfirm, renderChangePassword }