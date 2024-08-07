import MessageMongoDB from "../daos/mongodb/messages.dao.js";
const cartDao = new MessageMongoDB();

export const getAll = async () => {
    try {
        return await cartDao.getAll();
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

export const remove = async (id) => {
    try {
        return await cartDao.delete(id);
    } catch (error) {
        throw new Error(error);
    }
};