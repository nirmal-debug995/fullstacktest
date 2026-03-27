const users = [];

export function joinUser(id, username, room) {
    const user = { id, username, room };

    users.push(user);

    return user;
}

export function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

export function leaveUser(id) {
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

export function roomUsers(room) {
    return users.filter(user => user.room === room);
}