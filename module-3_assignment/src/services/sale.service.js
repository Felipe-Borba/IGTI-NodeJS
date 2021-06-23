import saleRepository from "../repositories/sale.repository.js";
import verify from "./asset/verify.js";

async function createSale(sale) {
  await verify.Client(sale.client_id);
  await verify.Product(sale.product_id);

  return await saleRepository.insertSale(sale);
}

async function getSales() {
  return await saleRepository.getSales();
}

async function getSale(id) {
  return await saleRepository.getSale(id);
}

async function updateSale(sale) {
  await verify.Client(sale.client_id);
  await verify.Product(sale.product_id);

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
