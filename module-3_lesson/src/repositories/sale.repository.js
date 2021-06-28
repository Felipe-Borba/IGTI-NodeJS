import Sale from "../models/sale.model.js";
import Product from "../models/product.model.js";
import Client from "../models/client.model.js";

async function insertSale(sale) {
  try {
    return await Sale.create(sale);
  } catch (error) {
    throw error;
  }
}

async function getSales() {
  try {
    return await Sale.findAll({
      include: [
        {
          model: Product,
        },
        {
          model: Client,
        },
      ],
    });
  } catch (error) {
    throw error;
  }
}

async function getSaleByProductId(productId) {
  try {
    return await Sale.findAll({
      where: {
        productId: productId,
      },
      include: [
        {
          model: Product,
        },
        {
          model: Client,
        },
      ],
    });
  } catch (error) {
    throw error;
  }
}

async function getSale(id) {
  try {
    return await Sale.findByPk(id); //to return nested table values use findOne({where:{id=id},include:[...]})?
  } catch (error) {
    throw error;
  }
}

async function updateSale(sale) {
  try {
    await Sale.update(
      {
        value: sale.value,
        date: sale.date,
        clientId: sale.clientId,
      },
      {
        where: {
          saleId: sale.saleId,
        },
      }
    );
    return await Sale.getSale(sale.saleId);
  } catch (error) {
    throw error;
  }
}

async function deleteSale(id) {
  try {
    return await Sale.destroy({
      where: {
        saleId: id,
      },
    });
  } catch (error) {
    throw error;
  }
}

export default {
  insertSale,
  getSales,
  getSaleByProductId,
  getSale,
  updateSale,
  deleteSale,
};
