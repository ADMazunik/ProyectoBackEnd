import { UserModel } from "./models/user.model.js"

export default class UserMongoDB {
    async login(email, password) {
        try {
            return await UserModel.findOne({ email, password })
        } catch (error) {
            console.log(error)
        }
    }

    async register(user) {
        try {
            const { email } = user
            const userExist = await UserModel.findOne({ email })
            if (!userExist) return await UserModel.create(user)
            else return null
        } catch (error) {
            console.log(error)
        }
    }

    async getById(id) {
        try {
            return await UserModel.findById(id)
        } catch (error) {
            console.log(error)
        }
    }

    async getByEmail(email) {
        try {
            return await UserModel.findOne({ email })
        } catch (error) {
            console.log(error)
        }
    }
}
