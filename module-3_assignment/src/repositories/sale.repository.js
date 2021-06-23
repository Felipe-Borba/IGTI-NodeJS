import elephantSQL from "./db.js";

async function insertSale(sale) {
  const connection = await elephantSQL.connect();

  try {
    const sql = `INSERT INTO sales (value, date, client_id, product_id) VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [sale.value, sale.date, sale.client_id, sale.product_id];

    const res = await connection.query(sql, values);

    return res.rows[0];
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

async function getSales() {
  const connection = await elephantSQL.connect();

  try {
    const res = await connection.query("SELECT * FROM sales");

    return res.rows;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

async function getSale(id) {
  const connection = await elephantSQL.connect();

  try {
    const res = await connection.query("SELECT * FROM sales WHERE sale_id=$1", [
      id,
    ]);

    return res.rows[0];
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

async function updateSale(sale) {
  const connection = await elephantSQL.connect();

  try {
    const sql =
      "UPDATE sales SET value=$1, date=$2, client_id=$3, product_id=$4 WHERE sale_id=$5 RETURNING *";
    const values = [
      sale.value,
      sale.date,
      sale.client_id,
      sale.product_id,
      sale.sale_id,
    ];

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
  getSale,
  updateSale,
  deleteSale,
};
