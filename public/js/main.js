const socket = io();
const chat_form = document.getElementById("chat-form");
const chat_messages_container = document.querySelector(".chat-messages");
const room_name = document.getElementById("room-name");
const room_users_list = document.getElementById("users");

// get username & room from URL
const { username, room } = Qs.parse(window.location.search, {
    ignoreQueryPrefix: true
});


socket.emit("user-join", { username, room });

socket.on("message", message => {
    console.log(message);
    sendMessageToDOM(message);

    // scroll down to the current message
    chat_messages_container.scrollTop = chat_messages_container.scrollHeight;
});

socket.on("room-users", ({ room, users }) => {
    console.log({ room, users });

    outputRoomName(room);

    outputUserList(users);
});


chat_form.addEventListener("submit", (e) => {
    e.preventDefault(); // to prevent any some kind of refresh for the page after submit

    // get message content
    const msg = e.target.elements.msg.value;

    socket.emit("chat-message", msg);
    // input validation
   // if (validateInput(msg)) {
        // send message to server
   // } else {
    //    alert("Please enter a valid message!");
   // }

    // empty input after submit
    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();
});

function sendMessageToDOM(msg) {

    const messageDiv = document.createElement("div");

    messageDiv.className = "message";

    messageDiv.innerHTML = `
    <p class="meta">${msg.username} <span>${msg.time}</span></p>
    <p class="text">
        ${msg.text}
    </p>
    `;

    chat_messages_container.appendChild(messageDiv);

}

function outputRoomName(room) {
    room_name.textContent = room;
}

function outputUserList(users) {
    room_users_list.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}
    `;
}

//function validateInput(message) {
//    const pattern = /^[a-zA-Z0-9_]+$/;
//    return pattern.test(message);
//}
