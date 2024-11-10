function getUserSize(token) {
    return fetch("/chess/api/users/count", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }).then(res => {
        if (res.status === 200) {
            return res.json();
        } else {
            throw new Error("Failed to get user size");
        }
    }).then(data => data.result);
}

function getUsers(token) {
    return fetch("/chess/api/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
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

export { getUserSize, getUsers }