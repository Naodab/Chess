function getPageMatches(page) {
    return fetch("/chess/api/matches/human/page/" + page, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("TOKEN")
        }
    }).then(response => response.json()).then(data => data.result);
}

export { getPageMatches }