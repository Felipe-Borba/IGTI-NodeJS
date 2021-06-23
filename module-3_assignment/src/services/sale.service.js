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
  const sale = await saleRepository.getSale(id);
  if (!sale) {
    throw new Error("sale id not found");
  }
  return sale;
}

async function updateSale(sale) {
  await verifyId.Client(sale.client_id);

  return await saleRepository.updateSale(sale);
}

async function deleteSale(id) {
  const sale = await getSale(id);
  const product = await productRepository.getProduct(sale.product_id);

  product.stock++;

  await productRepository.updateProduct(product);

  return await saleRepository.deleteSale(id);
}

export default {
  createSale,
  getSales,
  getSale,
  updateSale,
  deleteSale,
};
