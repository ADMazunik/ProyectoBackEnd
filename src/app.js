import express from "express";
import productsRouter from "./api/products/products.router.js"
import cartsRouter from "./api/carts/carts.router.js"
import { __dirname } from "./utils.js";

const app = express();
const PORT = 8080;

app.use(express.json());


app.use("/products", productsRouter)
app.use("/carts", cartsRouter)



app.listen(PORT, () => {
    console.log(`Server UP on port ${PORT}`)
});