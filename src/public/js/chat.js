const socket = io();
let username = "Invitado";

const message = document.getElementById('message');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const actions = document.getElementById('actions');

btn.addEventListener('click', () => {
    if (message.value.trim() !== "") {
        socket.emit('chat:message', {
            username,
            message: message.value
        })
        message.value = '';
    }
});


socket.on('messages', (data) => {
    actions.innerHTML = ''
    const chatRender = data.map((msg) => {
        return `<p><strong>${msg.username}</strong>: ${msg.message}</p>`
    }).join(' ')

    output.innerHTML = chatRender
});