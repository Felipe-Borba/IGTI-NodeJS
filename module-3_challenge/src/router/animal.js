import express from "express";
import AnimalController from "../controller/animal.js";

const router = express.Router();

router.post("/", AnimalController.createAnimal);
router.put("/", AnimalController.updateAnimal);
router.delete("/:id", AnimalController.deleteAnimal);
router.get("/", AnimalController.getAnimalList);
router.get("/:id", AnimalController.getAnimalById);

export default router;
