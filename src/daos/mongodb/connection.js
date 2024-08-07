import { connect } from "mongoose"
import "dotenv/config"

const MONGO_URL = process.env.MONGO_URL || "mongodb:127.0.0.1:27017/ecommerce"

export const initMongoDB = async () => {
    try {
        await connect(MONGO_URL)
        console.log("Connected to DB")
    } catch (error) {
        throw new Error(error);
    }
}