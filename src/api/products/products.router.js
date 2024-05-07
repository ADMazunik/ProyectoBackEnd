import { Router } from "express";
import { __dirname } from "../../utils.js";
import ProductManager from "../../managers/productManager.js";

const router = Router();
const productManager = new ProductManager(__dirname + '/data/products.json');

router.get("/", async (req, res) => {
    const { limit } = req.query
    try {
        const products = await productManager.getProducts()
        if (!limit) { return res.status(200).json(products) }
        res.status(200).json(products.slice(0, limit))
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
});

router.get("/:pid", async (req, res) => {
    try {
        const { pid } = req.params
        const product = await productManager.getProductById(pid)
        if (product) {
            return res.status(200).json(product)
        }
        res.status(404).json({ msg: "Product not found" })

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
});

router.post("/", async (req, res) => {
    try {
        const newProduct = req.body
        const addProduct = await productManager.addProduct(newProduct)
        res.status(201).json(addProduct)

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
});

router.put("/:pid", async (req, res) => {
    try {
        const { pid } = req.params
        const updatedProduct = req.body
        const modifyProduct = await productManager.updateProduct(pid, updatedProduct)
        res.status(201).json(modifyProduct)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
});

router.delete("/:pid", async (req, res) => {
    const { pid } = req.params
    const deleteProduct = await productManager.deleteProduct(pid)
    if (!deleteProduct) { return res.status(404).json({ msg: "Product not found" }) }
    res.status(200).json({ msg: "Product deleted successfully" })
})

export default router;