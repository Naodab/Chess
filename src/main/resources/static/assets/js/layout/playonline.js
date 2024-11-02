document.getElementById("name").onclick = function () {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("body_profile").style.display = "block";
};
document.getElementById("name1").onclick = function () {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("body_profile").style.display = "block";
};


document.getElementById("close-btn_profile").onclick = function () {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("body_profile").style.display = "none";
};




document.getElementById("form-login").onclick = function () {
    window.location.href = 'login.html';
};
document.getElementById("form-signup").onclick = function () {
    window.location.href = 'sign up.html';
};


function toggleDropdown() {
    var dropdown = document.getElementById("dropdown-content");
    if (dropdown.style.display === "none" || dropdown.style.display === "") {
        dropdown.style.display = "block";
    } else {
        dropdown.style.display = "none";
    }
}

function selectTime(time) {
    document.getElementById("selected-time").innerText = time;
    toggleDropdown();
}





const themeSelect = document.getElementById('theme');

themeSelect.addEventListener('change', function () {
    const selectedTheme = this.value;

    switch (selectedTheme) {
        case 'forest':
            document.body.style.backgroundImage = "url('https://images.chesscomfiles.com/chess-themes/backgrounds/originals/large/wood.png')";
            document.body.style.opacity = "0.6"; /* Set transparency */
            break;
        case 'ocean':
            document.body.style.backgroundImage = "url('https://images.chesscomfiles.com/chess-themes/backgrounds/originals/large/sky.png')";
            document.body.style.opacity = "0.8"; /* Set transparency */
            break;
        case 'space':
            document.body.style.backgroundImage = "url('https://images.chesscomfiles.com/chess-themes/backgrounds/originals/large/space.png')";
            document.body.style.opacity = "0.7"; /* Set transparency */
            break;
        default:
            document.body.style.backgroundImage = "url('./img/background.jpg')"
            document.body.style.backgroundColor = "0.8";
    }
});

