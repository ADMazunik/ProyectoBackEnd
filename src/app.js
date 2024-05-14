import express from "express";
import { Server } from "socket.io"
import handlebars from "express-handlebars"
import productsRouter from "./api/products/products.router.js"
import cartsRouter from "./api/carts/carts.router.js"
import viewsRouter from "./api/views/views.router.js";
import { __dirname } from "./utils.js";
import ProductManager from "./managers/productManager.js";
const productManager = new ProductManager(__dirname + '/data/products.json');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.static(__dirname + "/public"))
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")



app.use("/products", productsRouter)
app.use("/carts", cartsRouter)
app.use("/", viewsRouter)
app.use("/realtimeproducts", viewsRouter)

const httpServer = app.listen(PORT, () => {
    console.log(`Server UP on port ${PORT}`)
});

const socketServer = new Server(httpServer)
socketServer.on("connection", async (socket) => {

    console.log(`User ${socket.id} connected ✅`)
    socket.emit("showProducts", await productManager.getProducts())

    socket.on("disconnect", () => {
        console.log("User disconnected ⭕")
    })

    socket.on("newProduct", async (product) => {
        await productManager.addProduct(product)
        socket.emit("showProducts", await productManager.getProducts())
    })

    socket.on("deleteProduct", async (id) => {
        await productManager.deleteProduct(id)
        socket.emit("showProducts", await productManager.getProducts())
    })



});
