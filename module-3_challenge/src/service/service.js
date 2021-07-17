import ServiceRepository from "../repository/service.js";

async function createService(service) {
  return await ServiceRepository.createService(service);
}

async function getServiceList(filter) {
  if (filter.proprietarioId) {
    return await ServiceRepository.getServiceListByOwner(filter.proprietarioId);
  }

  return await ServiceRepository.getServiceList();
}

async function getServiceById(id) {
  return await ServiceRepository.getServiceById(id);
}

export default {
  createService,
  getServiceList,
  getServiceById,
};
