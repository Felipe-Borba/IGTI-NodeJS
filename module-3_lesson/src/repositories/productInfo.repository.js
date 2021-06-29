import ProductInfoSchema from "../schemas/productInfo.schema.js";
import { connect } from "./mongo.db.js";

async function createProductInfo(productInfo) {
  try {
    const mongoose = await connect();
    const ProductInfo = mongoose.model("productInfo", ProductInfoSchema);

    productInfo = new ProductInfo(productInfo);
    await productInfo.save();
  } catch (error) {
    throw error;
  }
}

async function updateProductInfo(info) {
  try {
    const mongoose = await connect();
    const ProductInfo = mongoose.model("productInfo", ProductInfoSchema);

    await ProductInfo.findOneAndUpdate({ productId: info.productId }, info);
  } catch (error) {
    throw error;
  }
}

async function getProductInfo(productId) {
  try {
    const mongoose = await connect();
    const ProductInfo = mongoose.model("productInfo", ProductInfoSchema);

    const query = ProductInfo.findOne({ productId });
    return await query.exec();
  } catch (error) {
    throw error;
  }
}

async function createReview(review, productId) {
  try {
    const productInfo = await getProductInfo(productId);
    productInfo.reviews.push(review);

    await updateProductInfo(productInfo);
  } catch (error) {
    throw error;
  }
}

async function deleteReview(productId, index) {
  try {
    const productInfo = await getProductInfo(productId);
    productInfo.reviews.splice(index, 1);

    await updateProductInfo(productInfo);
  } catch (error) {
    throw error;
  }
}

async function getProductsInfo() {
  try {
    const mongoose = await connect();
    const ProductInfo = mongoose.model("productInfo", ProductInfoSchema);

    const query = ProductInfo.find({});
    return await query.exec();
  } catch (error) {
    throw error;
  }
}

async function deleteProductInfo(productId) {
  try {
    const mongoose = await connect();
    const ProductInfo = mongoose.model("productInfo", ProductInfoSchema);

    await ProductInfo.deleteOne({ productId });
  } catch (error) {
    throw error;
  }
}

export default {
  createProductInfo,
  updateProductInfo,
  getProductInfo,
  createReview,
  deleteReview,
  getProductsInfo,
  deleteProductInfo,
};
