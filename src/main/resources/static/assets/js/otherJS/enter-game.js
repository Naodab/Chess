/*
let wsBroadcastInRoom;

//for audio messaging:
let mediaRecorder;
let audioChunks = [];
let recordingInterval;
let recordingTime = 0;
const recordingTimer = document.getElementById("recordingTimer");
const textInput = document.getElementById("textInput");

document.addEventListener('DOMContentLoaded', () => {
    initializeWebSockets();
});

function initializeWebSockets() {
    //for testing purpose:
    const roomID = sessionStorage.getItem("RoomID");
    console.log(roomID);
    const sender = sessionStorage.getItem("USERNAME");
    console.log(sender);

    //main part:
    wsBroadcastInRoom = new WebSocket("ws://localhost:8080/chess/websocket/chatInRoom/" + roomID);
    wsBroadcastInRoom.onopen = function () {
        console.log("Websocket in enter-game.js is open to receive messages now!");
    }
    wsBroadcastInRoom.onmessage = function (event) {
        if (event.type === "audio") {
            //for testing purpose:
            console.log("Yeah already receive the audio!");
            playReceivedAudio(event.data);
        }
        else {
            const receiveContent = JSON.parse(event.data);
            updateChatView(receiveContent);
        }
    }
    wsBroadcastInRoom.onerror = function (event) {
        console.log("Some errors have been detected: " + event);
    }
    wsBroadcastInRoom.onclose = function (event) {
        console.log("Websocket closed: " + event);
        if (event.code !== 1000) {
            console.log("Websocket is closed accidentally, with event.code = " + event.code + " and reason: " + event.reason);
        }
    }
}

function updateChatView(receiveContent) {
    const {sender, content} = receiveContent;
    const messageElement = document.createElement("div");
    messageElement.classList.add("received-message");
    messageElement.innerHTML = `<strong>${sender}:</strong> ${content}`;
    const mainContent = document.querySelector(".main-content");
    mainContent.appendChild(messageElement);
    mainContent.scrollTop = mainContent.scrollHeight;
}

function updateYourChatView(dataToSend) {
    const {sender, content} = dataToSend;
    const messageElement = document.createElement("div");
    messageElement.classList.add("sent-message");
    messageElement.innerHTML = `<strong>${sender}:</strong> ${content}`;
    const mainContent = document.querySelector(".main-content");
    mainContent.appendChild(messageElement);
    mainContent.scrollTop = mainContent.scrollHeight;
}

function clickSubmitFunc() {
    const textContent = document.getElementById("textInput").value;
    const dataToSend = {
        sender: sessionStorage.getItem("USERNAME"),
        content: textContent
    }
    updateYourChatView(dataToSend);
    wsBroadcastInRoom.send(JSON.stringify(dataToSend));
    document.getElementById("textInput").value = "";
}

function startRecording() {
    recordingTime = 0;
    recordingTimer.innerText = "00:00";
    recordingTimer.style.display = 'flex';
    textInput.style.opacity = "0";

    navigator.mediaDevices.getUserMedia({audio: true}).then (stream => {
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        audioChunks = [];
        mediaRecorder.ondataavailable = event => audioChunks.push(event.data);
        recordingInterval = setInterval(() => {
            recordingTime++;
            const minutes = Math.floor(recordingTime / 60).toString().padStart(2, '0');
            const seconds = (recordingTime % 60).toString().padStart(2, '0');
            recordingTimer.innerText = `${minutes}:${seconds}`;
        }, 1000);
    }).catch(error => console.error("No access to microphone! => Details: ", error));
}

function stopRecording() {
    clearInterval(recordingInterval);
    recordingTimer.style.display = "none";
    textInput.style.opacity = "1";

    if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.stop();
        mediaRecorder.onstop = () => {
            console.log("enter this onstop, green underlined!");
            const audioBlob = new Blob(audioChunks, {type: 'audio/webm'});
            sendAudioMessage(audioBlob);
        }
    }
}

function sendAudioMessage(audioBlob) {
    const reader = new FileReader();
    reader.onload = () => {
        const arrayBuffer = reader.result;
        const uint8Array = new Uint8Array(arrayBuffer);
        let binaryString = "";
        for (let i = 0; i < uint8Array.length; i++) {
            binaryString += String.fromCharCode(uint8Array[i]);
        }
        const base64String = btoa(binaryString);
        const audioMessage = {
            type: "audio",
            data: base64String
        };
        //for testing:
        console.log("Before sending...");
        wsBroadcastInRoom.send(JSON.stringify(audioMessage));
        //for testing:
        console.log("After: Audio is sent to client subscribed to this room!");
    }
    reader.onerror = (error) => {
        console.log("Error reading audio blob: " + error);
    }
    reader.readAsArrayBuffer(audioBlob);
}

function playReceivedAudio(arrayBuffer) {
    const audioBlob = new Blob([arrayBuffer], {type: 'audio/webm'});
    const audioUrl = URL.createObjectURL(audioBlob);
    const audioElement = new Audio(audioUrl);
    audioElement.play();

    const messageElement = document.createElement("div");
    messageElement.classList.add("received-message");
    messageElement.innerHTML = `<strong>Audio message: </strong><em>Playing...</em>`;
    const mainContent = document.querySelector(".main-content");
    mainContent.appendChild(messageElement);
    mainContent.scrollTop = mainContent.scrollHeight;
}

function clickRecordFunc() {
    const recordButton = document.getElementById("recordButton");
    //for testing purpose:
    console.log("Before: pressing mousedown ~ before recording...");
    recordButton.addEventListener("mousedown", startRecording);
    console.log("After: releasing mouseup ~ after recording...");
    recordButton.addEventListener("mouseup", stopRecording);
}
 */

let wsBroadcastInRoom;

//for audio messaging:
let localConnection;
let remoteConnection;
let dataChannel;
let mediaStream;
let mediaRecorder;
let audioChunks = [];
let recordedChunks = [];
const recordingTimer = document.getElementById("recordingTimer");
const textInput = document.getElementById("textInput");
const audioButton = document.getElementById("recordButton");

document.addEventListener('DOMContentLoaded', () => {
    initializeWebSockets();
    initializeWebRTC();
});

function initializeWebSockets() {
    //for testing purpose:
    const roomID = sessionStorage.getItem("RoomID");
    console.log(roomID);
    const sender = sessionStorage.getItem("USERNAME");
    console.log(sender);

    //main part:
    wsBroadcastInRoom = new WebSocket("ws://localhost:8080/chess/websocket/chatInRoom/" + roomID);
    wsBroadcastInRoom.onopen = function () {
        console.log("Websocket in enter-game.js is open to receive messages now!");
    }
    wsBroadcastInRoom.onmessage = function (event) {
        if (event.type === "audio") {
            //TODO: send audio here
        }
        else {
            const receiveContent = JSON.parse(event.data);
            updateChatView(receiveContent);
        }
    }
    wsBroadcastInRoom.onerror = function (event) {
        console.log("Some errors have been detected: " + event);
    }
    wsBroadcastInRoom.onclose = function (event) {
        console.log("Websocket closed: " + event);
        if (event.code !== 1000) {
            console.log("Websocket is closed accidentally, with event.code = " + event.code + " and reason: " + event.reason);
        }
    }
}

function updateChatView(receiveContent) {
    const {sender, content} = receiveContent;
    const messageElement = document.createElement("div");
    messageElement.classList.add("received-message");
    messageElement.innerHTML = `<strong>${sender}:</strong> ${content}`;
    const mainContent = document.querySelector(".main-content");
    mainContent.appendChild(messageElement);
    mainContent.scrollTop = mainContent.scrollHeight;
}

function updateYourChatView(dataToSend) {
    const {sender, content} = dataToSend;
    const messageElement = document.createElement("div");
    messageElement.classList.add("sent-message");
    messageElement.innerHTML = `<strong>${sender}:</strong> ${content}`;
    const mainContent = document.querySelector(".main-content");
    mainContent.appendChild(messageElement);
    mainContent.scrollTop = mainContent.scrollHeight;
}

function clickSubmitFunc() {
    const textContent = document.getElementById("textInput").value;
    const dataToSend = {
        sender: sessionStorage.getItem("USERNAME"),
        content: textContent
    }
    updateYourChatView(dataToSend);
    wsBroadcastInRoom.send(JSON.stringify(dataToSend));
    document.getElementById("textInput").value = "";
}

function initializeWebRTC() {
    localConnection = new RTCPeerConnection();
    remoteConnection = new RTCPeerConnection();

    dataChannel = localConnection.createDataChannel("audioDataChannel");
    dataChannel.onopen = () => {
        console.log("Audio DataChannel is now opened!");
    };
    dataChannel.onmessage = event => handleReceivedAudio(event.data);

    localConnection.onicecandidate = ({candidate}) => {
        if (candidate) {
            remoteConnection.addIceCandidate(candidate);
        }
    };
    remoteConnection.onicecandidate = ({candidate}) => {
        if (candidate) {
            localConnection.addIceCandidate(candidate);
        }
    };

    remoteConnection.ontrack = event => {
        const audio = new Audio();
        audio.srcObject = event.streams[0];
        audio.play();
    }

    navigator.mediaDevices.getUserMedia({audio: true}).then(stream => {
        mediaStream = stream;
        stream.getTracks().forEach(track => localConnection.addTrack(track, stream));
        return localConnection.createOffer();
    })  .then (offer => localConnection.setLocalDescription(offer))
        .then (() => remoteConnection.setRemoteDescription(localConnection.localDescription))
        .then (() => remoteConnection.createAnswer())
        .then (answer => remoteConnection.setLocalDescription(answer))
        .then (() => localConnection.setRemoteDescription((remoteConnection.localDescription)))
        .catch(error => console.error("WebRTC setup has error(s): " + error));
}

function startAudioTransmission() {

    mediaRecorder = new MediaRecorder(mediaStream, {mimeType: "audio/webm"});
    audioChunks = [];
    mediaRecorder.ondataavailable = event => {
        if (event.data.size > 0) {
            dataChannel.send(event.data);
        }
    }
    mediaRecorder.start(100);
    recordingTimer.innerText = "Recording...";
    recordingTimer.style.display = "block";
}

function stopAudioTransmission() {
    if (mediaRecorder) mediaRecorder.stop();
    recordingTimer.style.display = "none";
}

function handleReceivedAudio(audioData) {
    console.log("Come into handleReceivedAudio!");
    const audioBlob = new Blob([audioData], {type: "audio/webm"});
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
}

audioButton.addEventListener("mousedown", startAudioTransmission);
audioButton.addEventListener("mouseup", stopAudioTransmission);
audioButton.addEventListener("mouseleave", stopAudioTransmission);

