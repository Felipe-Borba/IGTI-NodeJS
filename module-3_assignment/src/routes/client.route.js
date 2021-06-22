import express from "express";

import clientController from "../controllers/client.controller.js";

const router = express.Router();

router.post("/", clientController.createClient);
router.get("/", clientController.getClients);
router.get("/:id", clientController.getClient);
//
router.delete("/:id", clientController.deleteClient);

export default router;
