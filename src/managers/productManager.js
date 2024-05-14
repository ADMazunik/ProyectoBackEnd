import fs from "fs";
import { v4 as uuid } from "uuid";

export default class ProductManager {
    constructor(path) {
        this.path = path
    }

    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const products = await fs.promises.readFile(this.path, "utf8")
                return JSON.parse(products)
            } else { return [] }
        } catch (error) {
            console.log(error)
        }
    }
    async getProductById(id) {
        try {
            const products = await this.getProducts();
            const verifyId = products.find((product) => product.id === id)
            if (verifyId) { return verifyId }
        } catch (error) {
            console.log(error)
        }
    }
    async addProduct(obj) {
        try {
            const products = await this.getProducts();
            if (products.some(product => product.code === obj.code)) {
                return "Product already exists"
            } else {
                const product = {
                    status: true,
                    id: uuid(),
                    thumbnail: "No Images",
                    ...obj
                }
                if (Object.values(product).some(value => value === undefined) || Object.values(product).some(value => value === "")) {
                    return "Verify all field are not empty"
                } else {
                    products.push(product)
                    await fs.promises.writeFile(this.path, JSON.stringify(products))
                    return `Product created successfully with id: ${product.id}`
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    async updateProduct(id, obj) {
        try {
            const products = await this.getProducts()
            const index = products.findIndex(product => product.id == id)
            if (index === -1) { return "Product not found" }
            const productToUpdate = { ...products[index] }
            productToUpdate = { ...productToUpdate, ...obj }
            products[index] = productToUpdate

            await fs.promises.writeFile(this.path, JSON.stringify(products))
            return "Updated Product"

        } catch (error) {
            console.log(error)
        }

    }
    async deleteProduct(id) {
        try {
            const products = await this.getProducts()
            const index = products.findIndex(product => product.id == id)
            if (index === -1) { return null }
            products.splice(index, 1)
            await fs.promises.writeFile(this.path, JSON.stringify(products))
            return "Deleted product"
        } catch (error) {
            console.log(error)

        }
    }

}