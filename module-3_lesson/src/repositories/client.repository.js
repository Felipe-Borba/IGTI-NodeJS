import Client from "../models/client.model.js";

async function insertClient(client) {
  try {
    return await Client.create(client);
  } catch (error) {
    throw error;
  }
}

async function getClients() {
  try {
    return await Client.findAll();
  } catch (error) {
    throw error;
  }
}

async function getClient(id) {
  try {
    return await Client.findByPk(id);
  } catch (error) {
    throw error;
  }
}

async function updateClient(client) {
  try {
    await Client.update(client, {
      where: {
        clientId: client.client_id,
      },
    });
    return await getClient(client.client_id);
  } catch (error) {
    throw error;
  }
}

async function deleteClient(id) {
  try {
    await Client.destroy({
      where: {
        clientId: id,
      },
    });

    return `client id=${id} deleted`;
  } catch (error) {
    throw error;
  }
}

export default {
  insertClient,
  getClients,
  getClient,
  updateClient,
  deleteClient,
};
