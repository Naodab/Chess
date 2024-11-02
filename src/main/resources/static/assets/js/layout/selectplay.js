
const rooms = [
    { "id": 33008, "time": "10 phút", "people": 2, "status": "Tham gia" },
    { "id": 9783992, "time": "30 phút", "people": 2, "status": "Tham gia" },
    { "id": 9831609, "time": "5 phút", "people": 2, "status": "Tham gia" },
    { "id": 9851036, "time": "20 phút", "people": 2, "status": "Tham gia" },
    { "id": 9847615, "time": "15 phút", "people": 2, "status": "Tham gia" }
];

const roomsTable = document.getElementById('rooms-table');

function renderRooms() {
    roomsTable.innerHTML = ''; // Xóa các hàng trước đó

    rooms.forEach(room => {
        const row = document.createElement('tr');

        row.innerHTML = `
  <td>${room.id}</td>
  <td>${room.time}</td>
  <td>${room.people}</td>
  <td class="button-container">
    <button class="join-button">Tham gia</button>
    <button class="watch-button">Xem</button>
  </td>
`;

        roomsTable.appendChild(row);

        row.querySelector('.join-button').addEventListener('click', () => {
            console.log(`Tham gia bàn ${room.id}`);
        });

        row.querySelector('.watch-button').addEventListener('click', () => {
            console.log(`Xem bàn ${room.id}`);
        });
    });
}



renderRooms();



document.getElementById("btn_create").onclick = function () {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("popup-create-room").style.display = "block";
};

document.getElementById("close-btn_profile").onclick = function () {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("popup-create-room").style.display = "none";
};

document.getElementById("search").onclick = function () {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("main_ontable").style.display = "block";
};

document.getElementById("out").onclick = function () {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("main_ontable").style.display = "none";
};




document.getElementById("form-login").onclick = function () {
    window.location.href = 'login.html';
};
document.getElementById("form-signup").onclick = function () {
    window.location.href = 'sign up.html';
};
document.getElementById("playonline").onclick = function () {
    window.location.href = 'playonline.html';
};
document.getElementById("playbots").onclick = function () {
    window.location.href = 'playbots.html';
};


function appendNumber(number) {
    const input = document.getElementById('codeInput');
    if (input.value.length < 5) {
        input.value += number;
    }
}

function clearInput() {
    const input = document.getElementById('codeInput');
    input.value = '';
}

function submitCode() {
    const input = document.getElementById('codeInput');
    alert('Code entered: ' + input.value);
}


function changeBet(amount) {
    let betValue = document.getElementById('bet-value');
    let winValue = document.getElementById('win-value');
    let currentBet = parseInt(betValue.textContent);
    let currentWin = parseInt(winValue.textContent);
    currentBet += amount;
    currentWin += amount * 2;
    if (currentBet >= 0) {
        betValue.textContent = currentBet;
        winValue.textContent = currentWin;
    }
}

function changeTime(type, amount) {
    let timeElement;
    let currentValue;
    if (type === 'game') {
        timeElement = document.getElementById('game-time');
        currentValue = parseInt(timeElement.textContent.split("'")[0]);
        currentValue += amount;
        if (currentValue >= 0) {
            timeElement.textContent = currentValue + "'/ván";
        }
    } else if (type === 'move') {
        timeElement = document.getElementById('move-time');
        currentValue = parseInt(timeElement.textContent.split("s")[0]);
        currentValue += amount;
        if (currentValue >= 0) {
            timeElement.textContent = currentValue + "s/nước";
        }
    } else if (type === 'increment') {
        timeElement = document.getElementById('increment-time');
        currentValue = parseInt(timeElement.textContent.split("s")[0]);
        currentValue += amount;
        if (currentValue >= 0) {
            timeElement.textContent = currentValue + "s lũy tiến";
        }
    }
}


document.getElementById("name").onclick = function () {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("body_profile").style.display = "block";
};



document.getElementById("close-btn_profile1").onclick = function () {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("body_profile").style.display = "none";
};
