import * as service from "../services/product.services.js";
import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse()
import { ProductsError } from "../utils/errors.dictionary.js";

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
        if (!prod) httpResponse.NotFound(res, ProductsError.NOT_FOUND, prod)
        else httpResponse.Ok(res, prod);
    } catch (error) {
        next(error);
    }
};

export const create = async (req, res, next) => {
    try {
        const newProd = await service.create(req.body);
        if (!newProd) httpResponse.BadRequest(res, ProductsError.NOT_CREATED, data);
        else httpResponse.Ok(res, newProd);
    } catch (error) {
        next(error);
    }
};

export const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prodUpd = await service.update(id, req.body);
        if (!prodUpd) httpResponse.BadRequest(res, ProductsError.NOT_UPDATED, data);
        else httpResponse.Ok(res, prodUpd);
    } catch (error) {
        next(error);
    }
};

export const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prodDel = await service.remove(id);
        if (!prodDel) httpResponse.BadRequest(res, ProductsError.NOT_REMOVED, data)
        else httpResponse.Ok(res, prodDel);
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