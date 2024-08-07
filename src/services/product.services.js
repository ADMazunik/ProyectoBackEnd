import ProductMongoDB from "../daos/mongodb/product.dao.js";
const prodDao = new ProductMongoDB();
import { productGenerator } from "../utils/mocks.utils.js";

export const getAll = async (page, limit, name, sort) => {
    try {
        return await prodDao.getAll(page, limit, name, sort);
    } catch (error) {
        throw new Error(error);
    }
};

export const getById = async (id) => {
    try {
        return await prodDao.getById(id);
    } catch (error) {
        throw new Error(error);
    }
};

export const create = async (obj) => {
    try {
        return await prodDao.create(obj);
    } catch (error) {
        throw new Error(error);
    }
};

export const update = async (id, obj) => {
    try {
        return await prodDao.update(id, obj);
    } catch (error) {
        throw new Error(error);
    }
};

export const remove = async (id) => {
    try {
        return await prodDao.delete(id);
    } catch (error) {
        throw new Error(error);
    }
};

export const createProductsMock = async (count = 100) => {
    try {
        const productsMock = [];
        for (let i = 0; i < count; i++) {
            const user = productGenerator()
            productsMock.push(user)
        };
        return productsMock;
    } catch (error) {
        throw new Error(error);
    }
}