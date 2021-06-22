import clientService from "../services/client.service.js";

async function createClient(req, res, next) {
  try {
    let client = req.body;

    if (
      !client.name ||
      !client.cpf ||
      !client.phone ||
      !client.email ||
      !client.address
    ) {
      throw new Error("name, cpf, phone, email, address are missing");
    }

    client = await clientService.createClient(client);
    res.send(client);

    logger.info(`POST /client - ${JSON.stringify(client)}`);
  } catch (error) {
    next(error);
  }
}

async function getClients(req, res, next) {
  try {
    res.send(await clientService.getClients());

    logger.info("GET /client");
  } catch (error) {
    next(error);
  }
}

async function getClient(req, res, next) {
  try {
    const id = req.params.id;

    res.send(await clientService.getClient(id));

    logger.info(`GET /client/${id}`);
  } catch (error) {
    next(error);
  }
}

async function updateClient(req, res, next) {
  try {
    let client = req.body;

    if (
      !client.name ||
      !client.cpf ||
      !client.phone ||
      !client.email ||
      !client.address ||
      !client.id
    ) {
      throw new Error("id, name, cpf, phone, email, address are missing");
    }

    client = await clientService.updateClient(client);
    res.send(client);

    logger.info(`UPDATE /client - ${JSON.stringify(client)}`);
  } catch (error) {
    next(error);
  }
}

async function deleteClient(req, res, next) {
  try {
    const id = req.params.id;

    res.send(await clientService.deleteClient(id));

    logger.info(`DELETE /client/${id}`);
  } catch (error) {
    next(error);
  }
}

export default {
  createClient,
  getClients,
  getClient,
  updateClient,
  deleteClient,
};
