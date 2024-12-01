function getAccountData() {
    return fetch("/chess/api/traffic/account", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + sessionStorage.getItem("TOKEN")
        }
    }).then(response => response.json()).then(data => data.result);
}

function getTrafficRecently(page) {
    return fetch("/chess/api/traffic/page/" + page, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("TOKEN")}`
        }
    }).then(response => response.json()).then(data => data.result);
}

function getMatchData() {
    return fetch("/chess/api/traffic/matches", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("TOKEN")}`
        }
    }).then(response => response.json()).then(data => data.result);
}

function getMatchDataChart() {
    return fetch("/chess/api/traffic/matchDate", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("TOKEN")}`
        }
    }).then(response => response.json()).then(data => data.result);
}

export { getAccountData, getTrafficRecently, getMatchData, getMatchDataChart }