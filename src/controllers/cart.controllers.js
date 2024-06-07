import * as service from "../services/cart.services.js"

export const getAll = async (req, res, next) => {
    try {
        const response = await service.getAll();
        res.json(response);
    } catch (error) {
        console.log(error)
    }
};

export const getById = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cart = await service.getById(cid);
        if (!cart) res.status(404).json({ msg: 'Cart not found' });
        else res.json(cart);
    } catch (error) {
        console.log(error)
    }
};

export const create = async (req, res, next) => {
    try {
        const newCart = await service.create(req.body);
        if (!newCart) res.status(404).json({ msg: 'Error creating cart' });
        else res.json(newCart);
    } catch (error) {
        console.log(error)
    }
};

export const addProductToCart = async (req, res, next) => {
    try {
        const { cid, pid } = req.params
        const { quantity } = req.body
        const response = await service.addProductToCart(cid, pid, quantity)
        if (!response) res.json({ msg: "Product or Cart not found" })
        res.status(200).json(response)
    } catch (error) {
        console.log(error)
    }

}
export const removeProductInCart = async (req, res, next) => {
    try {
        const { cid, pid } = req.params
        const response = await service.removeProductInCart(cid, pid)
        if (!response) { res.json({ msg: "Product or Cart not found" }) } else { res.status(200).json({ msg: `Product ${pid} removed successfully from cart` }) }
    } catch (error) {
        console.log(error)
    }

}

export const update = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cartUpdate = await service.update(cid, req.body);
        if (!cartUpdate) res.status(404).json({ msg: 'Error updating cart' });
        else res.json(cartUpdate);
    } catch (error) {
        console.log(error)
    }
};

export const remove = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cartDelete = await service.remove(cid);
        if (!cartDelete) res.status(404).json({ msg: 'Error removing cart' });
        else res.json(cartDelete);
    } catch (error) {
        console.log(error)
    }
};