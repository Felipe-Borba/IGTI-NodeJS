import productService from "../services/product.service.js";

async function createProduct(req, res, next) {
  try {
    let product = req.body;

    if (
      !product.name ||
      !product.description ||
      !product.value ||
      !product.stock ||
      !product.supplier_id
    ) {
      throw new Error(
        "name, description, value, stock, supplier_id are missing"
      );
    }

    product = await productService.createProduct(product);
    res.send(product);

    logger.info(`POST /product - ${JSON.stringify(product)}`);
  } catch (error) {
    next(error);
  }
}

async function getProducts(req, res, next) {
  try {
    res.send(await productService.getProducts());

    logger.info("GET /product");
  } catch (error) {
    next(error);
  }
}

async function getProduct(req, res, next) {
  try {
    const id = req.params.id;

    res.send(await productService.getProduct(id));

    logger.info(`GET /product/${id}`);
  } catch (error) {
    next(error);
  }
}

async function updateProduct(req, res, next) {
  try {
    let product = req.body;

    if (
      !product.name ||
      !product.description ||
      !product.value ||
      !product.stock ||
      !product.supplier_id ||
      !product.product_id
    ) {
      throw new Error(
        "product_id, name, description, value, stock, supplier_id are missing"
      );
    }

    product = await productService.updateProduct(product);
    res.send(product);

    logger.info(`UPDATE /product - ${JSON.stringify(product)}`);
  } catch (error) {
    next(error);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const id = req.params.id;

    res.send(await productService.deleteProduct(id));

    logger.info(`DELETE /product/${id}`);
  } catch (error) {
    next(error);
  }
}

export default {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};