import * as service from "../services/product.services.js";
import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse()

export const getAll = async (req, res, next) => {
    try {
        const { page, limit, name, sort } = req.query
        const response = await service.getAll(page, limit, name, sort);
        const status = response ? "success" : "error"
        const next = response.hasNextPage ? `http://localhost:8080/products?page=${response.nextPage}` : null
        const prev = response.hasPrevPage ? `http://localhost:8080/products?page=${response.prevPage}` : null
        res.json({
            payload: response.docs,
            info: {
                status: status,
                count: response.totalDocs,
                totalPages: response.totalPages,
                prevPage: response.prevPage,
                nextPage: response.nextPage,
                page: response.page,
                hasPrevPage: response.hasPrevPage,
                hasNextPage: response.hasNextPage,
                prevLink: prev,
                nextLink: next,
            }
        });
    } catch (error) {
        next(error);
    }
};

export const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prod = await service.getById(id);
        if (!prod) res.status(404).json({ msg: 'Product not found' });
        else res.json(prod);
    } catch (error) {
        next(error);
    }
};

export const create = async (req, res, next) => {
    try {
        const newProd = await service.create(req.body);
        if (!newProd) res.status(404).json({ msg: 'Error creating product' });
        else res.json(newProd);
    } catch (error) {
        next(error);
    }
};

export const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prodUpd = await service.update(id, req.body);
        if (!prodUpd) res.status(404).json({ msg: 'Error updating product' });
        else res.json(prodUpd);
    } catch (error) {
        next(error);
    }
};

export const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prodDel = await service.remove(id);
        if (!prodDel) res.status(404).json({ msg: 'Error removing product' });
        else res.json(prodDel);
    } catch (error) {
        next(error);
    }
};

export const getProductsMock = async (req, res, next) => {
    try {
        let { count } = req.query
        res.json(await service.createProductsMock(count))

    } catch (error) {
        next(error);
    }

}