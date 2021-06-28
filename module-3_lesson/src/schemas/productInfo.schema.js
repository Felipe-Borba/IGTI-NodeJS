import mongoose from "mongoose";
import ReviewSchema from "./review.schema.js";

const ProductInfoSchema = new mongoose.Schema(
  {
    ProductId: Number,
    category: String,
    height: String,
    depth: String,
    reviews: [ReviewSchema],
  },
  { collection: "productInfo" }
);

export default ProductInfoSchema;
