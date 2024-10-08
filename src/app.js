import { __dirname } from "./utils.js";
import "dotenv/config"

import express from "express";
import { Server } from "socket.io";

import handlebars from "express-handlebars";

import productsRouter from "./api/products/products.router.js";
import cartsRouter from "./api/carts/carts.router.js";
import usersRouter from "./api/users/users.router.js"
import viewsRouter from "./api/views/views.router.js";
import ticketRouter from "./api/ticket/ticket.router.js"

import { initMongoDB } from "./daos/mongodb/connection.js";

import * as productService from "./services/product.services.js";
import * as messageService from "./services/messages.services.js";

import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";

import passport from "passport";
import "./passport/local-strategy.js";
import './passport/github-strategy.js';

import { errorHandler } from "./middlewares/errorHandler.js";
import { checkAuth } from "./middlewares/checkAuth.js";

import { logger } from "./utils/logger.js";

import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { info } from "./docs/info.js";

const app = express();
const PORT = 8080;

const swaggerSpecs = swaggerJSDoc(info)

const storeConfig = {
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        crypto: { secret: process.env.SECRET },
        ttl: 180
    }),
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { MaxAge: 180000 }
}

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpecs))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(express.static(__dirname + "/public"))
    .use(cookieParser())
    .use(session(storeConfig))

    .engine("handlebars", handlebars.engine())
    .set("views", __dirname + "/views")
    .set("view engine", "handlebars")

    .use(passport.initialize())
    .use(passport.session())

    .use("/api/products", checkAuth, productsRouter)
    .use("/api/carts", checkAuth, cartsRouter)
    .use("/api/sessions", checkAuth, usersRouter)
    .use("/api/ticket", checkAuth, ticketRouter)
    .use("/users", usersRouter)
    .use("/", viewsRouter)
    .use(errorHandler);

initMongoDB();


const httpServer = app.listen(PORT, () => {
    logger.info(`Server UP on port ${PORT}`)
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