function logout(token) {
    fetch("/chess/api/auth/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: { token }
    }).then(response=> {
        if (!response.ok) {
            return response.json();
        } else {
            alert(response.message);
        }
    }).then(data => {
        window.location.href = "./";
    });
}

export default logout;