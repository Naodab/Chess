function html([first, ...strings], ...values) {
    return values.reduce(
        (acc, cur) => acc.concat(cur, strings.shift()),
        [first]
    )
        .filter(x => x && x !== true || x === 0)
        .join('');
}

function alertModal(message) {
    return html`
        <div class="modal closure active" id="alert-message">
            <h1 class="modal__title">Thông báo</h1>
            <i class="fa-solid fa-xmark btn-icon btn-close" id="back"></i>
            <div class="main-modal">
                <h3 class="modal__elo modal-item">${message}</h3>
                <div class="modal__function top--margin">
                    <div class="btn btn--green modal__btn" id="confirm">OK</div>
                </div>
            </div>
        </div>
    `;
}

function renderLoading() {
    return html`
        <div class="modal closure active" id="update-avatar">
            <h1 class="modal__title">Đang tải</h1>
            <div class="main-modal">
                <div class="loading-container">
                    <div class="circle-loading"></div>
                    <div class="circle-loading"></div>
                </div>
            </div>
        </div>
    `;
}
function renderWaitingForOthers() {
    return html`
        <div class="modal closure active" id="update-avatar">
            <h1 class="modal__title">Chờ đợi</h1>
            <div class="main-modal">
                <div class="loading-container">
                    <div class="circle-loading"></div>
                    <div class="circle-loading"></div>
                </div>
                <div class="modal__function top--margin">
                    <div class="btn btn--pink modal__btn" id="cancel">Hủy</div>
                </div>
            </div>
        </div>
    `;
}


function renderPlayerInformation(player) {
    return html`
        <div class="player-information alliance-${player.color}">
            <div class="player-avatar"
                 style="background: url('${player.avatar}') no-repeat center center / cover;')">
            </div>
            <div class="player-username">${player.username}</div>
        </div>
    `;
}

function renderMatch(match) {
    return html`
        <div class="match" data-id="${match.id}">
            ${renderPlayerInformation(match.me)}
            <div class="match-state-container">
                <div class="match-state match-state-item">${match.state}</div>
                <div class="match-details match-state-item">Xem chi tiết</div>
            </div>
            ${renderPlayerInformation(match.opponent)}
        </div>
    `;
}

function renderMatches(matches) {
    return html`${matches.map(match => renderMatch(match))}`
}

function renderModalMatches(data) {
    const pages = [];
    for (let i = 0; i <= Math.floor(data.size / 8); i++) {
        pages.push(i);
    }
    return html`
        <div class="modal closure active" id="info-user">
            <h1 class="modal__title">Trận đấu</h1>
            <i class="fa-solid fa-xmark btn-icon btn-close" id="back"></i>
            <div class="main-modal">
                <div class="matches-container">
                    ${renderMatches(data.matches)}
                </div>
                <div class="pages-container">
                    ${
                        pages.map((page) => html`
                            <div class="page" data-page="${page}">${page + 1}</div>
                        `)
                    }
                </div>
            </div>
        </div>
    `;
}

function renderAboutUs() {
    return html`
        <div class="modal closure active" id="about-us">
            <h1 class="modal__title">Giới thiệu</h1>
            <i class="fa-solid fa-xmark btn-icon btn-close" id="back"></i>
            <div class="main-modal modal-info">
                Chào mừng bạn đến với trò chơi cờ vua trực tuyến!
                Trò chơi cờ vua trực tuyến mang đến cho bạn một sân chơi đầy thú vị, nơi trí tuệ và chiến lược được đặt lên hàng đầu. 
                Đây không chỉ là một trò chơi giải trí mà còn là một môn nghệ thuật chiến thuật,
                nơi từng nước đi đều chứa đựng sự cân nhắc và tính toán. Tham gia nền tảng của chúng tôi,
                bạn sẽ được hòa mình vào một cộng đồng người chơi đông đảo,
                từ những người mới bắt đầu đầy đam mê cho đến các kỳ thủ chuyên nghiệp dày dặn kinh nghiệm
                bạn có thể thử thách bản thân, rèn luyện tư duy, hoặc đơn giản là tận hưởng những phút giây thư giãn.
                Với giao diện đẹp mắt, hệ thống cá nhân hóa đa dạng, trò chơi cờ vua trực tuyến của chúng tôi chắc chắn sẽ là nơi để bạn khám phá, chinh phục,và khẳng định
                bản thân.
                Hãy cùng bước vào thế giới cờ vua, nơi mọi nước đi đều là cơ hội để bạn tỏa sáng!
            </div>
        </div>
    `;
}

function renderPersonalInformation(user) {
    return html`
        <div class="modal closure active" id="info-user">
            <h1 class="modal__title">Thông tin cá nhân</h1>
            <i class="fa-solid fa-xmark btn-icon btn-close" id="back"></i>
            <div class="main-modal">
                <img src="${user.avatar}" alt="avatar" class="modal__avatar">
                <h2 class="modal__username modal-item">${user.username}</h2>
                <h4 class="modal__email modal-item">${user.rank}</h4>
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
            ${ sessionStorage.getItem("USERNAME") === user.username && html`
                <div class="modal__function">
                    <div class="modal__btn btn matches-history">Ván đấu</div>
                </div>
            `}
        </div>
    `;
}

function renderUpdateAvatar(oldAvatar) {
    return html`
        <div class="modal closure active" id="update-avatar">
            <h1 class="modal__title">Thay đổi ảnh đại diện</h1>
            <i class="fa-solid fa-xmark btn-icon btn-close" id="back"></i>
            <div class="error-message"></div>
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

function renderRoom(room) {
    return html`
        <td>${room.id}</td>
        <td>${room.time} phút</td>
        <td class="room-people">${room.people}</td>
        <td>
            <div class="room-role-list">
                <div class="btn btn--pink room-role-item" id="join-a-room-as-player">
                    Tham gia
                </div>
                <div class="btn btn--pink room-role-item" id="join-a-room-as-viewer">
                    Xem
                </div>
            </div>
        </td>
    `;
}

function renderCreateRoom() {
    return html`
        <div class="modal closure active" id="create-room-form">
            <h1 class="modal__title">Tạo phòng</h1>
            <i class="fa-solid fa-xmark btn-icon btn-close" id="back"></i>
            <div class="main-modal">
                <div class="form-selection-container modal-item">
                    <label>Thời gian:</label>
                    <div class="time-container">
                        <div class="time active" data-value="3">3 phút</div>
                        <div class="time" data-value="5">5 phút</div>
                        <div class="time" data-value="10">10 phút</div>
                        <div class="time" data-value="15">15 phút</div>
                        <div class="time" data-value="30">30 phút</div>
                    </div>
                </div>
                <div class="password-item">
                    <label for="oldPassword" class="modal__label">Mật khẩu phòng</label>
                    <div class="password-container">
                        <input type="password" id="roomPassword" class="password__input"
                               placeholder="Để trống nếu không cần thiết">
                        <i class="fa-solid fa-eye on"></i>
                        <i class="fa-solid fa-eye-slash off"></i>
                    </div>
                </div>
                <div class="modal__function top--margin">
                    <div class="btn btn--green modal__btn" id="confirm-create-room">Tạo phòng</div>
                    <div class="btn btn--pink modal__btn" id="cancel">Hủy</div>
                </div>
            </div>
        </div>
    `;
}

function renderTopUser(user, rank) {
    return html`
        <div class="player__info">
            <div class="info__avatar"
                 style="background: url('${user.avatar}') no-repeat center center / cover;"></div>
            <div class="personal__info">
                <h3 class="info__username">${user.username}(${user.elo})</h3>
                <div class="info__rank">${user.rank}</div>
            </div>
        </div>
        <div class="player__rank">${rank}</div>
    `;
}

function renderFindRoom() {
    return html`
        <div class="modal closure active" id="find-room">
            <h1 class="modal__title">Tìm phòng</h1>
            <i class="fa-solid fa-xmark btn-icon btn-close" id="back"></i>
            <div class="error-message"></div>
            <div class="main-modal">
                <div class="password-item">
                    <label for="idRoom" class="modal__label">Mã phòng</label>
                    <div class="password-container">
                        <input type="text" id="idRoom" class="password__input"
                               placeholder="Nhập mã phòng">
                    </div>
                </div>
                <div class="password-item">
                    <label for="oldPassword" class="modal__label">Mật khẩu phòng</label>
                    <div class="password-container">
                        <input type="password" id="roomPassword" class="password__input"
                               placeholder="Để trống nếu không cần thiết">
                        <i class="fa-solid fa-eye on"></i>
                        <i class="fa-solid fa-eye-slash off"></i>
                    </div>
                </div>
                <div class="modal__function top--margin">
                    <div class="btn btn--green modal__btn" id="confirm-enter-room-player">Vào chơi</div>
                    <div class="btn btn--yellow modal__btn" id="confirm-enter-room-viewer">Vào xem</div>
                    <div class="btn btn--pink modal__btn" id="cancel">Hủy</div>
                </div>
            </div>
        </div>
    `;
}

function renderEnterRoomWithPassword() {
    return html`
        <div class="modal closure active" id="password-to-enter-room">
            <h1 class="modal__title">Nhập mật khẩu phòng</h1>
            <i class="fa-solid fa-xmark btn-icon btn-close" id="back"></i>
            <div class="error-message"></div>
            <div class="main-modal">
                <div class="password-item">
                    <label for="idRoom" class="modal__label">Mã phòng</label>
                    <div class="password-container">
                        <input type="text" id="idRoom" class="password__input"
                               placeholder="Nhập mã phòng">
                    </div>
                </div>
                <div class="password-item">
                    <label for="oldPassword" class="modal__label">Mật khẩu phòng</label>
                    <div class="password-container">
                        <input type="password" id="roomPassword" class="password__input"
                               placeholder="Để trống nếu không cần thiết">
                        <i class="fa-solid fa-eye on"></i>
                        <i class="fa-solid fa-eye-slash off"></i>
                    </div>
                </div>
                <div class="modal__function top--margin">
                    <div class="btn btn--green modal__btn" id="enter-room">Vào</div>
                    <div class="btn btn--pink modal__btn" id="cancel">Hủy</div>
                </div>
            </div>
        </div>
    `;
}

export {
    alertModal,
    renderPersonalInformation,
    renderUpdateAvatar,
    renderConfirm,
    renderChangePassword,
    renderRoom,
    renderCreateRoom,
    renderTopUser,
    renderFindRoom,
    renderEnterRoomWithPassword,
    renderLoading,
    renderModalMatches,
    renderMatches,
    renderWaitingForOthers,
    renderAboutUs
}