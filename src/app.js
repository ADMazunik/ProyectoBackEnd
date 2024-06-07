import express from "express";
import { Server } from "socket.io";
import { initMongoDB } from "./daos/mongodb/connection.js";
import handlebars from "express-handlebars";
import productsRouter from "./api/products/products.router.js";
import cartsRouter from "./api/carts/carts.router.js";
import viewsRouter from "./api/views/views.router.js";
import { __dirname } from "./utils.js";
import * as productService from "./services/product.services.js"
import * as messageService from "./services/messages.services.js"

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");


app.use("/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);
app.use("/realtimeproducts", viewsRouter);

initMongoDB();

const httpServer = app.listen(PORT, () => {
    console.log(`Server UP on port ${PORT}`)
});

const socketServer = new Server(httpServer)
socketServer.on("connection", async (socket) => {

    console.log(`User ${socket.id} connected ✅`)
    socket.emit("showProducts", await productService.getAll())
    socketServer.emit("messages", await messageService.getAll())

    socket.on("disconnect", () => {
        console.log("User disconnected ⭕")
    })

    socket.on("newProduct", async (product) => {
        await productService.create(product)
        socket.emit("showProducts", await productService.getAll())
    })

    socket.on("deleteProduct", async (id) => {
        await productService.remove(id)
        socket.emit("showProducts", await productService.getAll())
    })

    socket.on("chat:message", async (msg) => {
        await messagesService.create(msg)
        socketServer.emit("messages", await messageService.getAll())
    })
});
