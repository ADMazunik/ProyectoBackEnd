import fs from "fs";
import { v4 as uuid } from "uuid";
import { __dirname } from "../../utils.js";
import ProductManager from "./product.dao.js";

const productManager = new ProductManager(__dirname + '/data/products.json');

export default class CartManager {
    constructor(path) {
        this.path = path
    }

    async getCarts() {
        try {
            if (fs.existsSync(this.path)) {
                const carts = await fs.promises.readFile(this.path, "utf8")
                return JSON.parse(carts)
            } else { return [] }
        } catch (error) {
            console.log(error)
        }
    };
    async getCartById(id) {
        try {
            const cart = await this.getCarts();
            const verifyId = cart.find((cart) => cart.id === id)
            if (verifyId) { return verifyId }
        } catch (error) {
            console.log(error)
        }
    };
    async createCart() {
        try {
            const carts = await this.getCarts()
            const newCart = {
                id: uuid(),
                products: []
            }
            carts.push(newCart)
            await fs.promises.writeFile(this.path, JSON.stringify(carts))
            return "Cart created successfully"
        } catch (error) {
            console.log(error)
        }
    };

    async addProduct(cartId, prodId) {
        try {
            const cart = await this.getCartById(cartId)
            if (!cart) return "Cart not found"
            const product = await productManager.getProductById(prodId)
            if (!product) return "Product not found"
            const productExists = cart.products.find(product => product.id === prodId)
            if (productExists) {
                productExists.quantity += 1
            } else {
                const newProduct = { id: prodId, quantity: 1 }
                cart.products.push(newProduct)
            }

            const carts = await this.getCarts()
            const index = carts.findIndex(cart => cart.id === cartId)
            carts[index] = cart
            await fs.promises.writeFile(this.path, JSON.stringify(carts))


        } catch (error) {
            console.log(error)
        }
    };
}