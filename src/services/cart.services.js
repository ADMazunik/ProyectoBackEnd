import CartMongoDB from "../daos/mongodb/cart.dao.js";
const cartDao = new CartMongoDB();
import ProductDao from "../daos/mongodb/product.dao.js";
const prodDao = new ProductDao();

export const getAll = async () => {
    try {
        return await cartDao.getAll();
    } catch (error) {
        throw new Error(error);
    }
};

export const getById = async (id) => {
    try {
        return await cartDao.getById(id);
    } catch (error) {
        throw new Error(error);
    }
};

export const create = async (obj) => {
    try {
        return await cartDao.create(obj);
    } catch (error) {
        throw new Error(error);
    }
};

export const update = async (id, obj) => {
    try {
        return await cartDao.update(id, obj);
    } catch (error) {
        throw new Error(error);
    }
};

export const addProductToCart = async (cartId, prodId, quantity = 1) => {
    try {
        const cart = await getById(cartId)
        const prod = await prodDao.getById(prodId)
        if (cart && prod) {
            return await cartDao.addProductToCart(cartId, prodId, quantity)
        } else return null
    } catch (error) {
        throw new Error(error);
    }
}

export const removeProductInCart = async (cartId, prodId) => {
    try {
        const cart = await getById(cartId)
        const prod = await prodDao.getById(prodId)
        if (cart && prod) {
            const prodExist = cart.products.findIndex(prod => prod.product._id.toString() === prodId)
            if (prodExist >= 0) {
                return await cartDao.removeProductInCart(cartId, prodId)
            }
            else return null
        } else return null
    } catch (error) {
        throw new Error(error);
    }
}

export const remove = async (id) => {
    try {
        return await cartDao.delete(id);
    } catch (error) {
        throw new Error(error);
    }
};