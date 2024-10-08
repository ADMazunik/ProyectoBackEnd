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
    last_connection: {
        type: Date,
    },
    active: {
        type: Boolean,
        default: true
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: "carts",
        default: [],
    },
    creation_date: {
        type: Date
    }

});

export const UserModel = model('users', UserSchema);