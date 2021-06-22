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

    res.send(await clientService.createClient(client));

    logger.info(`POST /client - ${JSON.stringify(client)}`);
  } catch (error) {
    next(error);
  }
}

export default {
  createClient,
};
