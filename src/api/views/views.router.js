import { Router } from "express";
import { __dirname } from "../../utils.js";
import ProductManager from "../../managers/productManager.js";

const router = Router();
const productManager = new ProductManager(__dirname + '/data/products.json');

router.get("/", async (req, res) => {
    const products = await productManager.getProducts()
    res.render('home', { products })
})

router.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts")
})

export default router