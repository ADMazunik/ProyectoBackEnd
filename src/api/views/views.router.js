import { Router } from "express";
/* import { __dirname } from "../../utils.js";
import ProductManager from "../../daos/filesystem/product.dao.js";
const productManager = new ProductManager(__dirname + '/daos/products.json'); */
import * as service from "../../services/product.services.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const products = await service.getAll()
        const { docs } = products
        res.render('home', { docs })
    } catch (error) {

    }
})

router.get("/realtimeproducts", async (req, res) => {
    const getProducts = await service.getAll()
    const { docs } = getProducts
    res.render("realTimeProducts", { docs })
})

router.get("/chat", async (req, res) => {
    res.render("chat")
})

export default router