import { Router } from "express";
import * as controller from "../../controllers/ticket.controller.js";

const router = Router();

router.post("/purchase", controller.generateTicket);

export default router;