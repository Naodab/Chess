function changePassword(token, oldPassword, newPassword) {
    return fetch("../api/auth/changePassword", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ oldPassword, newPassword })
    }).then(response => {
        return response.ok;
    })
}

export default changePassword;