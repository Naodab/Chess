function getAccountData() {
    return fetch("/chess/api/traffic/account", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }).then(response => response.json()).then(data => data.result);
}

export { getAccountData }