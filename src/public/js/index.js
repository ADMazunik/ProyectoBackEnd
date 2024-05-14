const socket = io()

socket.emit("addProduct", () => {

})

const productsList = document.getElementById("products")
const addProductForm = document.getElementById("newProductForm")
const title = document.getElementById("title")
const code = document.getElementById("code")
const price = document.getElementById("price")
const stock = document.getElementById("stock")
const description = document.getElementById("description")
const deleteProductForm = document.getElementById("deleteProductForm")
const idDelete = document.getElementById("idDelete")

addProductForm.onsubmit = (e) => {
    e.preventDefault()
    const product = {
        code: code.value,
        title: title.value,
        description: description.value,
        price: price.value,
        thumbnail: "https://picsum.photos/200/200",
        stock: stock.value
    }
    socket.emit("newProduct", product)
    addProductForm.reset()
}

deleteProductForm.onsubmit = (e) => {
    e.preventDefault()
    socket.emit("deleteProduct", idDelete.value)
    deleteProductForm.reset()
}

socket.on("showProducts", (products) => {
    let productsRender = ""
    products.reverse().map((prod) => {
        productsRender +=
            `            
            <div class="card" style="width: 10rem;">
                <img src=${prod.thumbnail} class="card-img-top" alt=${prod.title}>
                <div class="card-body">
                <h5 class="card-title">${prod.title}</h5>
                <p class="card-text">${prod.description}</p>
                <a href="#" class="btn btn-primary">$${prod.price}</a>
                <p class="card-text"><small>Stock Disponible: ${prod.stock}</small></p>
                </div>
            </div>            
            `
    })

    productsList.innerHTML = productsRender

})