import express from "express";
import userController from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", userController.getUsers);
router.post("/createUser", userController.createUser);
router.post("/login", userController.login);

export default router;
