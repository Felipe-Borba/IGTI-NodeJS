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
  const connection = await elephantSQL.connect();

  try {
    const sql =
      "UPDATE sales SET value=$1, date=$2, client_id=$3 WHERE sale_id=$4 RETURNING *";
    const values = [sale.value, sale.date, sale.client_id, sale.sale_id];

    const response = await connection.query(sql, values);

    return response.rows[0];
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

async function deleteSale(id) {
  const connection = await elephantSQL.connect();

  try {
    const res = await connection.query("DELETE FROM sales WHERE sale_id = $1", [
      id,
    ]);

    if (res.rowCount < 1) {
      throw new Error(`Error to delete sale id = ${id}`);
    }

    return `sale id=${id} deleted`;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
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
