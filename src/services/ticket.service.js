import TicketMongoDB from "../daos/mongodb/ticket.dao.js";
const ticketDAO = new TicketMongoDB();
import CartMongoDB from "../daos/mongodb/cart.dao.js";
const cartDAO = new CartMongoDB();
import ProductMongoDB from "../daos/mongodb/product.dao.js";
const prodDAO = new ProductMongoDB();

import { sendMail } from "../services/mailing.service.js";


export const getAll = async () => {
    try {
        return await ticketDAO.getAll();
    } catch (error) {
        throw new Error(error);
    }
};

export const getById = async (id) => {
    try {
        return await ticketDAO.getById(id);
    } catch (error) {
        throw new Error(error);
    }
};

export const create = async (obj) => {
    try {
        return await ticketDAO.create(obj);
    } catch (error) {
        throw new Error(error);
    }
};

export const update = async (id, obj) => {
    try {
        return await ticketDAO.update(id, obj);
    } catch (error) {
        throw new Error(error);
    }
};

export const generateTicket = async (user) => {
    try {
        const cart = await cartDAO.getById(user.cart);
        if (!cart) return null;
        if (cart.products.length <= 0) return null

        let totalPrice = 0;

        for (const prodInCart of cart.products) {
            const idProd = prodInCart.product;
            const prodDB = await prodDAO.getById(idProd);

            if (prodInCart.quantity <= prodDB.stock) {
                const productsPrice = prodInCart.quantity * prodDB.price;
                totalPrice += productsPrice;
            } else return null;
        }

        const ticket = await ticketDAO.create({
            code: `${Math.floor(Math.random() * 10000)}`,
            purchase_datetime: new Date().toLocaleString(),
            amount: totalPrice,
            purchaser: user.email,
        })

        await cartDAO.clearCart(user.cart);

        const mail = await sendMail(user, "purchase", ticket);
        if (mail == true) console.log("Purchase Mail Send")

        return ticket;

    } catch (error) {
        throw new Error(error)
    }

}