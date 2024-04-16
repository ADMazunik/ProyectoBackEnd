class ProductManager {
    constructor() {
        this.products = []
    }
    #getLastId() {
        let lastId = 0
        this.products.map((product) => {
            if (product.id > lastId) lastId = product.id
        })
        return lastId
    }
    addProduct(title, description, price, thumbnail, code, stock) {
        if (this.products.some(product => product.code === code)) {
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
                id: this.#getLastId() + 1,
            }
            if (Object.values(product).some(value => value === undefined)) {
                console.log("Verify all values are not empty")
            } else {
                this.products.push(product)
                console.log("Added Product")
            }
        }
    }
    getProducts() {
        return this.products
    }
    getProductById(id) {
        const verifyId = this.products.find((product) => product.id === id)
        if (verifyId !== undefined) {
            return verifyId
        } else { console.log("Not Found") }
    }
}

const productManager = new ProductManager();



productManager.addProduct("Prueba", "Descripción de Prueba", 10000, "Sin imágen", 1234, 9);
productManager.addProduct("Prueba2", 10000, "Sin imágen", 1234, 9);
productManager.addProduct("Prueba3", "Descripción de Prueba3", 15000, "Sin imágen", 1111, 7);
productManager.addProduct("Prueba4", "Descripción de Prueba4", 20000, "Sin imágen", 1111, 2);

console.log(productManager.getProducts())
productManager.getProductById(4)