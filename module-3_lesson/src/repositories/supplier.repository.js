import Supplier from "../models/supplier.model.js";

async function insertSupplier(supplier) {
  try {
    return await Supplier.create(supplier);
  } catch (error) {
    throw error;
  }
}

async function getSuppliers() {
  try {
    return await Supplier.findAll();
  } catch (error) {
    throw error;
  }
}

async function getSupplier(id) {
  try {
    return await Supplier.findByPk(id);
  } catch (error) {
    throw error;
  }
}

async function updateSupplier(supplier) {
  try {
    await Supplier.update(supplier, {
      where: {
        supplierId: supplier.supplier_id,
      },
    });
    return await getSupplier(supplier.supplier_id);
  } catch (error) {
    throw error;
  }
}

async function deleteSupplier(id) {
  try {
    await Supplier.destroy({
      where: {
        supplierId: id,
      },
    });

    return `supplier id=${id} deleted`;
  } catch (error) {
    throw error;
  }
}

export default {
  insertSupplier,
  getSuppliers,
  getSupplier,
  updateSupplier,
  deleteSupplier,
};
