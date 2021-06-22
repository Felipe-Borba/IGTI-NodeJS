import elephantSQL from "./db.js";

async function insertClient(client) {
  const connection = await elephantSQL.connect();

  try {
    const sql = `INSERT INTO clients (name, cpf , phone, email, address) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [
      client.name,
      client.cpf,
      client.phone,
      client.email,
      client.address,
    ];

    const res = await connection.query(sql, values);
    return res.rows[0];
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

async function getClients() {
  const connection = await elephantSQL.connect();

  try {
    const res = await connection.query("SELECT * FROM clients");

    return res.rows;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

async function getClient(id) {
  const connection = await elephantSQL.connect();

  try {
    const res = await connection.query(
      "SELECT * FROM clients WHERE client_id=$1",
      [id]
    );

    return res.rows[0] ? res.rows[0] : "client not found :(";
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

async function updateClient(id) {
  const connection = await elephantSQL.connect();

  try {
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

async function deleteClient(id) {
  const connection = await elephantSQL.connect();

  try {
    const res = await connection.query(
      "DELETE FROM clients WHERE client_id = $1",
      [id]
    );

    if (res.rowCount < 1) {
      throw new Error(`Error to delete client id = ${id}`);
    }

    return `client id=${id} deleted`;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

export default {
  insertClient,
  getClients,
  getClient,
  updateClient,
  deleteClient,
};
