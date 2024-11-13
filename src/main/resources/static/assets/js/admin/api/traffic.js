function getAccountData() {
    return fetch("/chess/api/traffic/account", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("TOKEN")
        }
    }).then(response => response.json()).then(data => data.result);
}

export { getAccountData }