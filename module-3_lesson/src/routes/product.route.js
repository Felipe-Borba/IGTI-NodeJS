import express from "express";

import productController from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", productController.createProduct);
router.get("/", productController.getProducts);
router.get("/:id", productController.getProduct);
router.put("/", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);
router.post("/info", productController.createProductInfo);
router.put("/info", productController.updateProductInfo);
router.post("/review", productController.createReview);
router.delete("/:id/review/:index", productController.deleteReview);

export default router;
