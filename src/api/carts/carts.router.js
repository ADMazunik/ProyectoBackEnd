import { Router } from "express";
import CartManager from "../../managers/cartManager.js";
import { __dirname } from "../../utils.js";

const router = Router();
const cartManager = new CartManager(__dirname + '/data/carts.json');

router.get("/", async (req, res) => {
    const carts = await cartManager.getCarts()
    res.json(carts)
})

router.get("/:cid", async (req, res) => {
    try {
        const { cid } = req.params
        const cart = await cartManager.getCartById(cid)
        res.status(200).json(cart.products)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
})

router.post("/", async (req, res) => {
    try {
        const newCart = await cartManager.createCart()
        res.status(201).json(newCart)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
})

router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params
        const newProd = await cartManager.addProduct(cid, pid)
        res.status(201).json(newProd)

    } catch (error) {

    }
})

export default router