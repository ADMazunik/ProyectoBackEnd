import { dirname } from 'path';
import { fileURLToPath } from 'url';
export const __dirname = dirname(fileURLToPath(import.meta.url));

import bcrypt from "bcrypt"

export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))

}

export const isValidPassword = (password, user) => {
    return bcrypt.compareSync(password, user.password)
}

export const hasBeenMoreThanXTime = (lastConnectionDate) => {
    const dateNow = new Date();
    const timeDifference = dateNow - lastConnectionDate;
    const hours48Ms = 48 * 60 * 60 * 1000;

    return timeDifference > hours48Ms;
};