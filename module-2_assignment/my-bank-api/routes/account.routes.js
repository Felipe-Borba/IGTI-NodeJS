import express from "express";
import AccountController from "../controllers/account.controller.js";

const router = express.Router();

router.post("/", AccountController.createAccount);
router.get("/", AccountController.getAccounts);
router.get("/:id", AccountController.getAccount);
router.delete("/:id", AccountController.deleteAccount);
router.put("/", AccountController.updateAccount);
router.patch("/updateBalance", AccountController.updateBalance);

export default router;
