import productRepository from "../repositories/product.repository.js";
import saleRepository from "../repositories/sale.repository.js";
import verifyId from "./asset/verifyId.js";

async function createProduct(product) {
  await verifyId.Supplier(product.supplierId);

  return await productRepository.insertProduct(product);
}

async function getProducts() {
  return await productRepository.getProducts();
}

async function getProduct(id) {
  return await productRepository.getProduct(id);
}

async function updateProduct(product) {
  await verifyId.Supplier(product.supplierId);

  return await productRepository.updateProduct(product);
}

async function deleteProduct(id) {
  // if (await saleRepository.getSaleByProductId(id)) {
  //   throw new Error("can't delete product with sales registered");
  // }

  return await productRepository.deleteProduct(id);
}

export default {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
