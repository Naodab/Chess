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

export { getUsers }