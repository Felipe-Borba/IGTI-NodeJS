import productRepository from "../repositories/product.repository.js";
import saleRepository from "../repositories/sale.repository.js";
import productInfoRepository from "../repositories/productInfo.repository.js";
import verifyId from "./asset/verifyId.js";

async function createProduct(product) {
  await verifyId.Supplier(product.supplierId);

  return await productRepository.insertProduct(product);
}

async function getProducts() {
  return await productRepository.getProducts();
}

async function getProduct(id) {
  const product = await productRepository.getProduct(id);
  product.info = await productInfoRepository.getProductInfo(parseInt(id));
  return product;
}

async function updateProduct(product) {
  await verifyId.Supplier(product.supplierId);

  return await productRepository.updateProduct(product);
}

async function deleteProduct(id) {
  const sales = await saleRepository.getSaleByProductId(id);
  if (sales.length > 0) {
    throw new Error("can't delete product with sales registered");
  }

  return await productRepository.deleteProduct(id);
}

async function createProductInfo(productInfo) {
  await productInfoRepository.createProductInfo(productInfo);
}

async function updateProductInfo(productInfo) {
  await productInfoRepository.updateProductInfo(productInfo);
}

export default {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  createProductInfo,
  updateProductInfo,
};
