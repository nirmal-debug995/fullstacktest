import Express from "express";
import http from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";
import messageFormat from "./utils/messages.js";
import * as userMethods from "./utils/users.js";

dotenv.config();

const app = Express();
const server = http.createServer(app);
const io = new Server(server);

// ✅ FIXED PORT CONFIGURATION
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000;

// set static folders
app.use(Express.static("public"));
const chatBotName = "ChatCord";

// socket actions when user connected
io.on("connection", socket => {
    console.log("New WS is Connected!");

    // when user joined
    socket.on("user-join", ({ username, room }) => {
        const user = userMethods.joinUser(socket.id, username, room);

        socket.join(user.room);

        socket.emit("message", messageFormat(chatBotName, "Welcome to chat!"));

        socket.broadcast
            .to(user.room)
            .emit("message", messageFormat(chatBotName, `${username} has Joined the chat!`));

        io.to(user.room).emit("room-users", {
            room: user.room,
            users: userMethods.roomUsers(user.room)
        });
    });

    // when chat message received
    socket.on("chat-message", (msg) => {
        const user = userMethods.getCurrentUser(socket.id);
        if (user) {
            io.to(user.room).emit("message", messageFormat(user.username, msg));
        }
    });

    // when a user disconnects
    socket.on("disconnect", () => {
        const user = userMethods.leaveUser(socket.id);

        if (user) {
            io.to(user.room).emit("message", messageFormat(chatBotName, `${user.username} has Left the chat!`));

            io.to(user.room).emit("room-users", {
                room: user.room,
                users: userMethods.roomUsers(user.room)
            });
        }
    });
});

// ✅ SAFE SERVER START
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
