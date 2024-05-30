import { Router } from "express";
/* import { __dirname } from "../../utils.js";
import ProductManager from "../../daos/filesystem/product.dao.js";
const productManager = new ProductManager(__dirname + '/daos/products.json'); */
import * as service from "../../services/product.services.js";

const router = Router();

router.get("/", async (req, res) => {
    const products = await service.getAll()
    res.render('home', { products })
})

router.get("/realtimeproducts", async (req, res) => {
    const products = await service.getAll()
    res.render("realTimeProducts")
})

router.get("/chat", async (req, res) => {
    res.render("chat")
})

export default router