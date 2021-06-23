import supplierService from "../services/supplier.service.js";

async function createSupplier(req, res, next) {
  try {
    let supplier = req.body;

    if (
      !supplier.name ||
      !supplier.cnpj ||
      !supplier.phone ||
      !supplier.email ||
      !supplier.address
    ) {
      throw new Error("name, cnpj, phone, email, address are missing");
    }

    supplier = await supplierService.createSupplier(supplier);
    res.send(supplier);

    logger.info(`POST /supplier - ${JSON.stringify(supplier)}`);
  } catch (error) {
    next(error);
  }
}

async function getSuppliers(req, res, next) {
  try {
    res.send(await supplierService.getSuppliers());

    logger.info("GET /supplier");
  } catch (error) {
    next(error);
  }
}

async function getSupplier(req, res, next) {
  try {
    const id = req.params.id;

    res.send(await supplierService.getSupplier(id));

    logger.info(`GET /supplier/${id}`);
  } catch (error) {
    next(error);
  }
}

async function updateSupplier(req, res, next) {
  try {
    let supplier = req.body;

    if (
      !supplier.name ||
      !supplier.cnpj ||
      !supplier.phone ||
      !supplier.email ||
      !supplier.address ||
      !supplier.supplier_id
    ) {
      throw new Error(
        "supplier_id, name, cnpj, phone, email, address are missing"
      );
    }

    supplier = await supplierService.updateSupplier(supplier);
    res.send(supplier);

    logger.info(`UPDATE /supplier - ${JSON.stringify(supplier)}`);
  } catch (error) {
    next(error);
  }
}

async function deleteSupplier(req, res, next) {
  try {
    const id = req.params.id;

    res.send(await supplierService.deleteSupplier(id));

    logger.info(`DELETE /supplier/${id}`);
  } catch (error) {
    next(error);
  }
}

export default {
  createSupplier,
  getSuppliers,
  getSupplier,
  updateSupplier,
  deleteSupplier,
};
