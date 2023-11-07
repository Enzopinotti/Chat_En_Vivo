import express from "express";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";

const port = 8080;
const app = express();
const httpServer = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);

});

const io = new Server(httpServer);

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

//Routes
app.use("/", viewsRouter);

let messages = [];

io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado");
    socket.on("message", (data) => {
        console.log(data);
        data.time = new Date().toLocaleString();
        console.log(data);
        messages.push(data);
        console.log(messages);
        io.emit("messagesLogs", messages);  
    });

    socket.on("auth", (username) => {

        socket.emit('messagesLogs', messages);
        socket.broadcast.emit('userConnected', username);

    });

});
