import { Schema, model } from "mongoose"

const cartsSchema = new Schema({
    products: { type: Array, default: [] }
})

export const CartModel = model(
    "carts",
    cartsSchema
)