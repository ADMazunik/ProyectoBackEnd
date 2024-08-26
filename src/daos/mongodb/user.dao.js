import { UserModel } from "./models/user.model.js"

export default class UserMongoDB {
    async login(email, password) {
        try {
            return await UserModel.findOne({ email, password })
        } catch (error) {
            throw new Error(error);
        }
    }

    async register(user) {
        try {
            const { email } = user
            const userExist = await UserModel.findOne({ email })
            if (!userExist) return await UserModel.create(user)
            else return null
        } catch (error) {
            throw new Error(error);
        }
    }

    async getById(id) {
        try {
            return await UserModel.findById(id)
        } catch (error) {
            throw new Error(error);
        }
    }

    async getByEmail(email) {
        try {
            return await UserModel.findOne({ email })
        } catch (error) {
            throw new Error(error);
        }
    }

    async update(id, obj) {
        try {
            return await UserModel.findByIdAndUpdate(id, obj, { new: true })
        } catch (error) {
            throw new Error(error);
        }
    }
}
