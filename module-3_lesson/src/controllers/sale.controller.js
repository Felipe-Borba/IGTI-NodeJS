import saleService from "../services/sale.service.js";

async function createSale(req, res, next) {
  try {
    let sale = req.body;

    if (!sale.value || !sale.date || !sale.clientId || !sale.productId) {
      throw new Error("value, date, clientId, product_id are missing");
    }

    sale = await saleService.createSale(sale);
    res.send(sale);

    logger.info(`POST /sale - ${JSON.stringify(sale)}`);
  } catch (error) {
    next(error);
  }
}

async function getSales(req, res, next) {
  try {
    res.send(await saleService.getSales(req.query.productId));

    logger.info("GET /sale");
  } catch (error) {
    next(error);
  }
}

async function getSale(req, res, next) {
  try {
    const id = req.params.id;

    res.send(await saleService.getSale(id));

    logger.info(`GET /sale/${id}`);
  } catch (error) {
    next(error);
  }
}

async function updateSale(req, res, next) {
  try {
    let sale = req.body;

    if (
      !sale.saleId ||
      !sale.value ||
      !sale.date ||
      !sale.clientId ||
      !sale.productId
    ) {
      throw new Error("saleId, value, date, clientId, productId are missing");
    }

    sale = await saleService.updateSale(sale);
    res.send(sale);

    logger.info(`UPDATE /sale - ${JSON.stringify(sale)}`);
  } catch (error) {
    next(error);
  }
}

async function deleteSale(req, res, next) {
  try {
    const id = req.params.id;

    res.send(await saleService.deleteSale(id));

    logger.info(`DELETE /sale/${id}`);
  } catch (error) {
    next(error);
  }
}

export default {
  createSale,
  getSales,
  getSale,
  updateSale,
  deleteSale,
};
