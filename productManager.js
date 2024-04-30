const fs = require('fs')

class ProductManager {
    constructor(path) {
        this.path = path
    }
    async #getLastId() {
        const products = await this.getProducts()
        let lastId = 0
        products.map((product) => {
            if (product.id > lastId) lastId = product.id
        })
        return lastId
    }
    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const products = await fs.promises.readFile(this.path, "utf-8")
                return JSON.parse(products)
            } else {
                return []
            }
        } catch (error) {
            console.log(error)
        }
    }
    async getProductById(id) {
        try {
            const products = await this.getProducts();
            const verifyId = products.find((product) => product.id === id)
            if (verifyId !== undefined) {
                return verifyId
            } else { console.log("Not Found") }
        } catch (error) {
            console.log(error)
        }
    }
    async addProduct(title, description, price, thumbnail, code, stock) {
        try {
            const products = await this.getProducts();
            if (products.some(product => product.code === code)) {
                console.log("Product already exists")
            } else {
                const product = {
                    code,
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock,
                    id: await this.#getLastId() + 1,
                }
                if (Object.values(product).some(value => value === undefined)) {
                    console.log("Verify all values are not empty")
                } else {
                    products.push(product)
                    await fs.promises.writeFile(this.path, JSON.stringify(products))
                    console.log("Added Product")
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
            if (index === -1) { return "Error" }
            const updatedProduct = { ...products[index] }
            Object.assign(updatedProduct, obj)
            products[index] = updatedProduct

            await fs.promises.writeFile(this.path, JSON.stringify(products))
            console.log("Updated Product")

        } catch (error) {
            console.log(error)
        }

    }
    async deleteProduct(id) {
        try {
            const products = await this.getProducts()
            const index = products.findIndex(product => product.id == id)
            if (index === -1) { return "Product Not Found" }
            products.splice(index, 1)
            await fs.promises.writeFile(this.path, JSON.stringify(products))
            console.log("Deleted Product")
        } catch (error) {
            console.log(error)

        }
    }

}

const productManager = new ProductManager('./products.json');



/* const addProducts = (t) => {
    setTimeout(() => {
        productManager.addProduct(`Prueba ${t}`, "Descripción de Prueba", 10000 * t, "Sin imágen", t + 234, 10 * t);
    }, (t * 1000))
}

addProducts(1)
addProducts(2)
addProducts(3)
addProducts(4)

productManager.deleteProduct(3)
productManager.updateProduct(1, { title: "Cambio de nombre", description: "New Desc" })

const productsLog = async () => {
    products = await productManager.getProducts()
    console.log(products)
}
productsLog() */