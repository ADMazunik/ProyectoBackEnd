import { Router } from "express";
import * as productsServices from "../../services/product.services.js";
import * as userControllers from "../../controllers/user.controllers.js";
import * as cartServices from "../../services/cart.services.js";
import { checkAuth } from "../../middlewares/checkAuth.js";

import { logger } from "../../utils/logger.js";

const router = Router();

router.get("/", async (req, res) => {
    const { loggedIn } = req.session.info || false
    if (loggedIn !== true) return res.redirect("/login")
    else return res.redirect("/products")
});

router.get("/products", async (req, res) => {
    try {
        const { loggedIn, username, role } = req.session.info || false
        const isAdmin = role === "admin" ? true : false
        const { page, limit, name, sort } = req.query
        const response = await productsServices.getAll(page, limit, name, sort);
        const status = response ? "success" : "error"
        const next = response.hasNextPage ? `http://localhost:8080/products?page=${response.nextPage}` : null
        const prev = response.hasPrevPage ? `http://localhost:8080/products?page=${response.prevPage}` : null
        const products = {
            payload: response.docs,
            info: {
                status: status,
                count: response.totalDocs,
                totalPages: response.totalPages,
                prevPage: response.prevPage,
                nextPage: response.nextPage,
                page: response.page,
                hasPrevPage: response.hasPrevPage,
                hasNextPage: response.hasNextPage,
                prevLink: prev,
                nextLink: next,
            }
        }
        res.render("home", { products: products, loggedIn, username, isAdmin })
    } catch (error) {
        console.log(error)
    }
});

router.get("/realtimeproducts", [checkAuth], async (req, res) => {
    try {
        const { loggedIn, username, role } = req.session.info || false
        const isAdmin = role === "admin" ? true : false
        const { page, limit, name, sort } = req.query
        const response = await productsServices.getAll(page, limit, name, sort);
        const status = response ? "success" : "error"
        const next = response.hasNextPage ? `http://localhost:8080/products?page=${response.nextPage}` : null
        const prev = response.hasPrevPage ? `http://localhost:8080/products?page=${response.prevPage}` : null
        const products = {
            payload: response.docs,
            info: {
                status: status,
                count: response.totalDocs,
                totalPages: response.totalPages,
                prevPage: response.prevPage,
                nextPage: response.nextPage,
                page: response.page,
                hasPrevPage: response.hasPrevPage,
                hasNextPage: response.hasNextPage,
                prevLink: prev,
                nextLink: next,
            }
        }
        res.render("realTimeProducts", { products: products, loggedIn, username, isAdmin })
    } catch (error) {
        console.log(error)
    }
});

router.get("/cart", [checkAuth], async (req, res) => {
    const cartId = req.session.info.user.cart;
    const cart = await cartServices.getById(cartId);
    const cartView = cart.toObject()
    const { loggedIn, username, role } = req.session.info || false;
    const isAdmin = role === "admin" ? true : false;
    res.render("cart", { cart: cartView, loggedIn, username, isAdmin })
})

router.get("/chat", [checkAuth], async (req, res) => {
    const { loggedIn, username, role } = req.session.info || false
    const isAdmin = role === "admin" ? true : false
    res.render("chat", { loggedIn, username, isAdmin })
});

router.get("/login", async (req, res) => {
    try {
        const { loggedIn } = req.session.info || false
        if (loggedIn === true) return res.redirect("/products")
        else return res.render("login")
    } catch (error) {
        console.log(error)
    }
});

router.get("/register", async (req, res) => {
    res.render("register")
});

router.get("/profile-github", [checkAuth], async (req, res) => {
    const user = req.user.toObject()
    req.session.info = {
        user,
        loggedIn: true,
        username: user.email,
        role: user.role
    };
    res.render("profile", { user, loggedIn: true, username: user.email })
});

router.get("/loggerTest", async (req, res) => {
    logger.debug("Prueba de Log DEBUG")
    logger.http("Prueba de Log HTTP")
    logger.info("Prueba de Log INFO")
    logger.warning("Prueba de Log WARNING")
    logger.error("Prueba de Log ERROR")
    logger.fatal("Prueba de Log FATAL")
});

router.get("/new-pass", [checkAuth], async (req, res) => {
    res.render("newpass")
});

router.post("/new-pass", [checkAuth], userControllers.updatePassword);

export default router