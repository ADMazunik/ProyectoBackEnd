import passport from "passport";
import UserMongoDB from "../daos/mongodb/user.dao.js";
const userDAO = new UserMongoDB();
import { createHash, isValidPassword } from "../utils.js";
import { userGenerator } from "../utils/mocks.utils.js";

export const getUserById = async (id) => {
    try {
        return await userDAO.getById(id)
    } catch (error) {
        throw new Error(error);
    }
}
export const getUserByEmail = async (email) => {
    try {
        return await userDAO.getByEmail(email)
    } catch (error) {
        throw new Error(error);
    }
}
export const login = async (user) => {
    try {
        const { email, password } = user
        const userExist = await getUserByEmail(email)
        if (!userExist) return null
        const validatePassword = isValidPassword(password, userExist)
        if (!validatePassword) return null
        return userExist
    } catch (error) {
        throw new Error(error);
    }
}

export const register = async (user) => {
    try {
        const { email, password } = user
        const userExist = await getUserByEmail(email)
        if (!userExist) {
            if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
                const newUser = await userDAO.register({
                    ...user,
                    password: createHash(password),
                    role: "admin"
                })
                return newUser;
            } else {
                const newUser = await userDAO.register({
                    ...user,
                    password: createHash(password)
                })
                return newUser;
            }
        } else return null
    } catch (error) {
        throw new Error(error);
    }
}

export const createUsersMock = async (count = 100) => {
    try {
        const usersMock = [];
        for (let i = 0; i < count; i++) {
            const user = userGenerator()
            usersMock.push(user)
        };
        return usersMock;
    } catch (error) {
        throw new Error(error);

    }

}

export const updatePassword = async (pass, user) => {
    try {
        const isSamePassword = isValidPassword(pass, user)
        if (isSamePassword) return null;
        const newPassword = createHash(pass)
        return await userDAO.update(user._id, { password: newPassword })
    } catch (error) {
        throw new Error(error)
    }
}