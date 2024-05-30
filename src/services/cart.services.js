import CartMongoDB from "../daos/mongodb/cart.dao.js";
const cartDao = new CartMongoDB();

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

export const remove = async (id) => {
    try {
        return await cartDao.delete(id);
    } catch (error) {
        console.log(error)
    }
};