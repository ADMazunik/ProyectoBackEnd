import { MessageModel } from "./models/messages.model.js";

export default class MessageMongoDB {
    async getAll() {
        try {
            const response = await MessageModel.find({}).lean()
            return response
        } catch (error) {
            throw new Error(error);
        }
    }
    async create(obj) {
        try {
            const response = await MessageModel.create(obj);
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }

    async delete(id) {
        try {
            const response = await MessageModel.findByIdAndDelete(id);
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }

}
