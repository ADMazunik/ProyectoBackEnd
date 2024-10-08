import { Router } from "express";
import * as controller from "../../controllers/product.controllers.js";
import { checkPremium } from "../../middlewares/checkPremium.js";
import { checkAdmin } from "../../middlewares/checkAdmin.js";


const router = Router();

router.get("/", controller.getAll);

router.get("/mockingproducts", controller.getProductsMock);

router.get("/:id", controller.getById);

router.post("/", [checkPremium], controller.create);

router.put("/:id", [checkPremium], controller.update);

router.delete("/:id", [checkAdmin], controller.remove);


export default router;
