import UserDTO from "../dto/user.dto.js";
import UserMongoDB from "../daos/mongodb/user.dao.js";
import { errorHandler } from "../middlewares/errorHandler.js";
const userDAO = new UserMongoDB()

export default class UserRepository {
    constructor() {
    }

    async getUserById(id) {
        try {
            const user = await userDAO.getById(id)
            return new UserDTO(user)
        } catch (error) {
            throw new Error(error)
        }
    }
}