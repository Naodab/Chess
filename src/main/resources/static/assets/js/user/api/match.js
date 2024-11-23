function createMatchOnline(whitePlayerId, blackPlayerId, roomId) {
    return fetch("/chess/api/matches/human", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("TOKEN")
        },
        body: JSON.stringify({ whitePlayerId, blackPlayerId, roomId })
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
    }).then(data => data.result);
}

function createMatchBot() {
    return fetch("../api/matches/bot", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("TOKEN")}`
        },
        redirect: "follow"
    }).then(response => {
        if (!response.ok) {
            throw new Error("Something is wrong!");
        }
        return response.json();
    }).then(data => data.result);
}

function getMatch(type, matchId) {
    return fetch(`/chess/api/matches/${type}/${matchId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("TOKEN")
        }
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
    }).then(data => data.result);
}

function getPageMatch(page) {
    return fetch("/chess/api/matches/human/myMatches/" + page, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`
        }
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
    }).then(data => data.result);
}

export { createMatchOnline, getMatch, createMatchBot, getPageMatch }