import express from "express";

import clientController from "../controllers/client.controller.js";

const router = express.Router();

router.post("/", clientController.createClient);
router.get("/", clientController.getClients);

export default router;
