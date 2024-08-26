import "dotenv/config";

export const config = {
    MONGO_URL: process.env.MONGO_URL,
    SECRET: process.env.SECRET,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    EMAIL: process.env.EMAIL,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD
};