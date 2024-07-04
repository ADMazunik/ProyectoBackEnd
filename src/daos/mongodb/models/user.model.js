import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    cart: [
        {
            _id: false,
            product: {
                type: Schema.Types.ObjectId,
                ref: "carts"
            }
        }
    ]
});

export const UserModel = model('users', UserSchema);