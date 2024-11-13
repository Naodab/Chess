function getUserSize() {
    return fetch("/chess/api/users/count", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`
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
            Authorization: `Bearer ${localStorage.getItem("TOKEN")}`
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
            "Authorization": "Bearer " + localStorage.getItem("TOKEN")
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

export { getUserSize, getUsers, getPageUsers }