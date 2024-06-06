import { Schema, model } from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const productsSchema = new Schema({
    title: { type: String, required: true },
    code: { type: Number, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    thumbnail: { type: Array, required: true },
    status: { type: Boolean, default: true },
})
productsSchema.plugin(mongoosePaginate)

export const ProductModel = model(
    "products",
    productsSchema
)