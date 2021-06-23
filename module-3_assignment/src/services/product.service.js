import productRepository from "../repositories/product.repository.js";
import verify from "./asset/verify.js";

async function createProduct(product) {
  await verify.Supplier(product.supplier_id);

  return await productRepository.insertProduct(product);
}

async function getProducts() {
  return await productRepository.getProducts();
}

async function getProduct(id) {
  return await productRepository.getProduct(id);
}

async function updateProduct(product) {
  await verify.Supplier(product.supplier_id);

  return await productRepository.updateProduct(product);
}

async function deleteProduct(id) {
  return await productRepository.deleteProduct(id);
}

export default {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
