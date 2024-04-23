const fs = require('fs')

class ProductManager {
    constructor(path) {
        this.path = path
    }
    #getLastId(products) {
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
        const products = await this.getProducts();
        try {
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
                    id: this.#getLastId(products) + 1,
                }
                if (Object.values(product).some(value => value === undefined)) {
                    console.log("Verify all values are not empty")
                } else {
                    products.push(product)
                    fs.promises.writeFile(this.path, JSON.stringify(products))
                    console.log("Added Product")
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    async updateProduct(id, newData) {
        const { title, description, price, thumbnail, code, stock } = newData
        const products = await this.getProducts();
        try {
            const index = products.findIndex(product => product.id == id)

            if (title !== undefined) { products[index].title = title }
            if (description !== undefined) { products[index].description = description }
            if (price !== undefined) { products[index].price = price }
            if (thumbnail !== undefined) { products[index].thumbnail = thumbnail }
            if (code !== undefined) { products[index].code = code }
            if (stock !== undefined) { products[index].stock = stock }
            fs.promises.writeFile(this.path, JSON.stringify(products))
            console.log("Updated Product")

        } catch (error) {
            console.log(error)
        }

    }
    async deleteProduct(id) {
        const products = await this.getProducts()
        try {
            const index = products.findIndex(product => product.id == id)
            products.splice(index, 1)
            fs.promises.writeFile(this.path, JSON.stringify(products))
            console.log("Deleted Product")
        } catch (error) {
            console.log(error)

        }
    }

}

const productManager = new ProductManager('./products.json');

/* productManager.addProduct("Prueba", "Descripción de Prueba", 10000, "Sin imágen", 1234, 9);
productManager.addProduct("Prueba2", "Descripción de Prueba2", 15000, "Sin imágen", 1111, 7);
productManager.addProduct("Prueba3", "Descripción de Prueba3", 20000, "Sin imágen", 2222, 2);
productManager.addProduct("Prueba4", "Descripción de Prueba4", 23000, "Sin imágen", 3333, 2);

productManager.deleteProduct(3)
productManager.updateProduct(1, { title: "Cambio de nombre", description: "New Desc" }) */
