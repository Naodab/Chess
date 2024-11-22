function getSpiderActivity() {
    return fetch("../api/network/local-ip", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`
        }
    }).then(response => response.json());
}

export { getSpiderActivity }