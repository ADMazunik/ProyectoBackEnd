import { Router } from "express";
import * as controller from "../../controllers/cart.controllers.js";
import { checkAuth } from "../../middlewares/checkAuth.js";

const router = Router();

router.get("/", controller.getAll);

router.get("/:cid", controller.getById);

// router.get("/:cid/purchase", [checkAuth], controller.)

router.post("/", controller.create);

router.get("/products/:pid", [checkAuth], controller.addProductToCartAndRedirect);

router.post("/products/:pid", [checkAuth], controller.addProductToCart);

router.delete("/:cid", [checkAuth], controller.remove);

router.delete("/:cid/products/:pid", [checkAuth], controller.removeProductInCart);

export default router;
