import { CartModel } from "./models/cart.model.js";

export default class CartMongoDB {

    async getAll() {
        try {
            const response = await CartModel.find({}).lean()
            return response
        } catch (error) {
            throw new Error(error);
        }
    }

    async getById(id) {
        try {
            const response = await CartModel.findById(id).populate("products.product");
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }

    async create() {
        try {
            const response = await CartModel.create({
                products: [],
            });
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }

    async addProductToCart(cartId, prodId, quantity) {
        try {
            const cart = await CartModel.findById(cartId)
            if (!cart) return null
            const prodExist = cart.products.findIndex(prod => prod.product.toString() === prodId)
            if (prodExist !== -1) {
                cart.products[prodExist].quantity += quantity
            } else {
                cart.products.push({ product: prodId, quantity })
            }
            cart.save()
            return cart
        } catch (error) {
            throw new Error(error);
        }

    }
    async removeProductInCart(cartId, prodId) {
        try {
            return await CartModel.findOneAndUpdate(
                { _id: cartId },
                { $pull: { products: { product: prodId } } },
                { new: true }
            )
        } catch (error) {
            throw new Error(error);
        }
    }
    async clearCart(cartId) {
        try {
            return await CartModel.findByIdAndUpdate(
                cartId,
                { $set: { products: [] } },
                { new: true }
            )
        } catch (error) {
            throw new Error(error);
        }
    }
}