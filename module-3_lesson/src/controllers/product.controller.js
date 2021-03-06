import productService from "../services/product.service.js";

async function createProduct(req, res, next) {
  try {
    let product = req.body;

    if (
      !product.name ||
      !product.description ||
      !product.value ||
      !product.stock ||
      !product.supplierId
    ) {
      throw new Error(
        "name, description, value, stock, supplierId are missing"
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
      !product.supplierId ||
      !product.productId
    ) {
      throw new Error(
        "productId, name, description, value, stock, supplierId are missing"
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

async function createProductInfo(req, res, next) {
  try {
    let productInfo = req.body;
    if (!productInfo.productId) {
      throw new Error("productId, are missing");
    }
    productInfo = await productService.createProductInfo(productInfo);
    res.send(productInfo);
    logger.info(`POST /product/info - ${JSON.stringify(productInfo)}`);
  } catch (error) {
    next(error);
  }
}

async function updateProductInfo(req, res, next) {
  try {
    let productInfo = req.body;
    if (!productInfo.productId) {
      throw new Error("productId, are missing");
    }
    productInfo = await productService.updateProductInfo(productInfo);
    res.send(productInfo);
    logger.info(`PUT /product/info - ${JSON.stringify(productInfo)}`);
  } catch (error) {
    next(error);
  }
}

async function createReview(req, res, next) {
  try {
    const params = req.body;
    if (!params.productId || !params.review) {
      throw new Error("productId and review are missing");
    }

    await productService.createReview(params.review, params.productId);
    res.end();
    logger.info(`POST /product/review`);
  } catch (error) {
    next(error);
  }
}

async function deleteReview(req, res, next) {
  try {
    const index = req.params.index;
    const id = req.params.id;

    await productService.deleteReview(id, index);

    res.end();
    logger.info(`DELETE /product${id}/review/${index}`);
  } catch (error) {
    next(error);
  }
}

async function getProductsInfo(req, res, next) {
  try {
    res.send(await productService.getProductsInfo());

    logger.info("GET /product/info");
  } catch (error) {
    next(error);
  }
}

async function deleteProductInfo(req, res, next) {
  try {
    const id = req.params.id;

    await productService.deleteProductInfo(id);

    res.end();
    logger.info(`DELETE /product/info/${id}`);
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
  createProductInfo,
  updateProductInfo,
  createReview,
  deleteReview,
  getProductsInfo,
  deleteProductInfo,
};
