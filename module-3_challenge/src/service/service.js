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

export default {
  createService,
  getServiceList,
};
