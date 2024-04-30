import express from "express";
import ProductManager from "./productManager.js";

const productManager = new ProductManager('./src/products.json');
const app = express();
const PORT = 8080;


app.get("/products", async (req, res) => {
    const { limit } = req.query
    try {
        const products = await productManager.getProducts()
        if (!limit) { return res.status(200).json(products) }
        res.status(200).json(products.slice(0, limit))
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
});

app.get("/products/:pid", async (req, res) => {
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


app.listen(PORT, () => {
    console.log(`Server UP on port ${PORT}`)
});