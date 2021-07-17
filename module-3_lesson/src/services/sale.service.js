import saleRepository from "../repositories/sale.repository.js";
import productRepository from "../repositories/product.repository.js";
import verifyId from "./asset/verifyId.js";

async function createSale(sale) {
  await verifyId.Client(sale.clientId);
  const product = await verifyId.Product(sale.productId);

  if (product.stock <= 0) {
    throw new Error("product out of stock");
  }
  product.stock--;
  await productRepository.updateProduct(product);

  return await saleRepository.insertSale(sale);
}

async function getSales(productId, supplierId) {
  if (productId) {
    return await saleRepository.getSaleByProductId(productId);
  }
  if (supplierId) {
    return await saleRepository.getSaleBySupplierId(supplierId);
  }
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
  await verifyId.Client(sale.clientId);

  return await saleRepository.updateSale(sale);
}

async function deleteSale(id) {
  const sale = await getSale(id);
  const product = await productRepository.getProduct(sale.productId);

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
