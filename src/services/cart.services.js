import CartMongoDB from "../daos/mongodb/cart.dao.js";
const cartDao = new CartMongoDB();
import ProductDao from "../daos/mongodb/product.dao.js";
const prodDao = new ProductDao();

export const getAll = async () => {
    try {
        return await cartDao.getAll();
    } catch (error) {
        console.log(error)
    }
};

export const getById = async (id) => {
    try {
        return await cartDao.getById(id);
    } catch (error) {
        console.log(error)
    }
};

export const create = async (obj) => {
    try {
        return await cartDao.create(obj);
    } catch (error) {
        console.log(error)
    }
};

export const update = async (id, obj) => {
    try {
        return await cartDao.update(id, obj);
    } catch (error) {
        console.log(error)
    }
};

export const addProductToCart = async (cartId, prodId, quantity = 1) => {
    try {
        const cartExist = await getById(cartId)
        const prodExist = await prodDao.getById(prodId)
        if (cartExist && prodExist) {
            return await cartDao.addProductToCart(cartId, prodId, quantity)
        } else return null
    } catch (error) {
        console.log(error)
    }
}

export const removeProductInCart = async (cartId, prodId) => {
    try {
        const cartExist = await getById(cartId)
        const prodExist = await prodDao.getById(prodId)
        if (cartExist && prodExist) {
            return await cartDao.removeProductInCart(cartId, prodId)
        } else return null
    } catch (error) {
        console.log(error)
    }
}

export const remove = async (id) => {
    try {
        return await cartDao.delete(id);
    } catch (error) {
        console.log(error)
    }
};