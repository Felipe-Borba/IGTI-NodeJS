import express from "express";
import ServiceController from "../controller/service.js";

const router = express.Router();

router.post("/", ServiceController.createService);
router.get("/", ServiceController.getServiceList);
router.get("/:id", ServiceController.getServiceById);

export default router;
