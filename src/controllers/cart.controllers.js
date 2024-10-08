import * as service from "../services/cart.services.js"
import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse()
import { CartsError } from "../utils/errors.dictionary.js";

export const getAll = async (req, res, next) => {
    try {
        const response = await service.getAll();
        httpResponse.Ok(res, response)
    } catch (error) {
        next(error);
    }
};

export const getById = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cart = await service.getById(cid);
        if (!cart) httpResponse.NotFound(res, CartsError.NOT_FOUND, cart);
        else res.json(cart);
    } catch (error) {
        next(error);
    }
};

export const create = async (req, res, next) => {
    try {
        const newCart = await service.create(req.body);
        if (!newCart) httpResponse.BadRequest(res, CartsError.NOT_CREATED, newCart)
        else res.json(newCart);
    } catch (error) {
        next(error);
    }
};

export const addProductToCart = async (req, res, next) => {
    try {
        const cid = req.session.info.user.cart
        const { pid } = req.params
        const { quantity } = req.body
        const response = await service.addProductToCart(cid, pid, quantity)
        if (!response) httpResponse.BadRequest(res, CartsError.PRODUCT_OR_CART_NOT_FOUND, response)
        res.status(200).json(response)
    } catch (error) {
        next(error);
    }

}
export const addProductToCartAndRedirect = async (req, res, next) => {
    try {
        const cid = req.session.info.user.cart
        const { pid } = req.params
        const { quantity } = req.body
        const response = await service.addProductToCart(cid, pid, quantity)
        if (!response) httpResponse.BadRequest(res, CartsError.PRODUCT_OR_CART_NOT_FOUND, response)
        res.redirect("/cart")
    } catch (error) {
        next(error);
    }

}
export const removeProductInCart = async (req, res, next) => {
    try {
        const { cid, pid } = req.params
        const response = await service.removeProductInCart(cid, pid)
        if (!response) httpResponse.BadRequest(res, CartsError.PRODUCT_OR_CART_NOT_FOUND, response);
        else { res.status(200).json({ msg: `Product ${pid} removed successfully from cart` }) }
    } catch (error) {
        next(error);
    }

}

export const update = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cartUpdate = await service.update(cid, req.body);
        if (!cartUpdate) httpResponse.BadRequest(res, CartsError.NOT_UPDATED, cartUpdate)
        else res.json(cartUpdate);
    } catch (error) {
        next(error);
    }
};

export const remove = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cartDelete = await service.remove(cid);
        if (!cartDelete) httpResponse.BadRequest(res, CartsError.NOT_REMOVED, cartDelete)
        else res.json(cartDelete);
    } catch (error) {
        next(error);
    }
};