import { OVERLAY } from "../helper/constants.js";

const $ = document.querySelector.bind(document);

function html([first, ...strings], ...values) {
    return values.reduce(
        (acc, cur) => acc.concat(cur, strings.shift()),
        [first]
    )
        .filter(x => x && x !== true || x === 0)
        .join('');
}

function renderMessage(user, message) {
    return html`
        <div class="message__avatar"
             style="background: url('${user.avatar}') no-repeat center center / cover">
        </div>
        <div class="chat closure">${message}</div>
        <div class="chat-username">${user.username}</div>
    `;
}

function renderConfirmModal(message) {
    return html`
        <div class="modal closure active" id="update-avatar">
            <h1 class="modal__title">Thông báo</h1>
            <i class="fa-solid fa-xmark btn-icon btn-close" id="back"></i>
            <div class="main-modal">
                <h3 class="modal__elo modal-item">${message}</h3>
                <div class="modal__function top--margin">
                    <div class="btn btn--green modal__btn" id="yes">Có</div>
                    <div class="btn btn--pink modal__btn" id="no">Không</div>
                </div>
            </div>
        </div>
    `;
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

function renderWaitModal(message) {
    return html`
        <div class="modal closure active" id="alert-message">
            <h1 class="modal__title">Thông báo</h1>
            <i class="fa-solid fa-xmark btn-icon btn-close" id="back"></i>
            <div class="main-modal">
                <h3 class="modal__elo modal-item">${message || "Chờ người chơi khác sẵn sàng"}</h3>
            </div>
        </div>
    `;
}

function alertMessage(message) {
    turnOnOverlay(alertModal, message);

    $("#confirm").onclick =  function () {
        turnOffOverlay();
    }
}

function innerStepContainer(step, index) {
    return html`
        <div class="step-index">${Math.floor(index / 2) + 1}</div>
        <div class="step-container">
            <div class="step">${step.name}</div>
        </div>
        <div class="step-container">
            <div class="step"></div>
        </div>
    `;
}

function innerStepAvatar(avatar) {
    return html`
        <div class="step-index">avatar</div>
        <div class="step-container">
            <div class="step-avatar" style="background: url('${avatar}')
                no-repeat center center / cover;"></div>
        </div>
        <div class="step-container">
            <div class="step-avatar" style="background: url('../assets/img/robot.png')
                no-repeat center center / cover;"></div>
        </div>
    `;
}

function turnOnOverlay(renderFunction, arg) {
    OVERLAY.style.zIndex = "100";
    OVERLAY.innerHTML = renderFunction(arg);

    $("#back").onclick =  function () {
        turnOnOverlay();
    };
}

function turnOffOverlay() {
    OVERLAY.innerHTML = "";
    OVERLAY.style.zIndex = "-10";
}

function turnOnGameModal(selector) {
    $(".ready-container").classList.add("active");
    $(selector).classList.add("active");
}

function turnOffGameModal(selector) {
    $(".ready-container").classList.remove("active");
    $(selector).classList.remove("active");
}

let confirmResolve;
function confirm(message) {
    turnOnOverlay(renderConfirmModal, message);

    $("#yes").addEventListener("click", function () {
        resolveConfirm(true);
    });

    $("#no").addEventListener("click", function () {
        resolveConfirm(false);
    });

    $("#back").onclick =  function () {
        resolveConfirm(false);
    };

    return new Promise(resolve => {
        confirmResolve = resolve;
    });
}

function resolveConfirm(isConfirmed) {
    OVERLAY.innerHTML = "";
    turnOffOverlay();
    confirmResolve(isConfirmed);
}

export {
    renderWaitModal,
    renderMessage,
    renderConfirmModal,
    turnOnGameModal,
    turnOffGameModal,
    turnOnOverlay,
    turnOffOverlay,
    innerStepAvatar,
    innerStepContainer,
    confirm,
    alertMessage
}