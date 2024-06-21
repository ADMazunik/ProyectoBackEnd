import { Router } from "express";
/* import { __dirname } from "../../utils.js";
import ProductManager from "../../daos/filesystem/product.dao.js";
const productManager = new ProductManager(__dirname + '/daos/products.json'); */
import * as service from "../../services/product.services.js";
import * as controllers from "../../controllers/user.controllers.js"
import passport from "passport";

const router = Router();

router.get("/", async (req, res) => {
    const { loggedIn } = req.session.info || false
    if (loggedIn !== true) return res.redirect("/login")
    else return res.redirect("/products")
})

router.get("/products", async (req, res) => {
    try {
        const { loggedIn, username, role } = req.session.info || false
        const isAdmin = role === "admin" ? true : false
        const { page, limit, name, sort } = req.query
        const response = await service.getAll(page, limit, name, sort);
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
})

router.get("/realtimeproducts", async (req, res) => {
    try {
        const { loggedIn, username, role } = req.session.info || false
        const isAdmin = role === "admin" ? true : false
        const { page, limit, name, sort } = req.query
        const response = await service.getAll(page, limit, name, sort);
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
})

router.get("/chat", async (req, res) => {
    const { loggedIn, username, role } = req.session.info || false
    const isAdmin = role === "admin" ? true : false
    res.render("chat", { loggedIn, username, isAdmin })
})

router.get("/login", async (req, res) => {
    try {
        const { loggedIn } = req.session.info || false
        if (loggedIn === true) return res.redirect("/products")
        else return res.render("login")
    } catch (error) {
        console.log(error)
    }
})

router.get("/register", async (req, res) => {
    res.render("register")
})

router.get("/profile-github", async (req, res) => {
    const user = req.user.toObject()
    req.session.info = {
        loggedIn: true,
        username: user.first_name,
        role: user.role
    };
    res.render("profile", { user, loggedIn: true, username: user.first_name })
})


export default router