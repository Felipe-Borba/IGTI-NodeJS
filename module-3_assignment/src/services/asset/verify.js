import supplierRepository from "../../repositories/supplier.repository.js";
import clientRepository from "../../repositories/client.repository.js";
import productRepository from "../../repositories/product.repository.js";

async function Client(id) {
  const client = await clientRepository.getClient(id);

  if (!client) {
    throw new Error("client_id not found");
  }
}

async function Product(id) {
  const product = await productRepository.getProduct(id);

  if (!product) {
    throw new Error("product_id not found");
  }
}

async function Supplier(id) {
  const supplier = await supplierRepository.getSupplier(id);

  if (!supplier) {
    throw new Error("supplier_id not found");
  }
}

export default {
  Client,
  Product,
  Supplier,
};
