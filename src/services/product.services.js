import ProductMongoDB from "../daos/mongodb/product.dao.js";
const prodDao = new ProductMongoDB();

export const getAll = async () => {
    try {
        return await prodDao.getAll();
    } catch (error) {
        console.log(error)
    }
};

export const getById = async (id) => {
    try {
        return await prodDao.getById(id);
    } catch (error) {
        console.log(error)
    }
};

export const create = async (obj) => {
    try {
        return await prodDao.create(obj);
    } catch (error) {
        console.log(error)
    }
};

export const update = async (id, obj) => {
    try {
        return await prodDao.update(id, obj);
    } catch (error) {
        console.log(error)
    }
};

export const remove = async (id) => {
    try {
        return await prodDao.delete(id);
    } catch (error) {
        console.log(error)
    }
};