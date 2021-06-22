import productRepository from "../repositories/product.repository.js";
import supplierRepository from "../repositories/supplier.repository.js";

async function createProduct(product) {
  const supplier = await supplierRepository.getSupplier(product.supplier_id);

  if (!supplier) {
    throw new Error("supplier_id not found");
  }

  return await productRepository.insertProduct(product);
}

async function getProducts() {
  return await productRepository.getProducts();
}

async function getProduct(id) {
  return await productRepository.getProduct(id);
}

async function updateProduct(product) {
  const supplier = await supplierRepository.getSupplier(product.supplier_id);

  if (!supplier) {
    throw new Error("supplier_id not found");
  }

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
