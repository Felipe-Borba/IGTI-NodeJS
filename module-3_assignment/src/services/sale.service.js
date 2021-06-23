import saleRepository from "../repositories/sale.repository.js";
import productRepository from "../repositories/product.repository.js";
import verifyId from "./asset/verifyId.js";

async function createSale(sale) {
  await verifyId.Client(sale.client_id);
  const product = await verifyId.Product(sale.product_id);

  if (product.stock <= 0) {
    throw new Error("product out of stock");
  }
  product.stock--;
  await productRepository.updateProduct(product);

  return await saleRepository.insertSale(sale);
}

async function getSales() {
  return await saleRepository.getSales();
}

async function getSale(id) {
  return await saleRepository.getSale(id);
}

async function updateSale(sale) {
  await verifyId.Client(sale.client_id);
  await verifyId.Product(sale.product_id);

  return await saleRepository.updateSale(sale);
}

async function deleteSale(id) {
  return await saleRepository.deleteSale(id);
}

export default {
  createSale,
  getSales,
  getSale,
  updateSale,
  deleteSale,
};
