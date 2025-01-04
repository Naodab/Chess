function getUserSize() {
    return fetch("/chess/api/users/count", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("TOKEN")}`
        }
    }).then(res => {
        if (res.status === 200) {
            return res.json();
        } else {
            throw new Error("Failed to get user size");
        }
    }).then(data => data.result);
}

function getUsers() {
    return fetch("/chess/api/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("TOKEN")}`
        }
    }).then(response=> {
        if (response.ok) {
            return response.json();
        }
    }).then(data => {
        if (data.code === 1000) {
            return data.result;
        }
        throw new Error("Can't get users from server");
    });
}

function getPageUsers(page) {
    return fetch("/chess/api/users/page/" + page, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + sessionStorage.getItem("TOKEN")
        }
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
    }).then(data => {
        if (data.code === 1000) {
            return data.result;
        }
        throw new Error("Can't get page " + page);
    });
}

function countSearchUser(searchStr) {
    return fetch("/chess/api/users/search/" + searchStr, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + sessionStorage.getItem("TOKEN")
        }
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
    }).then(data => {
        if (data.code === 1000) {
            return data.result;
        }
        throw new Error("Can't count " + searchStr);
    });
}

function searchUser(searchStr, page, sortField, sortDirection) {
    return fetch("/chess/api/users/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + sessionStorage.getItem("TOKEN")
        },
        body: JSON.stringify({searchStr, page, sortField, sortDirection})
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
    }).then(data => {
        if (data.code === 1000) {
            return data.result;
        }
        throw new Error("Can't get page " + page);
    });
}

function banOrUnbanUser(userID) {
    return fetch("/chess/api/users/ban/" + userID, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + sessionStorage.getItem("TOKEN")
        }
    }).then(resp => resp.json()).then(data => data.code)
}

export { getUserSize, getUsers, getPageUsers, searchUser, countSearchUser, banOrUnbanUser }