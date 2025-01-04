import logout from "../account/logout.js";
import changePassword from "../account/changePassword.js";
import {getPageUsers, searchUser, countSearchUser, banOrUnbanUser} from "./api/user.js";
import {getAccountData, getMatchData, getMatchDataChart, getTrafficRecently} from "./api/traffic.js";
import {getPageMatches} from "./api/match.js";

const $ = document.querySelector.bind(document);

const init = {
    navbar: {
        list: [
            {
                name: "Quản lý tài khoản",
                icon: "fa-solid fa-users-viewfinder"
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
            activeIndex: -1,
            detail: {
                chart: {
                    id: "account__chart",
                    name: "Biểu đồ: Lượt truy cập trong những ngày gần đây",
                    labels: [],
                    data: []
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
            id: "content__match",
            dataList: [
                {
                    title: "Số trận đấu online",
                    quantity: 0,
                    description: "",
                    icon: "fa-brands fa-battle-net",
                    color: "closure--first"
                },
                {
                    title: "Số trận đấu với máy",
                    quantity: 0,
                    description: "",
                    icon: "fa-solid fa-robot",
                    color: "closure--second"
                },
                {
                    title: "Số trận đấu trong tháng",
                    quantity: 0,
                    description: "",
                    icon: "fa-solid fa-calendar-week",
                    color: "closure--fourth"
                },
            ],
            activeIndex: -1,
            detail: {
                chart: {
                    id: "match__chart",
                    name: "Biểu đồ: Sự thay đổi số trận đấu trong những ngày gần đây",
                    labels: [],
                    data: [],
                },
                table: {
                    id: "match__table",
                    recordSize: 0,
                    columns: [
                        {
                            title: "Mã",
                            width: "15%",
                            first: true
                        },
                        {
                            title: "Thời gian",
                            width: "15%"
                        },
                        {
                            title: "Ngày chơi",
                            width: "20%",
                            center: true
                        },
                        {
                            title: "Người chơi trắng",
                        },
                        {
                            title: "Người chơi phải",
                            width: "20%",
                            center: true
                        },
                        {
                            title: "Chiến thắng",
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
            }
        },
        activeItem: "account"
    },
    chartRerender: false,
    avatar: avatar,
}

init.content.sortFields = init.content.account.detail.table.sortFields;
init.content.lookupFields = init.content.account.detail.table.lookupFields;

function createChart(ctx, {content}, animation = false,
                     borderColor = "rgba(145, 221, 198, 1)",
                     backgroundColor = "rgba(145, 221, 198, 0.4)") {
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: content[content.activeItem].detail.chart.labels,
            datasets: [{
                label: 'Số lượng',
                data: content[content.activeItem].detail.chart.data,
                borderColor: borderColor,
                backgroundColor: backgroundColor,
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: animation,
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
        loadAccountChart(0, init.content);
    });
}

function loadAccountChart(page, content) {
    getTrafficRecently(page).then(data => {
        const labels = [];
        const sizes = [];
        for (let i = data.length - 1; i >= 0; i--) {
            labels.push(data[i].date);
            sizes.push(data[i].size);
        }
        content.account.detail.chart.labels = labels;
        content.account.detail.chart.data = sizes;
        init.chartRerender = true;
        dispatch('rerender');
    });
}

function loadMatchChart(content) {
    getMatchDataChart().then(data => {
        console.log(data)
        const labels = [];
        const sizes = [];
        data.forEach(matchDate => {
            labels.push(matchDate.matchDate);
            sizes.push(matchDate.size);
        });
        content.match.detail.chart.labels = labels;
        content.match.detail.chart.data = sizes;
        init.chartRerender = true;
        dispatch('rerender');
    })
}

function loadMatchData(content) {
    getMatchData().then(data => {
        const dataList = content.match.dataList;
        dataList[0].quantity = data.matchHumanSize;
        dataList[1].quantity = data.matchBotSize;
        dataList[2].quantity = data.matchInMonth;
        loadMatchChart(content);
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
    banUser: (state) => {
        const id = state.modal.personalPage.user.id;
        banOrUnbanUser(id).then(code => {
            if (code === 1000) {
                dispatch('closeModal');
                state.content.account.detail.table.rows.forEach(user => {
                    if (user.id === id)
                        user.active = !user.active;
                })
            }
        })
    },
    changeOption: ({navbar, content}, index) => {
        if (navbar.activeIndex === index) return;
        navbar.activeIndex = index;
        if (index === 0) {
            content.activeItem = "account";
            loadAccountChart(0, content);
        } else if (index === 1) {
            content.activeItem = "match";
            loadMatchData(content);
        }
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

            if (content.activeItem === "account") {
                getPageUsers(detail.table.activePage).then(data => {
                    data.forEach(user => detail.table.rows.push(user));
                    detail.activeDetail = "table";
                    dispatch('rerender');
                });
            } else {
                getPageMatches(detail.table.activePage).then(data => {
                    data.forEach(match => detail.table.rows.push(match));
                    detail.activeDetail = "table";
                    dispatch('rerender');
                });
            }
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
            if (content.activeItem === "account") {
                getPageUsers(detail.table.activePage).then(data => {
                    detail.table.rows = [];
                    data.forEach(user => detail.table.rows.push(user));
                    dispatch('rerender');
                });
            } else {
                getPageMatches(detail.table.activePage).then(data => {
                    detail.table.rows = [];
                    data.forEach(user => detail.table.rows.push(user));
                    dispatch('rerender');
                });
            }
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
    openMatchDetail: ({ modal, content }, index) => {
        const matchId = content.match.detail.table.rows[index].id;
        sessionStorage.setItem("MATCH_ID", matchId);
        window.location.href = "/chess/public/review";
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
            }).catch(() => {
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