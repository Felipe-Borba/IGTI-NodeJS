import clientRepository from "../repositories/client.repository.js";

async function createClient(client) {
  return await clientRepository.insertClient(client);
}

async function getClients() {
  return await clientRepository.getClients();
}

export default {
  createClient,
  getClients,
};
