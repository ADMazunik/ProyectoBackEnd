import { CartModel } from "./models/cart.model.js";

export default class CartMongoDB {
    async getAll() {
        try {
            const response = await CartModel.find({}).lean()
            return response
        } catch (error) {
            console.log(error)
        }
    }

    async getById(id) {
        try {
            const response = await CartModel.findById(id);
            return response;
        } catch (error) {
            console.log(error)
        }
    }

    async create(obj) {
        try {
            const response = await CartModel.create(obj);
            return response;
        } catch (error) {
            console.log(error)
        }
    }
}