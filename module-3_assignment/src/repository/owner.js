import elephantSQL from "./assets/db.js";

async function createOwner(owner) {
  const connection = await elephantSQL.connect();
  try {
    const sql = `INSERT INTO proprietarios (nome, telefone) 
                 VALUES ($1, $2) 
                 RETURNING *`;
    const params = [owner.name, owner.phone];

    const response = await connection.query(sql, params);

    return response.rows[0];
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

async function updateOwner(owner) {
  const connection = await elephantSQL.connect();
  try {
    const sql = `UPDATE proprietarios SET 
                 nome=$1, 
                 telefone=$2
                 WHERE proprietario_id=$3
                 RETURNING *`;
    const params = [owner.name, owner.phone, owner.owner_id];

    const response = await connection.query(sql, params);

    return response.rows[0];
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

async function deleteOwner(owner_id) {
  const connection = await elephantSQL.connect();
  try {
    const sql = `DELETE FROM proprietarios WHERE proprietario_id=$1`;

    await connection.query(sql, [owner_id]);

    return "ok";
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

async function getOwnerList() {
  const connection = await elephantSQL.connect();
  try {
    const response = await connection.query("SELECT * FROM proprietarios");

    return response.rows;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

async function getOwnerById(owner_id) {
  const connection = await elephantSQL.connect();
  try {
    const sql = "SELECT * FROM proprietarios WHERE proprietario_id=$1";
    const params = [owner_id];
    const response = await connection.query(sql, params);

    return response.rows;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

export default {
  createOwner,
  updateOwner,
  deleteOwner,
  getOwnerList,
  getOwnerById,
};
