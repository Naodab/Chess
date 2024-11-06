import logout from "../account/logout.js";
import changePassword from "../account/changePassword.js";
import {getUsers} from "./api/user.js";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const init = {
    navbar: {
        list: [
            {
                name: "Quản lý tài khoản",
                icon: "fa-solid fa-users-viewfinder"
            },
            {
                name: "Quản lý thành tựu",
                icon: "fa-solid fa-star"
            },
            {
                name: "Quản lý trận đấu",
                icon: "fa-solid fa-chess"
            },
        ],
        activeIndex: 0
    },
    activity: {
        list: [
            {
                name: "Đăng xuât",
                icon: "fa-solid fa-right-from-bracket"
            },
            {
                name: "Thay đổi mật khẩu",
                icon: "fa-solid fa-key"
            }
        ],
        active: false
    },
    modal: {
        changePassword: {
            groups: [
                {
                    name: "oldPassword",
                    label: "Mật khẩu cũ",
                    placeHolder: "Nhập mật khẩu cũ",
                    value: "",
                    canSee: false
                },
                {
                    name: "newPassword",
                    label: "Mật khẩu mới",
                    placeHolder: "Nhập mật khẩu mới",
                    value: "",
                    canSee: false
                },
                {
                    name: "preNewPassword",
                    label: "Nhập lại mật khẩu mới",
                    placeHolder: "Nhập lại mật khẩu mới",
                    value: "",
                    canSee: false
                }
            ],
            errorMessage: "",
            icon: {
                canSee: "fa-solid fa-eye-slash",
                cantSee: "fa-solid fa-eye"
            }
        },
        notify: {
            message: ""
        },
        activeModal: ""
    },
    content: {
        account: {
            id: "content__account",
            dataList: [
                {
                    title: "Số lượng",
                    quantity: 0,
                    description: "",
                    icon: "fa-solid fa-chart-bar",
                    color: "closure--first"
                },
                {
                    title: "Trực tuyến",
                    quantity: 0,
                    description: "",
                    icon: "fa-solid fa-earth-americas",
                    color: "closure--second"
                },
                {
                    title: "Lượng truy cập",
                    quantity: 0,
                    description: "",
                    icon: "fa-solid fa-circle-play",
                    color: "closure--third"
                },
                {
                    title: "Thành viên mới trong tháng",
                    quantity: 0,
                    description: "",
                    icon: "fa-solid fa-person-circle-plus",
                    color: "closure--fourth"
                },
            ],
            activeIndex: 0,
            detail: {
                chart: {
                    id: "account__chart",
                    name: "Biểu đồ: "
                },
                table: {
                    id: "account__table",
                    columns: [
                        {
                            title: "Mã",
                            width: "20%",
                            first: true
                        },
                        {
                            title: "Tài khoản",
                            width: "15%"
                        },
                        {
                            title: "Email",
                            width: "20%"
                        },
                        {
                            title: "Mức độ truy cập",
                        },
                        {
                            title: "Elo",
                            width: "5%",
                            center: true
                        },
                        {
                            title: "Số trận đấu",
                            width: "10%",
                            center: true,
                            last: true
                        }
                    ],
                    rows: []
                },
                activeDetail: "chart"
            },
        },
        achievement: {

        },
        match: {

        },
        activeItem: "account"
    },
    avatar: "../assets/img/avatar/1.jpg",
}

function saveDataPasswordChangeModal (modal) {
    modal.changePassword.groups[0].value = $(`#${modal.changePassword.groups[0].name}`).value;
    modal.changePassword.groups[1].value = $(`#${modal.changePassword.groups[1].name}`).value;
    modal.changePassword.groups[2].value = $(`#${modal.changePassword.groups[2].name}`).value;
}

const actions = {
    changeOption: ({navbar}, index) => {
        navbar.activeIndex = index;
    },
    closeModal: ({ modal }) => {
        modal.activeModal = "";
    },
    changeDetail: ({ content }) => {
        let detail = content[content.activeItem].detail;
        detail.table.rows = [];
        getUsers(window.token).then(data => {
            console.log(data);
            data.forEach(user => detail.table.rows.push(user));
            detail.activeDetail = "table";
            dispatch('rerender');
        });
    },
    executeActivity: ({modal}, index) => {
        if (index === 0) logout(window.token);
        else if (index === 1) {
            modal.activeModal = "changePassword";
        }
    },
    openActivityList: ({activity}) => {
        activity.active = !activity.active;
    },
    submitChangePassword: ({modal}) => {
        saveDataPasswordChangeModal(modal);
        const oldPassword = modal.changePassword.groups[0].value;
        const newPassword = modal.changePassword.groups[1].value;
        const preNewPassword = modal.changePassword.groups[2].value;

        if (newPassword === preNewPassword) {
            changePassword(window.token, oldPassword, newPassword).then(r => {
                if (r) {
                    modal.notify.message = "Thay đổi mật khẩu thành công";
                    modal.activeModal = "notify";
                } else {
                    modal.changePassword.errorMessage = "Mật khẩu cũ không chính xác!";
                }
                dispatch('rerender');
            }).catch(error => {
                modal.changePassword.errorMessage = "Mật khẩu cũ không chính xác!";
                dispatch('rerender');
            });
        } else {
            modal.changePassword.errorMessage = "Mật khẩu nhập lại không chính xác!";
        }
    },
    turnOnSee: ({modal}, index) => {
        saveDataPasswordChangeModal(modal);
        modal.changePassword.groups[index].canSee = !modal.changePassword.groups[index].canSee;
    },
    rerender: () => {}
}

export default function reducer(state = init, action, args) {
    actions[action] && actions[action](state, ...args);
    return state;
}