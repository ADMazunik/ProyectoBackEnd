import UserMongoDB from "../daos/mongodb/user.dao.js";
const userDAO = new UserMongoDB();

export const login = async (email, password) => {
    try {
        return await userDAO.login(email, password)
    } catch (error) {
        console.log(error)
    }
}

export const register = async (user) => {
    try {
        return await userDAO.register(user)
    } catch (error) {
        console.log(error)
    }
}

