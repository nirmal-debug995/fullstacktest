import Express from "express";
import http from "http";
import dotenv from "dotenv"
import { Server } from "socket.io";
import messageFormat from "./utils/messages.js";
import * as userMethods from "./utils/users.js";

dotenv.config();

const app = Express();
const server = http.createServer(app);
const io = new Server(server);

// set static folders
app.use(Express.static("public"));
const chatBotName = "ChatCord";

// socket actions when user connected
io.on("connection", socket => {
    console.log("New WS is Connected!");

    // when user joined
    socket.on("user-join", ({ username, room }) => {
        // create user object
        const user = userMethods.joinUser(socket.id, username, room);

        // to specify a target room
        socket.join(user.room);

        // when current user connects
        socket.emit("message", messageFormat(chatBotName, "Welcome to chat!"));

        // when another user connects
        socket.broadcast
            .to(user.room)
            .emit("message", messageFormat(chatBotName, `${username} has Joined the chat!`));

        // send room name & room users
        io.to(user.room).emit("room-users", { room: user.room, users: userMethods.roomUsers(user.room) });
    });


    // when chat message received
    socket.on("chat-message", (msg) => {

        // get current user info
        const user = userMethods.getCurrentUser(socket.id);

        io.to(user.room).emit("message", messageFormat(user.username, msg));

    });

    // when a user disconnects
    socket.on("disconnect", () => {

        // get current left user info
        const user = userMethods.leaveUser(socket.id);

        if (user) {
            io.to(user.room).emit("message", messageFormat(chatBotName, `${user.username} has Left the chat!`));
        }

        // send room name & room users
        io.to(user.room).emit("room-users", { room: user.room, users: userMethods.roomUsers(user.room) });
    });

});

try {
    const port = parseInt(process.env.SERVER_PORT);
    server.listen(port, console.log(`server running on port ${port}!`));

} catch (error) {
    console.log(error);
}