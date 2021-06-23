import elephantSQL from "./assets/db.js";

async function createAnimal(animal) {
  const connection = await elephantSQL.connect();
  try {
    const sql = `INSERT INTO animais (nome, tipo, proprietario_id) 
                 VALUES ($1, $2, $3) 
                 RETURNING *`;
    const params = [animal.name, animal.specie, animal.owner_id];

    const response = await connection.query(sql, params);

    return response.rows[0];
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

async function updateAnimal(animal) {
  const connection = await elephantSQL.connect();
  try {
    const sql = `UPDATE animais SET 
                 nome=$1, 
                 tipo=$2,
                 proprietario_id=$3
                 WHERE animal_id=$4
                 RETURNING *`;
    const params = [
      animal.name,
      animal.specie,
      animal.owner_id,
      animal.animal_id,
    ];

    const response = await connection.query(sql, params);

    return response.rows[0];
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

async function deleteAnimal(animal_id) {
  const connection = await elephantSQL.connect();
  try {
    const sql = `DELETE FROM animais WHERE animal_id=$1`;

    await connection.query(sql, [animal_id]);

    return "ok";
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

async function getAnimalList() {
  const connection = await elephantSQL.connect();
  try {
    const response = await connection.query("SELECT * FROM animais");

    return response.rows;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

async function getAnimalById(animal_id) {
  const connection = await elephantSQL.connect();
  try {
    const sql = "SELECT * FROM animais WHERE animal_id=$1";
    const params = [animal_id];
    const response = await connection.query(sql, params);

    return response.rows;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

async function getAnimalListByOwner(animal_id) {
  const connection = await elephantSQL.connect();
  try {
    const sql = "SELECT * FROM animais WHERE proprietario_id=$1";
    const response = await connection.query(sql, [animal_id]);

    return response.rows;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

export default {
  createAnimal,
  updateAnimal,
  deleteAnimal,
  getAnimalList,
  getAnimalById,
  getAnimalListByOwner,
};
