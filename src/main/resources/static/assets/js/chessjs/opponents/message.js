function html([first, ...strings], ...values) {
    return values.reduce(
        (acc, cur) => acc.concat(cur, strings.shift()),
        [first]
    )
        .filter(x => x && x !== true || x === 0)
        .join('');
}

function renderMessage(user, message) {
    return html`
        <div class="message__avatar"
             style="background: url('${user.avatar}') no-repeat center center / cover">
        </div>
        <div class="chat closure">${message}</div>
        <div class="chat-username">${user.username}</div>
    `;
}

export {
    renderMessage
}