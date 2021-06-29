import express from "express";
import OwnerController from "../controller/owner.js";

const router = express.Router();

router.post("/", OwnerController.createOwner);
router.put("/", OwnerController.updateOwner);
router.delete("/:id", OwnerController.deleteOwner);
router.get("/", OwnerController.getOwnerList);
router.get("/:id", OwnerController.getOwnerById);

export default router;
