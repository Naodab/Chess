import logout from "../account/logout.js";
import changePassword from "../account/changePassword.js";
import {getUsers} from "./api/user.js";
import {getAccountData} from "./api/traffic.js";

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
        personalPage: {
            user: null,
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
                    recordSize: 0,
                    sortFields: [
                        {
                            name: "Tài khoản",
                            value: "username"
                        },
                        {
                            name: "Elo",
                            value: "elo"
                        },
                        {
                            name: "Số trận đấu",
                            value: "battleNumber"
                        }
                    ],
                    activeSort: 0,
                    activeSortType: 0,
                    lookupFields: [
                        {
                            name: "Tài khoản",
                            value: "username"
                        },
                        {
                            name: "Email",
                            value: "email"
                        },
                        {
                            name: "Elo",
                            value: "elo"
                        }
                    ],
                    activeLookup: 0,
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
                            title: "Tỉ lệ thắng",
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
        activeItem: "account",
        sortTypes: [
            {
                value: "asc",
                icon: "fa-solid fa-up-long",
            },
            {
                value: "desc",
                icon: "fa-solid fa-down-long"
            },
            {
                value: ""
            }
        ],
        sortFields: [],
        lookupFields: []
    },
    avatar: "../assets/img/avatar/1.jpg",
}

init.content.sortFields = init.content.account.detail.table.sortFields;
init.content.lookupFields = init.content.account.detail.table.lookupFields;

window.onload = () => {
    console.log(1)
    getAccountData().then(data => {
        init.content.account.dataList[0].quantity = data.userSize;
        init.content.account.dataList[1].quantity = data.onlineSize;
        init.content.account.dataList[2].quantity = data.trafficSize;
        init.content.account.dataList[3].quantity = data.newMemberSize;
        dispatch('rerender');
    })

    //TODO: draw do thi
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
        if (detail.activeDetail === "chart") {
            detail.table.rows = [];

            getUsers(window.token).then(data => {
                data.forEach(user => detail.table.rows.push(user));
                detail.activeDetail = "table";
                dispatch('rerender');
            });
        } else {
            detail.activeDetail = "chart";
        }
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
    openPersonalPage: ({ modal, content }, index) => {
        console.log(1)
        modal.activeModal = "personalPage";
        modal.personalPage.user = content.account.detail.table.rows[index];
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