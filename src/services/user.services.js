import UserMongoDB from "../daos/mongodb/user.dao.js";
const userDAO = new UserMongoDB();
import CartMongoDB from "../daos/mongodb/cart.dao.js";
const cartDAO = new CartMongoDB();
import { createHash, isValidPassword, hasBeenMoreThanXTime } from "../utils.js";
import { userGenerator } from "../utils/mocks.utils.js";
import UserRepository from "../repository/user.repository.js";
const userRepository = new UserRepository()

import { sendMail } from "../services/mailing.service.js";

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
export const getProfileUserByid = async (id) => {
    try {
        return await userRepository.getUserById(id)
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
        await updateLastConnection(userExist._id)
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
            const cartUser = await cartDAO.create()
            if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
                const newUser = await userDAO.register({
                    ...user,
                    password: createHash(password),
                    role: "admin",
                    cart: cartUser._id,
                    creation_date: new Date()
                })
                return newUser;
            } else {
                const newUser = await userDAO.register({
                    ...user,
                    password: createHash(password),
                    cart: cartUser._id,
                    creation_date: new Date()
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

export const updateLastConnection = async (userId) => {
    try {
        return userDAO.update(userId, {
            last_connection: new Date(),
        })
    } catch (error) {
        throw new Error(error)
    }
}

export const checkUsersStatus = async () => {
    try {
        const inactiveUsers = [];
        const users = await userDAO.getAll()
        if (users.length <= 0) return null
        for (const user of users) {
            if (
                user.last_connection &&
                hasBeenMoreThanXTime(user.last_connection)
            ) {
                console.log(`Usuario ${user.email} (ID: ${user._id}) se ha deshabilitado por inactividad`);
                await userDAO.update(user._id, {
                    active: false
                });

                const mail = await sendMail(user, "disableAccount");
                if (mail == true) console.log("Inactivity Mail Send")
                inactiveUsers.push(user.email)
            }
        }

        if (inactiveUsers.length == 0) return { msg: "Couldn't find inactive Users" };
        else return inactiveUsers;
    } catch (error) {
        throw new Error(error)
    }
}