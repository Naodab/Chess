import logout from "../account/logout.js";
import changePassword from "../account/changePassword.js";
import {getPageUsers, searchUser, countSearchUser } from "./api/user.js";
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
                    activeSort: "username",
                    activeSortType: "",
                    lookupValue: "",
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
                    rows: [],
                    detailPages: [],
                    activePage: 0
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

init.content.sortFields = init.content.account.detail.table.sortFields;
init.content.lookupFields = init.content.account.detail.table.lookupFields;

function createChart(ctx) {
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'Quantity',
                data: [10, 20, 15, 30, 25, 30, 20],
                borderColor: 'rgba(145, 221, 198, 1)',
                backgroundColor: 'rgba(145, 221, 198, 0.4)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#FCD39F'
                    }
                },
                x: {
                    ticks: {
                        color: '#FCD39F'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

window.onload = () => {
    getAccountData().then(data => {
        init.content.account.dataList[0].quantity = data.userSize;
        init.content.account.dataList[1].quantity = data.onlineSize;
        init.content.account.dataList[2].quantity = data.trafficSize;
        init.content.account.dataList[3].quantity = data.newMemberSize;
        dispatch('rerender');
    });
}

function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

const debounceSearch = debounce((state, searchStr, page,
                                 sortField, sortDirection) => {
    const table = state.content[state.content.activeItem].detail.table;
    table.activePage = 0;
    if (searchStr) {
        countSearchUser(searchStr).then(data => {
            table.detailPages = [];
            for (let i = 1; i <= Math.ceil(data / 10); i++) {
                table.detailPages.push(i);
            }
            dispatch('rerender');
        });
    } else {
        state.content[state.content.activeItem].detail.table.detailPages = [];
        let size = state.content[state.content.activeItem].dataList[0].quantity;
        for (let i = 1; i <= Math.ceil(size / 10); i++) {
            state.content[state.content.activeItem].detail.table.detailPages.push(i);
        }
    }

    searchUser(searchStr, page, sortField, sortDirection)
        .then(data => {
            table.rows = [];
            data.forEach(user => table.rows.push(user));
            dispatch('rerender');
        });
}, 500);

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
            detail.table.detailPages = [];
            let size = content[content.activeItem].dataList[0].quantity;
            for (let i = 1; i <= Math.ceil(size / 10); i++) {
                detail.table.detailPages.push(i);
            }

            getPageUsers(detail.table.activePage).then(data => {
                console.log(data)
                data.forEach(user => detail.table.rows.push(user));
                detail.activeDetail = "table";
                dispatch('rerender');
            });
        } else {
            detail.activeDetail = "chart";
        }
    },
    changeFieldSort: ({ content }, value) => {
        let table = content[content.activeItem].detail.table;
        table.activeSort = value;
        table.activePage = 0;
        if (!table.activeSortType) return;

        searchUser(table.lookupValue, table.activePage,
            table.activeSort, table.activeSortType)
            .then(data => {
                table.rows = [];
                data.forEach(user => table.rows.push(user));
                dispatch('rerender');
            });
    },
    changePage: ({ content }, index) => {
        let detail = content[content.activeItem].detail;
        if (!detail.table.lookupValue) {
            detail.table.activePage = index;
            getPageUsers(detail.table.activePage).then(data => {
                detail.table.rows = [];
                data.forEach(user => detail.table.rows.push(user));
                dispatch('rerender');
            });
        } else {
            let table = detail.table;
            table.activePage = index;

            searchUser(table.lookupValue, table.activePage,
                table.activeSort, table.activeSortType)
                .then(data => {
                    table.rows = [];
                    data.forEach(user => table.rows.push(user));
                    dispatch('rerender');
                });
        }
    },
    changeSortType: ({ content }, type) => {
        let table = content[content.activeItem].detail.table;
        if (type === table.activeSortType) return;
        table.activeSortType = type;

        searchUser(table.lookupValue, table.activePage,
            table.activeSort, table.activeSortType)
            .then(data => {
                table.rows = [];
                data.forEach(user => table.rows.push(user));
                dispatch('rerender');
            });
    },
    executeActivity: ({modal}, index) => {
        if (index === 0) logout(localStorage.getItem("TOKEN"));
        else if (index === 1) {
            modal.activeModal = "changePassword";
        }
    },
    lookupRecord: (state, searchStr) => {
        let table = state.content[state.content.activeItem].detail.table;
        table.lookupValue = searchStr;
        state.canRender = false;
        debounceSearch(state, searchStr, 0, table.activeSort, table.activeSortType);
    },
    openActivityList: ({activity}) => {
        activity.active = !activity.active;
    },
    openPersonalPage: ({ modal, content }, index) => {
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

export { createChart }