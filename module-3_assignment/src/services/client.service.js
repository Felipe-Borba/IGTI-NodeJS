import clientRepository from "../repositories/client.repository.js";

async function createClient(client) {
  return await clientRepository.insertClient(client);
}

async function getClients() {
  return await clientRepository.getClients();
}

async function getClient(id) {
  return await clientRepository.getClient(id);
}

async function updateClient(client) {
  return await clientRepository.updateClient(client);
}

async function deleteClient(id) {
  return await clientRepository.deleteClient(id);
}

export default {
  createClient,
  getClients,
  getClient,
  updateClient,
  deleteClient,
};
