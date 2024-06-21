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